$base = "http://localhost:8080/auth"
$email = "debug_user_$(Get-Random)@test.com"
$headers = @{ "Content-Type" = "application/json" }

Write-Host "Registering $email..."
$regBody = @{
    email = $email
    name = "Debug User"
    phoneNumber = "555-0199"
    password = "password123"
} | ConvertTo-Json

try {
    $regResponse = Invoke-RestMethod -Uri "$base/register" -Method Post -Headers $headers -Body $regBody
    Write-Host "Registration response: $($regResponse | ConvertTo-Json -Depth 5)"
} catch {
    Write-Host "Registration failed: $_"
    exit
}

Write-Host "`nLogging in..."
$loginBody = @{
    email = $email
    password = "password123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "$base/login" -Method Post -Headers $headers -Body $loginBody
    Write-Host "Login response: $($loginResponse | ConvertTo-Json -Depth 5)"
} catch {
    Write-Host "Login failed: $_"
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader $_.Exception.Response.GetResponseStream()
        Write-Host "Error details: $($reader.ReadToEnd())"
    }
}
