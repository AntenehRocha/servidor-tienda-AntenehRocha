<?php

header('Content-Type: application/json; charset=utf-8');
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (!isset($_SESSION['admin']) || $_SESSION['admin'] !== true) {
        echo json_encode(['estado' => 'error', 'mensaje' => 'No tienes permisos de administrador']);
        exit;
    }

    $nombreProducto = $_POST['nombre'];
    $imagenProducto = $_POST['imagen'];
    $descripcionProducto = $_POST['descripcion'];

    echo json_encode(['estado' => 'correcto', 'mensaje' => 'Producto creado satisfactoriamente']);
    exit;
}
