<?php

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/conexion.php';

session_start();

if (isset($_SESSION['usuario']) && isset($_SESSION['admin']) && isset($_SESSION['usuarioId'])) {
    $usuarioDatos = $coleccionUsuario->findOne(['nombreUsuario' => $_SESSION['usuario']]);
    $datosEnArray = json_decode(json_encode($usuarioDatos), true);
    $bolsa = $datosEnArray['bolsa'];

    echo json_encode([
        'logueado' => true,
        'usuario' => $_SESSION['usuario'],
        'admin' => $_SESSION['admin'],
        'id' => $_SESSION['usuarioId'],
        'bolsa' => $bolsa
    ]);
} else {
    echo json_encode(['logueado' => false, 'usuario' => null, 'bolsa' => []]);
}

exit;
