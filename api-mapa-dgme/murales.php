<?php
declare(strict_types=1);

    // Respuesta JSON
    header('Content-Type: application/json; charset=utf-8');

    // Configuración CORS
    require_once __DIR__ . '/config/cors.php';
    
    // Conexión a MySQL
    require_once __DIR__ . '/config/conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode([
        'ok' => false,
        'mensaje' => 'Método no permitido'
    ]);
    exit;
}

try {
    // Se puede consultar por clave SVG o por nombre de estado.
    $estado = trim($_GET['estado'] ?? '');

    $sql = "
        SELECT
            m.id_mural,
            m.id_estado,
            e.estado,
            e.clave_svg,
            m.titulo,
            m.autor,
            m.ubicacion,
            m.sede,
            m.url_img,
            m.url_video,
            m.orden
        FROM tmurales m
        INNER JOIN testado e
            ON e.id_estado = m.id_estado
    ";

    $parametros = [];

    if ($estado !== '') {
        $sql .= "
            WHERE e.clave_svg = :clave
               OR e.estado = :nombre
        ";

        $parametros = [
            'clave' => $estado,
            'nombre' => $estado
        ];
    }

    $sql .= " ORDER BY e.estado, m.orden, m.id_mural";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($parametros);

    $datos = $stmt->fetchAll();

    echo json_encode([
        'ok' => true,
        'total' => count($datos),
        'datos' => $datos
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

} catch (Throwable $e) {
    error_log($e->getMessage());

    http_response_code(500);

    echo json_encode([
        'ok' => false,
        'mensaje' => 'Error al consultar los murales.'
    ]);
}
