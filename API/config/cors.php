<?php

    $origenesPermitidos = [
        'http://localhost:4200',
        'https://dgme.sep.gob.mx'
    ];

    $origen = $_SERVER['HTTP_ORIGIN'] ?? '';

    if (in_array($origen, $origenesPermitidos, true)) {
        header("Access-Control-Allow-Origin: $origen");
        header("Vary: Origin");
    }

    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
?>