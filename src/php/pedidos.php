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
                'bolsaId' => (string)$pedido['_id'],
                'bolsaImg' => $pedido['imagen'],
                'bolsaNombre' => $pedido['nombre'],
                'bolsaPrecio' => $pedido['precio'],
                'bolsaCantidad' => $pedido['cantidad'],
                'idBolsa' => (string)$pedido['_id'],
                'estado' => $pedido['estado']
            ];
        }
    }

    echo json_encode(['estado' => 'correcto', 'pedidos' => $pedidos]);
    exit;
};

if (isset($_SESSION['usuarioId']) && $_SESSION['admin'] === true && $_SERVER["REQUEST_METHOD"] == "POST") {
    $accion = $_POST['accion'];
    $usuarioId = $_POST['usuarioId'];
    $bolsaId = $_POST['bolsaId'];

    if ($accion === 'aceptado') {
        $resultado = $coleccionUsuario->updateOne(
            ['_id' => new ObjectId($usuarioId), 'bolsa._id' => new ObjectId($bolsaId)],
            ['$set' => ['bolsa.$.estado' => 'aceptado']]
        );
    } else if ($accion === 'rechazado') {
        $resultado = $coleccionUsuario->updateOne(
            ['_id' => new ObjectId($usuarioId), 'bolsa._id' => new ObjectId($bolsaId)],
            ['$set' => ['bolsa.$.estado' => 'rechazado']]
        );
    }

    echo json_encode(['estado' => 'correcto', 'mensaje' => 'Pedido ' . $accion]);
    exit;
}

echo json_encode(['estado' => 'error', 'mensaje' => 'No tienes permisos de administrador']);
exit;
