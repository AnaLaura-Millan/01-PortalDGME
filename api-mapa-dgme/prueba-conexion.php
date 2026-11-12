<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

try {

    require_once __DIR__ . '/config/conexion.php';

    if (!isset($pdo) || !($pdo instanceof PDO)) {
        throw new RuntimeException(
            'La variable PDO no fue inicializada.'
        );
    }

    $consulta = $pdo->query('SELECT 1 AS prueba');
    $resultado = $consulta->fetch(PDO::FETCH_ASSOC);

    echo json_encode([
        'ok' => true,
        'mensaje' => 'Conexión MySQL correcta',
        'resultado' => $resultado
    ]);

} catch (Throwable $e) {

    error_log(
        '[Mapa DGME - diagnóstico] ' . $e->getMessage()
    );

    http_response_code(500);

    echo json_encode([
        'ok' => false,
        'mensaje' => 'Error interno de conexión o configuración PHP.'
    ]);
}
