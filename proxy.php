<?php
header("Access-Control-Allow-Origin: *"); // Erlaubt den Zugriff von allen Domains
header("Content-Type: application/json");

if (isset($_GET['url'])) {
    $url = urldecode($_GET['url']);
    $contents = @file_get_contents($url); // Versuche, die Inhalte der URL abzurufen
    if ($contents === FALSE) {
        echo json_encode(['error' => 'Failed to fetch URL']);
    } else {
        echo $contents; // Die Inhalte der URL zurückgeben
    }
} else {
    echo json_encode(['error' => 'URL parameter is missing']);
}
?>
