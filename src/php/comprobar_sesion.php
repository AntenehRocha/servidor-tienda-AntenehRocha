<?php

header('Content-Type: application/json; charset=utf-8');

session_start();

if (isset($_SESSION['usuario'])) {
    echo json_encode(['logueado' => true, 'usuario' => $_SESSION['usuario']]);
} else {
    echo json_encode(['logueado' => false, 'usuario' => null]);
}

exit;