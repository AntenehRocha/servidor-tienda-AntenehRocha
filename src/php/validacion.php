<?php

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/conexion.php';



$mensaje = '';


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = $_POST['usuario'];
    $password = $_POST['password'];

    if (empty($usuario) or empty($password)) {
        echo json_encode(['estado' => 'error', 'mensaje' => 'Faltan campos por rellenar']);
        exit;
    }

    $usuarioEncontrado = $coleccionUsuario->findOne(['nombreUsuario' => $usuario]);
    if ($usuarioEncontrado) {
        echo json_encode(['estado' => 'error', 'mensaje' => 'El usuario ya esta registrado']);
        exit;
    }
    $coleccionUsuario->insertOne([
        'nombreUsuario' => $usuario,
        'password' => $password,
        'admin' => false,
        'bolsa' => []
    ]);

    echo json_encode(['estado' => 'correcto', 'mensaje' => 'Datos introducidos correctamente']);
    exit;
}
