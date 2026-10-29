<?php

    $host = '192.168.103.21';
    $dbname = 'portal_dgme_2026';
    $usuario = 'S2.k@RzDGME';
    $password = 'C3r*bRq@DGME';

    try {

        $pdo = new PDO(
            "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
            $usuario,
            $password
        );

        $pdo->setAttribute(
            PDO::ATTR_ERRMODE,
            PDO::ERRMODE_EXCEPTION
        );

        $pdo->setAttribute(
            PDO::ATTR_DEFAULT_FETCH_MODE,
            PDO::FETCH_ASSOC
        );

    } catch (PDOException $e) {

        error_log($e->getMessage());

        http_response_code(500);

        exit(json_encode([
            'error' => 'Error de conexión con la base de datos'
        ]));
    }
?>