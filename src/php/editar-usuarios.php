<?php

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/conexion.php';

use MongoDB\BSON\ObjectId;

session_start();

if (isset($_SESSION['usuarioId']) && $_SERVER["REQUEST_METHOD"] == "POST") {

    $nuevoUsuario = $_POST['usuario'];
    $nuevoPassword = $_POST['contraseña'];

    $resultado = $coleccionUsuario->updateOne(
        ['_id' => new ObjectId($_SESSION['usuarioId'])],
        ['$set' => [
            'nombreUsuario' => $nuevoUsuario,
            'password' => $nuevoPassword
        ]]
    );

    $_SESSION['usuario'] = $nuevoUsuario;

    echo json_encode(['estado' => 'correcto', 'mensaje' => 'Nombre de usuario actualizado correctamente']);
    exit;
} else {
    echo json_encode(['estado' => 'error', 'mensaje' => 'No se pudo actualizar el nombre de usuario']);
    exit;
}
