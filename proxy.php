<?php
// Ziel-URL festlegen
$targetUrl = $_GET['url'];

// Anfrage an die Ziel-URL senden und Antwort abrufen
$response = file_get_contents($targetUrl);

// Antwort an den Client senden
header('Content-Type: application/json');
echo $response;
?>
