<?php
header("Access-Control-Allow-Origin: *"); // Erlaubt den Zugriff von allen Domains
header("Content-Type: application/json"); // Setzt den Content-Type auf JSON

if (isset($_GET['url'])) {
    $url = urldecode($_GET['url']);
    $data = file_get_contents($url);
    echo json_encode($data); // Konvertiert die Daten in JSON
} else {
    echo json_encode(array('error' => 'URL-Parameter fehlt')); // Fehlermeldung als JSON zurückgeben
}
?>
