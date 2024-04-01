<?php
header("Access-Control-Allow-Origin: *"); // Erlaubt den Zugriff von allen Domains
header("Content-Type: application/json");

if (isset($_GET['url'])) {
    $url = urldecode($_GET['url']);
    echo file_get_contents($url); // Die Inhalte der URL abrufen und zurückgeben
} else {
    echo json_encode(['error' => 'URL parameter is missing']);
}
?>
