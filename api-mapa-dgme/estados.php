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
    echo json_encode(['ok' => false, 'mensaje' => 'Método no permitido']);
    exit;
}

try {
    $sql = "SELECT id_estado, estado, clave_svg
            FROM testado
            ORDER BY estado ASC";

    $stmt = $pdo->query($sql);

    echo json_encode([
        'ok' => true,
        'total' => $stmt->rowCount(),
        'datos' => $stmt->fetchAll()
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    error_log($e->getMessage());

    http_response_code(500);

    echo json_encode([
        'ok' => false,
        'mensaje' => 'Error al consultar los estados.'
    ]);
}