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

    // 1. Obtener participantes
    $sql = "
        SELECT
            c.id_creativo,
            c.id_estado,
            e.estado,
            e.clave_svg,
            c.nombre,
            c.ubicacion,
            c.orden_creativo
        FROM tcreativos c
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

    $sql .= "
        ORDER BY e.estado,
                 c.orden_creativo,
                 c.id_creativo
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($parametros);

    $creativos = $stmt->fetchAll();

    // 2. Consulta preparada para obtener documentos
    $sqlDocumentos = "
        SELECT
            id_documento,
            ciclo,
            titulo,
            url,
            orden_pdf
        FROM tdocumentoscreativos
        WHERE id_creativo = :id_creativo
        ORDER BY ciclo, orden_pdf, id_documento
    ";

    $stmtDocumentos = $pdo->prepare($sqlDocumentos);

    // 3. Organizar documentos por ciclo escolar
    foreach ($creativos as &$creativo) {

        $stmtDocumentos->execute([
            'id_creativo' => $creativo['id_creativo']
        ]);

        $documentos = $stmtDocumentos->fetchAll();

        $ciclos = [];

        foreach ($documentos as $documento) {

            $ciclo = $documento['ciclo'];

            if (!isset($ciclos[$ciclo])) {
                $ciclos[$ciclo] = [];
            }

            $ciclos[$ciclo][] = [
                'id_documento' => $documento['id_documento'],
                'name' => $documento['titulo'],
                'url' => $documento['url']
            ];
        }

        // Mantener la estructura utilizada por Angular
        $years = [];

        foreach ($ciclos as $ciclo => $archivos) {
            $years[] = [
                $ciclo => $archivos
            ];
        }

        $creativo['creativoName'] = $creativo['nombre'];
        $creativo['municipio'] = $creativo['ubicacion'];
        $creativo['years'] = $years;
    }

    unset($creativo);

    echo json_encode([
        'ok' => true,
        'total' => count($creativos),
        'datos' => $creativos
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

} catch (Throwable $e) {

    error_log($e->getMessage());

    http_response_code(500);

    echo json_encode([
        'ok' => false,
        'mensaje' => 'Error al consultar los creativos.'
    ]);
}