
<?php

    header('Content-Type: application/json; charset=utf-8');

    require_once __DIR__ . '/config/database.php';

    try {
        $sql = "SELECT COUNT(*) AS total
                FROM t_invitaciones";

        $stmt = $pdo->query($sql);
        $resultado = $stmt->fetch();

        echo json_encode([
            'estado' => 'correcto',
            'mensaje' => 'Conexión exitosa con dgme_portal',
            'total_invitaciones' => (int) $resultado['total']
        ], JSON_UNESCAPED_UNICODE);

    } catch (PDOException $e) {

        http_response_code(500);

        echo json_encode([
            'estado' => 'error',
            'mensaje' => 'Error al consultar las invitaciones'
        ], JSON_UNESCAPED_UNICODE);
    }
?>