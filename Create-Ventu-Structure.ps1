#requires -Version 5.1
<#
.SYNOPSIS
  Cria a estrutura de pastas e os arquivos base (Em Breve) para todos os niveis do Ventu.
#>
[CmdletBinding()]
param(
    [string]$Root = $PSScriptRoot
)

$ErrorActionPreference = 'Stop'

$Levels = @("A2", "B1", "B2", "C1", "C2") # O A1 ja existe, entao pulamos ele.
$Volumes = @(1, 2)
$Chapters = 1..10

$template = @'
window.VENTU_CHAPTER = {
  "meta": {
    "level": "{{LEVEL}}",
    "volume": {{VOL}},
    "chapter": {{CHAPTER}},
    "title": "Em Breve",
    "subtitle": "Este capítulo está sendo preparado com carinho.",
    "format": "coming-soon",
    "estimatedMinutes": 0,
    "xp": 0,
    "characters": [],
    "loreHook": "",
    "canDo": ["Aguarde novidades..."]
  },
  "warmup": {
    "recall": [],
    "hook": "O conteúdo deste capítulo será liberado em breve. Enquanto isso, aproveite os capítulos anteriores!",
    "ptHelp": "Estamos escrevendo o próximo passo da sua jornada."
  },
  "input": { "scene": "", "tone": "", "lines": [], "listeningMission": "" },
  "vocab": [],
  "grammar": { "rule": "", "pattern": "", "traps": [] },
  "pronunciation": { "focus": "", "mouthTip": "", "minimalPairs": [] },
  "activities": [],
  "roleplay": { "setup": "", "npcPersona": "", "complications": [], "successCriteria": [], "starterPrompt": "" },
  "culturalPass": { "work": "", "type": "film", "year": "", "whyA1": "", "listeningMission": "" }
};
'@

$count = 0
$skipped = 0

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  VENTU - GERADOR DE ESTRUTURA DE NIVEIS         " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

foreach ($level in $Levels) {
    foreach ($vol in $Volumes) {
        $dir = Join-Path $Root "content/biblioteca/$level/vol-$vol"
        
        # Cria a pasta se ela nao existir
        if (-not (Test-Path -LiteralPath $dir)) {
            New-Item -ItemType Directory -Path $dir -Force | Out-Null
        }

        foreach ($ch in $Chapters) {
            $chStr = $ch.ToString("00")
            $filePath = Join-Path $dir "ch$chStr.js"

            # Se o arquivo JA EXISTE, pula (para nao sobrescrever o que voce ja fez)
            if (Test-Path -LiteralPath $filePath) {
                $skipped++
                continue
            }

            # Substitui os placeholders no template
            $content = $template.Replace('{{LEVEL}}', $level).Replace('{{VOL}}', $vol).Replace('{{CHAPTER}}', $ch)
            
            # Grava o arquivo (UTF8 sem BOM para nao bugar o JS)
            $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
            [System.IO.File]::WriteAllText($filePath, $content, $utf8NoBom)
            
            $count++
            Write-Host "  [+] Criado: $level / Vol $vol / Cap $ch" -ForegroundColor DarkGray
        }
    }
}

Write-Host ""
Write-Host "--------------------------------------------------" -ForegroundColor DarkGray
Write-Host "  Arquivos criados: $count" -ForegroundColor Green
Write-Host "  Arquivos ignorados (ja existiam): $skipped" -ForegroundColor Yellow
Write-Host "--------------------------------------------------" -ForegroundColor DarkGray
Write-Host "  [OK] Estrutura gerada com sucesso!" -ForegroundColor Green
Write-Host ""