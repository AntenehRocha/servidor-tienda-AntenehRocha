<?php

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/conexion.php';

session_start();

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    echo json_encode(['inventario' => $coleccionInventario->find()->toArray()]);
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

    $coleccionInventario->insertOne([
        'nombre' => $nombreProducto,
        'imagen' => $imagenProducto,
        'descripcion' => $descripcionProducto,
        'stock' => (int)$stockProducto
    ]);
    
    echo json_encode(['estado' => 'correcto', 'mensaje' => 'Producto creado satisfactoriamente', 'inventario' => $coleccionInventario->find()->toArray()]);
    exit;
}