#requires -Version 5.1
<#
.SYNOPSIS
  Integra a Biblioteca Ventu e o botao flutuante Pix em TODAS as paginas HTML.
.DESCRIPTION
  - Adiciona link "Biblioteca" em qualquer <nav> (detecta 5 padroes)
  - Injeta botao flutuante + modal Pix antes de </body>
  - Idempotente (remove bloco antigo antes de reinjetar)
  - Backup automatico em .bak/
  - Script 100% ASCII
.EXAMPLE
  .\Integrate-Ventu.ps1 -WhatIf
.EXAMPLE
  .\Integrate-Ventu.ps1
#>
[CmdletBinding(SupportsShouldProcess = $true)]
param(
    [string]$Root = $PSScriptRoot,

    [string]$PixKey    = 'cd5e70df-ddb5-4c74-8589-bee68ed718d0',
    [string]$PixName   = 'Brayam Porphirio',
    [string]$PixCity   = 'Sao Paulo',
    [string]$PixAmount = '',

    [string[]]$SkipNavLinkIn = @('biblioteca.html'),

    [switch]$Force
)

Set-StrictMode -Version 3.0
$ErrorActionPreference = 'Stop'

# --- Validacao (padrao EMV BCB) ---
if ([string]::IsNullOrWhiteSpace($PixKey)) { throw "PixKey vazio." }
if ($PixName.Length -gt 25) { throw "PixName > 25 chars." }
if ($PixCity.Length -gt 15) { throw "PixCity > 15 chars." }
if ($PixName -notmatch '^[\x20-\x7E]+$') { throw "PixName deve ser ASCII." }
if ($PixCity -notmatch '^[\x20-\x7E]+$') { throw "PixCity deve ser ASCII." }

if (-not (Test-Path -LiteralPath $Root -PathType Container)) { throw "Pasta nao encontrada: $Root" }
$Root = (Resolve-Path -LiteralPath $Root).Path

$BackupDir = Join-Path $Root '.bak'
if (-not (Test-Path -LiteralPath $BackupDir)) {
    New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null
}

$utf8Bom = New-Object System.Text.UTF8Encoding($true)

