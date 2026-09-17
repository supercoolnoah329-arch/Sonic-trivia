Add-Type -AssemblyName System.Drawing

function New-MascotCanvas {
  param([string]$Path, [scriptblock]$Draw)
  $bitmap = New-Object System.Drawing.Bitmap 420, 420, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.Clear([System.Drawing.Color]::Transparent)
  & $Draw $graphics
  $bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  $graphics.Dispose()
  $bitmap.Dispose()
}

$raccoonPath = Join-Path $PSScriptRoot '..\assets\original-raccoon.png'
$raiderPath = Join-Path $PSScriptRoot '..\assets\original-score-raider.png'

New-MascotCanvas $raccoonPath {
  param($g)
  $navy = [System.Drawing.Brushes]::MidnightBlue
  $green = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(62, 174, 105))
  $lime = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(169, 232, 113))
  $cream = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 246, 193))
  $pink = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(238, 116, 151))
  $outline = New-Object System.Drawing.Pen ([System.Drawing.Color]::MidnightBlue), 12
  $g.FillEllipse($green, 90, 75, 240, 240); $g.DrawEllipse($outline, 90, 75, 240, 240)
  $g.FillEllipse($cream, 132, 170, 156, 112)
  $g.FillPolygon($green, @([System.Drawing.Point]::new(103,105), [System.Drawing.Point]::new(122,35), [System.Drawing.Point]::new(177,85)))
  $g.FillPolygon($green, @([System.Drawing.Point]::new(243,85), [System.Drawing.Point]::new(298,35), [System.Drawing.Point]::new(317,105)))
  $g.DrawPolygon($outline, @([System.Drawing.Point]::new(103,105), [System.Drawing.Point]::new(122,35), [System.Drawing.Point]::new(177,85)))
  $g.DrawPolygon($outline, @([System.Drawing.Point]::new(243,85), [System.Drawing.Point]::new(298,35), [System.Drawing.Point]::new(317,105)))
  $g.FillEllipse($navy, 122, 134, 72, 86); $g.FillEllipse($navy, 226, 134, 72, 86)
  $g.FillEllipse($lime, 145, 152, 28, 40); $g.FillEllipse($lime, 249, 152, 28, 40)
  $g.FillEllipse($navy, 184, 218, 52, 30); $g.FillEllipse($pink, 205, 242, 12, 22)
  $g.FillRectangle($navy, 50, 285, 130, 28); $g.FillRectangle($navy, 240, 285, 130, 28)
  $g.FillEllipse($green, 30, 270, 70, 95); $g.FillEllipse($green, 320, 270, 70, 95)
  $g.DrawLine($outline, 75, 323, 32, 380); $g.DrawLine($outline, 345, 323, 389, 380)
  $green.Dispose(); $lime.Dispose(); $cream.Dispose(); $pink.Dispose(); $outline.Dispose()
}

New-MascotCanvas $raiderPath {
  param($g)
  $navy = [System.Drawing.Brushes]::MidnightBlue
  $red = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(205, 55, 55))
  $gold = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(246, 190, 50))
  $cream = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 231, 170))
  $white = [System.Drawing.Brushes]::White
  $outline = New-Object System.Drawing.Pen ([System.Drawing.Color]::MidnightBlue), 12
  $g.FillEllipse($red, 92, 70, 236, 275); $g.DrawEllipse($outline, 92, 70, 236, 275)
  $g.FillEllipse($cream, 135, 148, 150, 118)
  $g.FillEllipse($navy, 133, 122, 60, 75); $g.FillEllipse($navy, 227, 122, 60, 75)
  $g.FillEllipse($white, 146, 140, 31, 40); $g.FillEllipse($white, 243, 140, 31, 40)
  $g.FillEllipse($navy, 157, 153, 13, 22); $g.FillEllipse($navy, 250, 153, 13, 22)
  $g.FillEllipse($navy, 178, 216, 64, 38); $g.FillRectangle($gold, 80, 55, 260, 24)
  $g.FillPolygon($gold, @([System.Drawing.Point]::new(125,55), [System.Drawing.Point]::new(145,20), [System.Drawing.Point]::new(165,55)))
  $g.FillPolygon($gold, @([System.Drawing.Point]::new(255,55), [System.Drawing.Point]::new(275,20), [System.Drawing.Point]::new(295,55)))
  $g.FillRectangle($navy, 72, 300, 276, 34); $g.FillEllipse($red, 24, 285, 80, 96); $g.FillEllipse($red, 316, 285, 80, 96)
  $g.DrawLine($outline, 64, 330, 18, 388); $g.DrawLine($outline, 356, 330, 402, 388)
  $red.Dispose(); $gold.Dispose(); $cream.Dispose(); $outline.Dispose()
}