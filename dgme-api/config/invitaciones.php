<?php

    // Configuración CORS
    require_once __DIR__ . '/config/cors.php';

    // Conexión a MySQL
    require_once __DIR__ . '/config/conexion.php';

    // Respuesta JSON
    header("Content-Type: application/json; charset=utf-8");

    try {

        $sql = "SELECT
                    id_estado,
                    nombre_estado,
                    region,
                    capital,
                    descrpcion_e
                FROM estados
                ORDER BY nombre_estado ASC";

        $stmt = $pdo->prepare($sql);
        $stmt->execute();

        $estados = [];

        while ($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {

            // Convertir nombre a identificador SVG
            $nombre = mb_strtolower(trim($fila['nombre_estado']), 'UTF-8');

            $nombre = str_replace(
                ['á', 'é', 'í', 'ó', 'ú', 'ü', 'ñ'],
                ['a', 'e', 'i', 'o', 'u', 'u', 'n'],
                $nombre
            );

            $clave = preg_replace('/[^a-z0-9]/', '', $nombre);

            // Caso especial del SVG
            if ($clave === 'ciudaddemexico') {
                $clave = 'cdmx';
            }

            if ($clave === 'estadodemexico') {
                $clave = 'mexico';
            }

            $estados[$clave] = [
                'id_estado'   => (int) $fila['id_estado'],
                'nombre'      => $fila['nombre_estado'],
                'region'      => $fila['region'],
                'capital'     => $fila['capital'],
                'descripcion' => $fila['descrpcion_e']
            ];
        }

        echo json_encode(
            $estados,
            JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE
        );

    } catch (PDOException $e) {

        http_response_code(500);

        echo json_encode([
            'error' => 'No fue posible obtener los estados.'
        ]);
    }
?>