<?php

header('Content-Type: application/json; charset=utf-8');


$mensaje = '';


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = $_POST['usuario'];
    $password = $_POST['password'];

    if(empty($usuario) OR empty($password)) {
        $mensaje = 'faltan campos por rellenar';
    }
}

echo json_encode($mensaje);