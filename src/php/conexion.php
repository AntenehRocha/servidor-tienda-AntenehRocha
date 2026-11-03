<?php
// añadir la libreria de MongoDB 
require_once __DIR__ . '/../../vendor/autoload.php';

// Replace the placeholder with your Atlas connection string
$uri = 'mongodb+srv://antenehro_db_user:antenehrocha@cluster0.rfzgpbk.mongodb.net/servidor-tienda-AntenehRocha';

// Create a MongoDB client
$client = new MongoDB\Client($uri);

// Ping the server to verify that the connection works
$admin = $client->admin;
$command = ['ping' => 1];
$result = $admin->command($command)->toArray();

echo json_encode($result), PHP_EOL;
echo "Pinged your deployment. You successfully connected to MongoDB!\n";