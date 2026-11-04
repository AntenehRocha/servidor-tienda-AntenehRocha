<?php
header('Content-Type: application/json; charset=utf-8');

session_start();

if (isset($_SESSION['usuario'])) {
    session_destroy();
}

echo json_encode(['estado' => 'correcto', 'mensaje' => 'Sesión cerrada']);

exit;
