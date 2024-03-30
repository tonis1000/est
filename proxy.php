<?php
header("Access-Control-Allow-Origin: *"); // Erlaubt den Zugriff von allen Domains
header("Content-Type: text/plain");

if (isset($_GET['url'])) {
    $url = urldecode($_GET['url']);
    echo file_get_contents($url);
} else {
    echo 'URL-Parameter fehlt.';
}
?>
