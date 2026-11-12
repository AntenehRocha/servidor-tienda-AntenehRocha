<?php

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/conexion.php';

use MongoDB\BSON\ObjectId;

session_start();

if (isset($_SESSION['usuarioId']) && $_SERVER["REQUEST_METHOD"] == "GET") {

    $usuario = $coleccionUsuario->findOne([
        '_id' => new ObjectId($_SESSION['usuarioId'])
    ]);

    $bolsa = $usuario['bolsa'];
    echo json_encode(['estado' => 'correcto', 'bolsa' => $bolsa]);
    exit;
}

if (isset($_SESSION['usuarioId']) && $_SERVER["REQUEST_METHOD"] == "POST") {


    if (isset($_POST['accion']) && $_POST['accion'] === 'eliminar') {
        $resultado = $coleccionUsuario->updateOne(
            ['_id' => new ObjectId($_SESSION['usuarioId'])],
            ['$set' => ['bolsa' => []]]
        );

        echo json_encode(['estado' => 'correcto', 'mensaje' => 'La bolsa se ha vaciado satisfactoriamente']);
        exit;
    }



    $idProducto = $_POST['id'];
    $cantidadProducto = (int)$_POST['cantidad'];

    $producto = $coleccionInventario->findOne([
        '_id' => new ObjectId($idProducto)
    ]);

    if (!$producto) {
        echo json_encode(['estado' => 'error', 'mensaje' => 'El producto no existe']);
        exit;
    }

    if ($cantidadProducto < 1 || $cantidadProducto > $producto['stock']) {
        echo json_encode(['estado' => 'error', 'mensaje' => 'Error, el stock solo es de ' . $producto['stock'] . ' unidades']);
        exit;
    }

    $resultado = $coleccionUsuario->updateOne(
        ['_id' => new ObjectId($_SESSION['usuarioId'])],
        ['$push' => ['bolsa' => [
            '_id' => new ObjectId(),
            'productoId' => $producto['_id'],
            'nombre' => $producto['nombre'],
            'imagen' => $producto['imagen'],
            'descripcion' => $producto['descripcion'],
            'stock' => $producto['stock'],
            'cantidad' => $cantidadProducto,
            'precio' => $producto['precio']
        ]]]
    );

    if ($resultado->getModifiedCount() === 1) {
        echo json_encode(['estado' => 'correcto', 'mensaje' => 'Producto añadido a la bolsa']);
    } else {
        echo json_encode(['estado' => 'error', 'mensaje' => 'No se pudo añadir el producto']);
    }
    exit;
} else {
    echo json_encode(['estado' => 'error', 'mensaje' => 'Usuario no autenticado']);
    exit;
};
