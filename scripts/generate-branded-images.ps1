# Generates SEO branding assets from existing images (logo.jpeg / hero.jpeg).
# Usage:  powershell -ExecutionPolicy Bypass -File scripts\generate-branded-images.ps1
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$public = Join-Path $root "public"
$app = Join-Path $root "app"
$logo = Join-Path $public "images\logo.jpeg"
$hero = Join-Path $public "images\hero.jpeg"

function Convert-HexColor([string]$hex) {
  return [System.Drawing.ColorTranslator]::FromHtml($hex)
}

function Save-Png($bitmap, [string]$dst) {
  $bitmap.Save($dst, [System.Drawing.Imaging.ImageFormat]::Png) | Out-Null
  Write-Output "PNG saved: $dst"
}

function Save-Jpeg($bitmap, [string]$dst, [int]$quality = 90) {
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq "image/jpeg" }
  $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
    [System.Drawing.Imaging.Encoder]::Quality, [long]$quality)
  $bitmap.Save($dst, $codec, $params) | Out-Null
  $params.Dispose()
  Write-Output "JPEG saved: $dst"
}

function New-ContainBitmap([string]$src, [int]$w, [int]$h, [string]$bgHex) {
  # Fit the whole image inside w x h (no cropping), letterboxed on bg colour.
  $img = [System.Drawing.Image]::FromFile($src)
  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.Clear((Convert-HexColor $bgHex))
  $scale = [Math]::Min($w / $img.Width, $h / $img.Height)
  $dw = [Math]::Round($img.Width * $scale)
  $dh = [Math]::Round($img.Height * $scale)
  $dx = [Math]::Floor(($w - $dw) / 2)
  $dy = [Math]::Floor(($h - $dh) / 2)
  $g.DrawImage($img, $dx, $dy, $dw, $dh)
  $g.Dispose(); $img.Dispose()
  return $bmp
}

function New-CoverBitmap([string]$src, [int]$w, [int]$h, [string]$bgHex) {
  # Center-crop the source to exactly w x h (cover).
  $img = [System.Drawing.Image]::FromFile($src)
  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.Clear((Convert-HexColor $bgHex))
  $srcAspect = $img.Width / $img.Height
  $dstAspect = $w / $h
  if ($srcAspect -gt $dstAspect) {
    $cropW = [int]($img.Height * $dstAspect)
    $cropX = [int](($img.Width - $cropW) / 2)
    $rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
    $g.DrawImage($img, $rect, $cropX, 0, $cropW, $img.Height, [System.Drawing.GraphicsUnit]::Pixel)
  } else {
    $cropH = [int]($img.Width / $dstAspect)
    $cropY = [int](($img.Height - $cropH) / 2)
    $rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
    $g.DrawImage($img, $rect, 0, $cropY, $img.Width, $cropH, [System.Drawing.GraphicsUnit]::Pixel)
  }
  $g.Dispose(); $img.Dispose()
  return $bmp
}

function Convert-BitmapToIco([System.Drawing.Bitmap]$bmp, [string]$dst) {
  # 32x32 true-color ICO with embedded BITMAPINFOHEADER + ABGR pixel data.
  $size = $bmp.Width
  $pixBytes = $size * $size * 4
  $rect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)
  $data = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly,
    [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $pixels = New-Object byte[] $pixBytes
  [System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $pixels, 0, $pixBytes)
  $bmp.UnlockBits($data)

  $header = [System.IO.MemoryStream]::new()
  $bw = New-Object System.IO.BinaryWriter($header)

  $bw.Write([uint16]0); $bw.Write([uint16]1); $bw.Write([uint16]1)   # ICONDIR
  $bw.Write([byte]$size); $bw.Write([byte]$size)                     # entry 1/2
  $bw.Write([byte]0); $bw.Write([byte]0)
  $bw.Write([uint16]1); $bw.Write([uint16]32)
  $bw.Write([uint32](40 + $pixBytes + ($size / 8) * $size))          # bitmap + mask
  $bw.Write([uint32]22)                                              # offset

  $bw.Write([uint32]40)              # BITMAPINFOHEADER
  $bw.Write([int32]$size)
  $bw.Write([int32]($size * 2))      # height includes AND mask
  $bw.Write([uint16]1); $bw.Write([uint16]32)
  $bw.Write([uint32]0); $bw.Write([uint32]$pixBytes)
  $bw.Write([int32]0); $bw.Write([int32]0); $bw.Write([uint32]0); $bw.Write([uint32]0)

  for ($y = $size - 1; $y -ge 0; $y--) {                 # bottom-up BGRA
    for ($x = 0; $x -lt $size; $x++) {
      $i = (($y * $size) + $x) * 4
      $bw.Write($pixels[$i + 2]); $bw.Write($pixels[$i + 1])
      $bw.Write($pixels[$i]);     $bw.Write($pixels[$i + 3])
    }
  }
  $bw.Write((New-Object byte[] ((($size / 8)) * $size))) # AND mask (opaque)
  $bw.Flush()
  [System.IO.File]::WriteAllBytes($dst, $header.ToArray())
  $bw.Dispose(); $header.Dispose()
  Write-Output "ICO saved: $dst"
}

$bg = "#FBF5EA"

# 1. Favicons / icons
$bmp32 = New-ContainBitmap $logo 32 32 $bg
Convert-BitmapToIco $bmp32 (Join-Path $app "favicon.ico")
Save-Png $bmp32 (Join-Path $public "favicon-32.png")
$bmp32.Dispose()

foreach ($s in @(192, 512)) {
  $b = New-ContainBitmap $logo $s $s $bg
  Save-Png $b (Join-Path $public "icon-$s.png")
  $b.Dispose()
}

# 2. Apple touch icon (180x180, opaque)
$a = New-ContainBitmap $logo 180 180 $bg
Save-Png $a (Join-Path $public "apple-touch-icon.png")
$a.Dispose()

# 3. Open Graph / Twitter share image (1200x630 from hero)
$og = New-CoverBitmap $hero 1200 630 $bg
Save-Jpeg $og (Join-Path $public "og-image.jpg") 90
$og.Dispose()

Write-Output "All SEO branding assets generated."
