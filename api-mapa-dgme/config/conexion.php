<?php
    declare(strict_types=1);

    // ============================================
    // CONFIGURACIÓN DE BASE DE DATOS
    // ============================================

    $host = '192.168.103.21';
    $dbname = 'mapa_dgme';
    $usuario = 'S2.k@RzDGME';
    $password = 'C3r*bRq@DGME';

    // ============================================
    // CONEXIÓN PDO
    // ============================================

    try {

        $pdo = new PDO(
            "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
            $usuario,
            $password,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]
        );

    } catch (PDOException $e) {

        // Registrar el error real en el servidor.
        error_log(
            '[Mapa DGME] Error de conexión: ' .
            $e->getMessage()
        );

        // No exponer detalles técnicos al navegador.
        http_response_code(500);

        header('Content-Type: application/json; charset=utf-8');

        echo json_encode([
            'ok' => false,
            'mensaje' => 'No fue posible conectar con la base de datos.'
        ]);

        exit;
    }
?>