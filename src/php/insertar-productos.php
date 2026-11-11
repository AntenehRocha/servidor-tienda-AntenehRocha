<?php

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/conexion.php';

session_start();

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $inventario = $coleccionInventario->find()->toArray();

    // json_encode(['inventario' => $coleccionInventario->find()->toArray()]);

    $arrayInventario = [];

    foreach ($inventario as $cada_producto) {
        $nombre = $cada_producto['nombre'];
        $descripcion = $cada_producto['descripcion'];
        $imagen = $cada_producto['imagen'];
        $stock = $cada_producto['stock'];
        // los productos antiguos no tienen precio, por eso el ?? null
        $precio = $cada_producto['precio'] ?? null;
        $id = (string) $cada_producto['_id'];

        $arrayInventario[] = [
            '_id' => $id,
            'nombre' => $nombre,
            'imagen' => $imagen,
            'descripcion' => $descripcion,
            'stock' => $stock,
            'precio' => $precio
        ];
    };

    echo json_encode(['inventario' => $arrayInventario]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (!isset($_SESSION['admin']) || $_SESSION['admin'] !== true) {
        echo json_encode(['estado' => 'error', 'mensaje' => 'No tienes permisos de administrador']);
        exit;
    }

    $nombreProducto = $_POST['nombre'];
    $imagenProducto = $_POST['imagen'];
    $descripcionProducto = $_POST['descripcion'];
    $stockProducto = $_POST['stock'];
    $precioProducto = $_POST['precio'];

    $coleccionInventario->insertOne([
        'nombre' => $nombreProducto,
        'imagen' => $imagenProducto,
        'descripcion' => $descripcionProducto,
        'stock' => (int)$stockProducto,
        'precio' => (float)$precioProducto
    ]);

    echo json_encode(['estado' => 'correcto', 'mensaje' => 'Producto creado satisfactoriamente', 'inventario' => $coleccionInventario->find()->toArray()]);
    exit;
}
