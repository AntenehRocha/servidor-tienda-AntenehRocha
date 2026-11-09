<?php

header('Content-Type: application/json; charset=utf-8');

session_start();

require_once __DIR__ . '/conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = $_POST['usuario'];
    $password = $_POST['password'];

    if (empty($usuario) or empty($password)) {
        echo json_encode(['estado' => 'error', 'mensaje' => 'Faltan campos por rellenar']);
        exit;
    } else {
        $usuarioEncontrado = $coleccionUsuario->findOne(['nombreUsuario' => $usuario]);
        if ($usuarioEncontrado) {
            $passwordGuardada = $usuarioEncontrado['password'];

            if ($passwordGuardada == $password) {
                $_SESSION['usuario'] = $usuarioEncontrado['nombreUsuario'];
                $_SESSION['admin'] = $usuarioEncontrado['admin'];
                $_SESSION['usuarioId'] = (string)$usuarioEncontrado['_id'];

                echo json_encode(['estado' => 'correcto', 'mensaje' => 'Has iniciado sesion correctamente', 'usuario' => $_SESSION['usuario'], 'admin' => $_SESSION['admin']]);
                exit;
            } else {
                echo json_encode(['estado' => 'error', 'mensaje' => 'Credenciales incorrectas']);
                exit;
            }
        } else {
            echo json_encode(['estado' => 'error', 'mensaje' => 'Credenciales incorrectas']);
            exit;
        }
    }
}