# =============================================================
# BUGFIX: parametros agora sao $Path e $Text (batem com o call)
# =============================================================
function Read-Utf8([string]$Path) {
    [System.IO.File]::ReadAllText($Path, [System.Text.Encoding]::UTF8)
}
function Write-Utf8Bom([string]$Path, [string]$Text) {
    [System.IO.File]::WriteAllText($Path, $Text, $utf8Bom)
}
function Esc-Js([string]$s) {
    if ($null -eq $s) { return '' }
    $s.Replace('\', '\\').Replace("'", "\'").Replace("`r", '').Replace("`n", ' ')
}

$htmlFiles = @(Get-ChildItem -LiteralPath $Root -Recurse -Filter '*.html' -File |
    Where-Object {
        $_.FullName -notmatch '[\\/]\.bak[\\/]' -and
        $_.FullName -notmatch '[\\/]dist[\\/]' -and
        $_.FullName -notmatch '[\\/]node_modules[\\/]'
    })

if ($htmlFiles.Count -eq 0) { Write-Warning "Nenhum HTML em $Root"; return }

Write-Host ""
Write-Host "==================================================" -ForegroundColor DarkCyan
Write-Host "  VENTU - INTEGRACAO BIBLIOTECA + PIX (Etapa 1)  " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor DarkCyan
Write-Host "  Root  : $Root"
Write-Host "  Chave : $PixKey"
Write-Host "  Nome  : $PixName"
Write-Host "  Cidade: $PixCity"
Write-Host "  HTMLs : $($htmlFiles.Count)"
Write-Host "  SkipNavIn: $($SkipNavLinkIn -join ', ')"
Write-Host ""

$pixBlock = @'
<!-- VENTU:PIX:START -->
<link rel="stylesheet" href="assets/css/ventu-pix.css?v=1">
<button class="ventu-pix-fab" id="ventu-pix-fab" type="button" aria-label="Apoiar o Ventu via Pix" title="Apoiar o Ventu" aria-haspopup="dialog"><span aria-hidden="true">&#x1F49B;</span></button>
<div class="ventu-pix-modal" id="ventu-pix-modal" role="dialog" aria-modal="true" aria-labelledby="ventu-pix-title" hidden>
  <div class="ventu-pix-backdrop" data-pix-close></div>
  <div class="ventu-pix-card">
    <button class="ventu-pix-close" type="button" aria-label="Fechar" data-pix-close>&times;</button>
    <h3 id="ventu-pix-title">&#x1F49B; Apoiar o Ventu</h3>
    <p>O Ventu &eacute; feito por uma pessoa s&oacute;, sem an&uacute;ncios. Se ele te ajuda, considere colaborar.</p>
    <div class="ventu-pix-qr"><img alt="QR Code Pix para colaborar com o Ventu" width="220" height="220" data-pix-qr></div>
    <div class="ventu-pix-key"><code data-pix-key>---</code><button type="button" data-pix-copy>Copiar</button></div>
    <a class="ventu-pix-open" href="#" data-pix-open target="_blank" rel="noopener">Abrir no app do banco</a>
  </div>
</div>
<script>window.VENTU_PIX_CONFIG={key:'__KEY__',name:'__NAME__',city:'__CITY__',amount:'__AMOUNT__'};</script>
<script src="assets/js/pix.js?v=1" defer></script>
<!-- VENTU:PIX:END -->
'@

$pixBlock = $pixBlock.
    Replace('__KEY__',    (Esc-Js $PixKey)).
    Replace('__NAME__',   (Esc-Js $PixName)).
    Replace('__CITY__',   (Esc-Js $PixCity)).
    Replace('__AMOUNT__', (Esc-Js $PixAmount))

# =============================================================
# Padroes de nav: tenta em ordem, do mais especifico ao generico
# =============================================================
$navPatterns = @(
    '(?is)(<nav\b[^>]*\bclass\s*=\s*"[^"]*\bmain-nav\b[^"]*"[^>]*>)(.*?)(</nav>)',
    '(?is)(<nav\b[^>]*\bclass\s*=\s*"[^"]*\bnavbar-nav\b[^"]*"[^>]*>)(.*?)(</nav>)',
    '(?is)(<nav\b[^>]*\bclass\s*=\s*"[^"]*\bnavbar\b[^"]*"[^>]*>)(.*?)(</nav>)',
    '(?is)(<nav\b[^>]*\bclass\s*=\s*"[^"]*\bnav\b[^"]*"[^>]*>)(.*?)(</nav>)',
    '(?is)(<nav\b[^>]*\bid\s*=\s*"[^"]*\bnav\b[^"]*"[^>]*>)(.*?)(</nav>)',
    '(?is)(<nav\b[^>]*>)(.*?)(</nav>)'
)

$navLink   = '<a href="biblioteca.html">Biblioteca</a>'
$pixRegex  = [regex]'(?s)<!-- VENTU:PIX:START.*?<!-- VENTU:PIX:END -->'
$bodyRegex = [regex]'(?is)</body>'

$stats = [ordered]@{ nav = 0; pix = 0; skip = 0; warn = 0; errors = 0 }

foreach ($file in $htmlFiles) {
    $rel     = $file.FullName.Substring($Root.Length).TrimStart('\', '/').Replace('\', '/')
    $content = Read-Utf8 -Path $file.FullName
    $orig    = $content
    $tags    = New-Object System.Collections.Generic.List[string]

    try {
        # ---- 1) Link Biblioteca (com fallback de padroes) ----
        $skipNav = $false
        foreach ($pat in $SkipNavLinkIn) {
            if ($rel -like "*$pat") { $skipNav = $true; break }
        }

        if (-not $skipNav) {
            $matchedPattern = $null
            foreach ($pattern in $navPatterns) {
                $re = [regex]$pattern
                if ($re.IsMatch($content)) {
                    $m = $re.Match($content)
                    $inner = $m.Groups[2].Value
                    if ($inner -notmatch 'biblioteca\.html') {
                        $newInner = $inner.TrimEnd() + "`n        $navLink`n      "
                        $content  = $content.Remove($m.Groups[2].Index, $m.Groups[2].Length).Insert($m.Groups[2].Index, $newInner)
                        $tags.Add('nav')
                        $stats.nav++
                        $matchedPattern = $pattern.Substring(0, [Math]::Min(40, $pattern.Length))
                    }
                    break
                }
            }
            if (-not $matchedPattern -and $content -notmatch 'biblioteca\.html') {
                Write-Warning "  [nav] sem <nav> detectavel em $rel"
                $stats.warn++
            }
        } else {
            Write-Host "  [nav] $rel (skip: esta na lista SkipNavLinkIn)" -ForegroundColor DarkGray
        }

        # ---- 2) Bloco Pix (remove antigo, injeta novo) ----
        $hadPix = $pixRegex.IsMatch($content)
        if ($hadPix) { $content = $pixRegex.Replace($content, '', 1) }

        if ($bodyRegex.IsMatch($content)) {
            $bodyMatch = $bodyRegex.Match($content)
            $content = $content.Substring(0, $bodyMatch.Index) + "`n$pixBlock`n" + $content.Substring($bodyMatch.Index)
            $tags.Add($(if ($hadPix) { 'pix(update)' } else { 'pix(new)' }))
            $stats.pix++
        } else {
            Write-Warning "  [pix] </body> nao encontrado em $rel"
            $stats.warn++
        }

        # ---- 3) Grava ----
        $dirty = ($content -ne $orig) -or $Force
        if ($dirty) {
            $backupPath   = Join-Path $BackupDir $rel
            $backupParent = Split-Path -Parent $backupPath
            if (-not (Test-Path -LiteralPath $backupParent)) {
                New-Item -ItemType Directory -Path $backupParent -Force | Out-Null
            }
            Copy-Item -LiteralPath $file.FullName -Destination $backupPath -Force

            if ($PSCmdlet.ShouldProcess($rel, "Integrar [$($tags -join ', ')]")) {
                Write-Utf8Bom -Path $file.FullName -Text $content
                Write-Host ("  [OK] {0,-46} [{1}]" -f $rel, ($tags -join ', ')) -ForegroundColor Green
            }
        } else {
            $stats.skip++
            Write-Host ("  [--] {0,-46} (ja integrado)" -f $rel) -ForegroundColor DarkGray
        }
    } catch {
        $stats.errors++
        Write-Host ("  [XX] {0,-46} ERRO: {1}" -f $rel, $_.Exception.Message) -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "--------------------------------------------------" -ForegroundColor DarkGray
Write-Host ("  Nav: {0}  |  Pix: {1}  |  Ignorados: {2}  |  Avisos: {3}  |  Erros: {4}" -f `
    $stats.nav, $stats.pix, $stats.skip, $stats.warn, $stats.errors) -ForegroundColor Cyan
Write-Host "  Backups: $BackupDir" -ForegroundColor DarkGray
Write-Host "--------------------------------------------------" -ForegroundColor DarkGray
Write-Host ""

if ($stats.errors -gt 0) {
    Write-Host "  [!!] $($stats.errors) erro(s). Veja acima." -ForegroundColor Yellow
    exit 1
}

Write-Host "  [OK] Integracao concluida." -ForegroundColor Green
Write-Host ""
Write-Host "  Proximos passos:" -ForegroundColor Cyan
Write-Host "    1) Verifique assets/js/pix.js e assets/css/ventu-pix.css" -ForegroundColor Gray
Write-Host "    2) Abra index.html, clique no botao amarelo (canto inferior direito)" -ForegroundColor Gray
Write-Host "    3) Escaneie o QR com o app do banco" -ForegroundColor Gray
Write-Host "    4) Aguarde OK para a Etapa 2 (biblioteca.html)" -ForegroundColor Gray
Write-Host ""