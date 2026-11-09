<?php

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/conexion.php';

use MongoDB\BSON\ObjectId;

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $idProducto = $_POST['id'];

    $producto = $coleccionInventario->findOne([
        '_id' => new ObjectId($idProducto)
    ]);

    // echo json_encode($_SESSION['usuarioId']);

    $resultado = $coleccionUsuario->updateOne(
        ['_id' => new ObjectId($_SESSION['usuarioId'])],
        ['$push' => ['bolsa' => [
            '_id' => new ObjectId(),
            'productoId' => $producto['_id'],
            'nombre' => $producto['nombre']
        ]]]
    );

    if ($resultado->getModifiedCount() === 1) {
        echo json_encode(['estado' => 'correcto', 'mensaje' => 'Producto añadido a la bolsa']);
    } else {
        echo json_encode(['estado' => 'error', 'mensaje' => 'No se pudo añadir el producto']);
    }
    exit;
}
