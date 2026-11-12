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
        $estado = trim((string) ($_GET['estado'] ?? ''));

        $sql = "
            SELECT
                c.id_chamakes,
                c.id_estado,
                e.estado,
                e.clave_svg,
                c.nombre,
                c.municipio,
                c.url_img,
                c.url_tarjeta,
                c.orden
            FROM tchamakes c
            INNER JOIN testado e
                ON e.id_estado = c.id_estado
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

        $sql .= " ORDER BY e.estado, c.orden, c.id_chamakes";

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
            'mensaje' => 'Error al consultar los registros de Chamakes.'
        ]);
    }
?>