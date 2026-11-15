<?php

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/conexion.php';

use MongoDB\BSON\ObjectId;

session_start();


if (isset($_SESSION['usuarioId']) && $_SESSION['admin'] === true && $_SERVER["REQUEST_METHOD"] == "GET") {

    $usuarios = $coleccionUsuario->find([
        'admin' => false
    ]);

    $pedidos = [];

    foreach ($usuarios as $usuario) {
        foreach ($usuario['bolsa'] as $pedido) {
            $pedidos[] = [
                'usuarioId' => (string)$usuario['_id'],
                'nombreUsuario' => $usuario['nombreUsuario'],
                'bolsa' => $usuario['bolsa'],
                'idBolsa' => (string)$pedido['_id'],
            ];
        }
    }

    echo json_encode(['estado' => 'correcto', 'pedidos' => $pedidos]);
    exit;
};
