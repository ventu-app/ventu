#requires -Version 5.1
<#
.SYNOPSIS
  Gera a estrutura de pastas e os arquivos "Em Breve" para todos os capítulos.
#>
[CmdletBinding()]
param(
    [string]$Root = $PSScriptRoot
)

$Levels = @("A1", "A2", "B1", "B2", "C1", "C2")
$Volumes = @(1, 2)
$Chapters = 1..10

$template = @'
window.VENTU_CHAPTER = {
  "meta": {
    "sublevel": "{{SUBLEVEL}}",
    "chapter": {{CHAPTER}},
    "title": "Em Breve",
    "subtitle": "Este capítulo está sendo preparado com carinho.",
    "format": "coming-soon",
    "estimatedMinutes": 0,
    "canDo": ["Aguarde novidades..."]
  },
  "warmup": {
    "prompt": "O conteúdo deste capítulo será liberado em breve. Enquanto isso, aproveite os capítulos anteriores!",
    "image_concept": "Estamos escrevendo o próximo passo da sua jornada."
  }
};
'@

$count = 0
foreach ($level in $Levels) {
    foreach ($vol in $Volumes) {
        $sublevel = "$level.$vol"
        $dir = Join-Path $Root "content/biblioteca/$level/vol-$vol"
        
        if (-not (Test-Path -LiteralPath $dir)) {
            New-Item -ItemType Directory -Path $dir -Force | Out-Null
        }

        foreach ($ch in $Chapters) {
            $chStr = $ch.ToString("00")
            $filePath = Join-Path $dir "ch$chStr.js"

            # Pula os capítulos que já fizemos (A1.1 cap 1 ao 5)
            if ($level -eq "A1" -and $vol -eq 1 -and $ch -le 5) {
                Write-Host "  [PULAR] $level - Vol $vol - Cap $ch (Já existe)" -ForegroundColor DarkGray
                continue
            }

            $content = $template.Replace('{{SUBLEVEL}}', $sublevel).Replace('{{CHAPTER}}', $ch)
            
            # Grava o arquivo em UTF-8 sem BOM para não quebrar o JSON
            [System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
            $count++
        }
    }
}

Write-Host ""
Write-Host "==================================================" -ForegroundColor Green
Write-Host "  [OK] $count arquivos 'Em Breve' gerados com sucesso!" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green