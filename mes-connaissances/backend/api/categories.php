<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
require_once '../db/connection.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'OPTIONS':
        http_response_code(200);
        exit;
        
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM categories");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['nom'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Nom requis']);
            exit;
        }
        $stmt = $pdo->prepare("INSERT INTO categories (nom) VALUES (:nom)");
        $stmt->execute(['nom' => $data['nom']]);
        echo json_encode(['id' => $pdo->lastInsertId()]);
        break;

    case 'PUT':
        parse_str(file_get_contents("php://input"), $data);
        $id = $_GET['id'] ?? null;
        if (!$id || !isset($data['nom'])) {
            http_response_code(400);
            echo json_encode(['error' => 'ID et nom requis']);
            exit;
        }
        $stmt = $pdo->prepare("UPDATE categories SET nom = :nom WHERE id = :id");
        $stmt->execute(['nom' => $data['nom'], 'id' => $id]);
        echo json_encode(['success' => true]);
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID requis']);
            exit;
        }
        $stmt = $pdo->prepare("DELETE FROM categories WHERE id = :id");
        $stmt->execute(['id' => $id]);
        echo json_encode(['success' => true]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Méthode non autorisée']);
        break;
}
