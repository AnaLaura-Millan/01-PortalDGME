<?php
declare(strict_types=1);

/* =========================================
   API CARD SLIDER - PORTAL DGME
========================================= */

header('Content-Type: application/json; charset=utf-8');

// CONFIGURACIÓN EXISTENTE
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';

try {

    /* =====================================
       CONSULTAR TARJETAS ACTIVAS
    ===================================== */

    $sql = "
        SELECT
            id_slider,
            titulo,
            img,
            url,
            tipo
        FROM t_card_slider
        WHERE activo = 1
        ORDER BY orden ASC, id_slider DESC
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    $registros = $stmt->fetchAll();

    /* =====================================
       NORMALIZAR DATOS
    ===================================== */

    $tarjetas = array_map(function ($registro) {

        return [
            'id_slider' => (int) $registro['id_slider'],
            'titulo' => $registro['titulo'],
            'imagen' => $registro['img'],
            'url' => $registro['url'],
            'tipo' => $registro['tipo']
        ];

    }, $registros);

    /* =====================================
       RESPUESTA JSON
    ===================================== */

    echo json_encode([
        'estado' => 'correcto',
        'total' => count($tarjetas),
        'datos' => $tarjetas
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

} catch (Throwable $error) {

    error_log(
        'Error API Card Slider: ' . $error->getMessage()
    );

    http_response_code(500);

    echo json_encode([
        'estado' => 'error',
        'mensaje' => 'No fue posible obtener las publicaciones.'
    ], JSON_UNESCAPED_UNICODE);
}