#requires -Version 5.1
<#
.SYNOPSIS
  Integra o botao flutuante Pix em TODAS as paginas HTML.
.DESCRIPTION
  - Injeta botao flutuante + modal Pix antes de </body>
  - Idempotente (remove bloco antigo antes de reinjetar)
  - Backup automatico em .bak/
  - Script 100% ASCII
  - O menu de navegacao agora eh gerado pelo header.js (nao precisa mais injetar via PS1)
#>
[CmdletBinding(SupportsShouldProcess = $true)]
param(
    [string]$Root = $PSScriptRoot,

    [string]$PixKey    = 'cd5e70df-ddb5-4c74-8589-bee68ed718d0',
    [string]$PixName   = 'Brayam Porphirio',
    [string]$PixCity   = 'Sao Paulo',
    [string]$PixAmount = '',

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

# CORRECAO: Usando UTF8 sem BOM para nao quebrar o HTML
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

function Read-Utf8([string]$Path) {
    [System.IO.File]::ReadAllText($Path, [System.Text.Encoding]::UTF8)
}
function Write-Utf8([string]$Path, [string]$Text) {
    [System.IO.File]::WriteAllText($Path, $Text, $utf8NoBom)
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
Write-Host "  VENTU - INTEGRACAO PIX (Botao Flutuante)       " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor DarkCyan
Write-Host "  Root  : $Root"
Write-Host "  Chave : $PixKey"
Write-Host "  HTMLs : $($htmlFiles.Count)"
Write-Host ""

$pixBlock = @'
<!-- VENTU:PIX:START -->
<link rel="stylesheet" href="assets/css/ventu-pix.css?v=2">
<button class="ventu-pix-fab" id="ventu-pix-fab" type="button" aria-label="Apoiar o Ventu via Pix" title="Apoiar o Ventu" aria-haspopup="dialog">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
  <span>Apoiar o Ventu</span>
</button>
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
<script src="assets/js/pix.js?v=2" defer></script>
<!-- VENTU:PIX:END -->
'@

$pixBlock = $pixBlock.
    Replace('__KEY__',    (Esc-Js $PixKey)).
    Replace('__NAME__',   (Esc-Js $PixName)).
    Replace('__CITY__',   (Esc-Js $PixCity)).
    Replace('__AMOUNT__', (Esc-Js $PixAmount))

$pixRegex  = [regex]'(?s)<!-- VENTU:PIX:START.*?<!-- VENTU:PIX:END -->'
$bodyRegex = [regex]'(?is)</body>'

$stats = [ordered]@{ pix = 0; skip = 0; warn = 0; errors = 0 }

foreach ($file in $htmlFiles) {
    if ($file.Name -like '*biblioteca-leitor.html*') { continue }
    $rel     = $file.FullName.Substring($Root.Length).TrimStart('\', '/').Replace('\', '/')
    $content = Read-Utf8 -Path $file.FullName
    $orig    = $content
    $tags    = New-Object System.Collections.Generic.List[string]

    try {
        # ---- 1) Bloco Pix (remove antigo, injeta novo) ----
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

        # ---- 2) Grava ----
        $dirty = ($content -ne $orig) -or $Force
        if ($dirty) {
            $backupPath   = Join-Path $BackupDir $rel
            $backupParent = Split-Path -Parent $backupPath
            if (-not (Test-Path -LiteralPath $backupParent)) {
                New-Item -ItemType Directory -Path $backupParent -Force | Out-Null
            }
            Copy-Item -LiteralPath $file.FullName -Destination $backupPath -Force

            if ($PSCmdlet.ShouldProcess($rel, "Integrar Pix")) {
                Write-Utf8 -Path $file.FullName -Text $content
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
Write-Host ("  Pix: {0}  |  Ignorados: {1}  |  Avisos: {2}  |  Erros: {3}" -f `
    $stats.pix, $stats.skip, $stats.warn, $stats.errors) -ForegroundColor Cyan
Write-Host "--------------------------------------------------" -ForegroundColor DarkGray
Write-Host ""

if ($stats.errors -gt 0) {
    Write-Host "  [!!] $($stats.errors) erro(s). Veja acima." -ForegroundColor Yellow
    exit 1
}

Write-Host "  [OK] Integracao Pix concluida." -ForegroundColor Green
Write-Host ""