<?php

header('Content-Type: application/json; charset=utf-8');

session_start();

if (isset($_SESSION['usuario']) and isset($_SESSION['admin'])) {
    echo json_encode(['logueado' => true, 'usuario' => $_SESSION['usuario'], 'admin' => $_SESSION['admin']]);
} else {
    echo json_encode(['logueado' => false, 'usuario' => null]);
}

exit;
