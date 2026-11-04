<?php
// añadir la libreria de MongoDB 
require_once __DIR__ . '/../../vendor/autoload.php';

// Replace the placeholder with your Atlas connection string
$uri = 'mongodb+srv://antenehro_db_user:antenehrocha@cluster0.rfzgpbk.mongodb.net/servidor-tienda-AntenehRocha';

// Create a MongoDB client
$client = new MongoDB\Client($uri);

$coleccionUsuario = $client->selectDatabase('servidor-tienda-AntenehRocha')->selectCollection('usuarios');