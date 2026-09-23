Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\DAVE\.gemini\antigravity\brain\96178dd2-1991-431e-9166-07ebe7fa544b\media__1787224991947.png"
$destDir = "d:\Jupical\public\clients"

if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force
}

$img = [System.Drawing.Image]::FromFile($srcPath)
$width = $img.Width
$height = $img.Height

Write-Host "Source Image Size: $width x $height"

# Grid dimensions: 9 rows, 3 columns
$cols = 3
$rows = 9

$cellW = $width / $cols
$cellH = $height / $rows

$logoNames = @(
    "luxuria", "procom", "powerpace",
    "millennium", "travenza", "srn_integrated",
    "heben", "rotoriko", "srp",
    "allfold", "antra", "emblem",
    "green_hexagon", "shiksha_guru", "brixton",
    "indus", "citaglobal", "ifsb",
    "h_logo", "indiafinds", "shivansh",
    "baldertech", "ehsaas", "mit_mut",
    "gears42", "eteki", "crest"
)

$idx = 0
for ($r = 0; $r -lt $rows; $r++) {
    for ($c = 0; $c -lt $cols; $c++) {
        $name = $logoNames[$idx]
        $x = [int]($c * $cellW)
        $y = [int]($r * $cellH)
        $w = [int]$cellW
        $h = [int]$cellH

        $rect = New-Object System.Drawing.Rectangle $x, $y, $w, $h
        $cropBmp = New-Object System.Drawing.Bitmap $w, $h
        $g = [System.Drawing.Graphics]::FromImage($cropBmp)
        $g.Clear([System.Drawing.Color]::White)
        $g.DrawImage($img, (New-Object System.Drawing.Rectangle 0, 0, $w, $h), $rect, [System.Drawing.GraphicsUnit]::Pixel)
        
        $outPath = Join-Path $destDir "$name.png"
        $cropBmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

        $cropBmp.Dispose()
        $g.Dispose()

        Write-Host "Saved logo [$idx] : $name.png"
        $idx++
    }
}

$img.Dispose()
Write-Host "All 27 logos successfully sliced!"
