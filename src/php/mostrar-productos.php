<?php

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/conexion.php';

if ($coleccionInventario && $_SERVER["REQUEST_METHOD"] == "POST") {

    $totalProductos = $coleccionInventario->countDocuments();

    if ($totalProductos == 0) {

        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            $productosSeed = $_POST['seedProductos'];

            $productosSeed = json_decode($_POST['seedProductos'], true);

            foreach ($productosSeed as $cada_producto) {
                $nombre = $cada_producto['nombre'];
                $imagen = $cada_producto['imagen'];
                $descripcion = $cada_producto['descripcion'];

                $coleccionInventario->insertOne([
                    'nombre' => $nombre,
                    'imagen' => $imagen,
                    'descripcion' => $descripcion
                ]);
            }

            echo json_encode(['estado' => 'correcto', 'mensaje' => 'Se han creado productos, mediante una seed, ya que la BBDD estaba vacia']);
        }
    } else {
        echo json_encode(['estado' => 'error', 'mensaje' => 'La seed no se ha realizado ya que la BBDD ya cuenta con registros en el inventario']);
    }
}
