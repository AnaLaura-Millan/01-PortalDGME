
<?php

    header('Content-Type: application/json; charset=utf-8');

    // Configuración CORS
    require_once __DIR__ . '/../config/cors.php';
   
    // Conexión a MySQL
    require_once __DIR__ . '/../config/conexion.php';

    //Conexion local
    //require_once __DIR__ . '/../config/database.php';
    
    // Filtro para saber si son invitaciones vigentes o pasadas
    $tipo = $_GET['tipo'] ?? 'vigentes';

    if (!in_array($tipo, ['vigentes', 'pasadas', 'resultados'], true)) {
        http_response_code(400);

        exit(json_encode([
            'estado' => 'error',
            'mensaje' => 'Tipo de consulta no válido'
        ], JSON_UNESCAPED_UNICODE));
    }

    switch ($tipo) {
        case 'vigentes':
            $condicion = 'i.vigente = 1 AND d.id_cat IN (1, 4)';
        break;

        case 'pasadas':
            $condicion = 'i.vigente = 0 AND d.id_cat IN (1, 4)';
        break;

        case 'resultados':
            $condicion = 'd.id_cat IN (2, 3, 5, 6, 7, 8)';
        break;
    }

    // Consulta para traer el Json de invitaciones
    try {

        $sql = "
            SELECT
                i.id_inv,
                i.titulo,
                i.anio,
                d.id_doc,
                d.nombre AS documento,
                d.url,
                c.nombre_cat AS categoria,
                d.fecha_creacion,
                ult.ultima_fecha
            FROM t_invitaciones AS i
            INNER JOIN t_documentos AS d
                ON i.id_inv = d.id_inv
            INNER JOIN cat_categoria AS c
                ON d.id_cat = c.id_cat
            INNER JOIN (
                SELECT  id_inv, MAX(fecha_creacion) AS ultima_fecha
                FROM t_documentos
                WHERE activo = 1
                GROUP BY id_inv
            ) AS ult
                ON i.id_inv = ult.id_inv
            WHERE d.activo = 1
            AND $condicion
            ORDER BY
                ult.ultima_fecha DESC,
                i.id_inv DESC,
                d.fecha_creacion DESC,
                d.id_doc DESC
        ";

        $stmt = $pdo->prepare($sql);
        $stmt->execute();

        $registros = $stmt->fetchAll();

        $invitaciones = [];

        foreach ($registros as $fila) {

            $id = (int) $fila['id_inv'];

            if (!isset($invitaciones[$id])) {

                $invitaciones[$id] = [
                    'id_inv' => $id,
                    'titulo' => $fila['titulo'],
                    'anio' => (int) $fila['anio'],
                    'ultima_fecha' => $fila['ultima_fecha'],
                    'documentos' => []
                ];
            }

            $invitaciones[$id]['documentos'][] = [
                'id_doc' => (int) $fila['id_doc'],
                'nombre' => $fila['documento'],
                'url' => $fila['url'],
                'categoria' => $fila['categoria'],
                'fecha_creacion' => $fila['fecha_creacion']
            ];
        }

        $datos = array_values($invitaciones);

        echo json_encode([
            'estado' => 'correcto',
            'total' => count($datos),
            'datos' => $datos
        ], JSON_UNESCAPED_UNICODE);

    } catch (PDOException $e) {

        error_log($e->getMessage());

        http_response_code(500);

        echo json_encode([
            'estado' => 'error',
            'mensaje' => 'No fue posible consultar las invitaciones.'
        ], JSON_UNESCAPED_UNICODE);
    }
?>