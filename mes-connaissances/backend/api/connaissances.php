<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../db/connection.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $categoryId = $_GET['categorie_id'] ?? null;
        if ($categoryId) {
            $stmt = $pdo->prepare("SELECT * FROM connaissances WHERE categorie_id = ?");
            $stmt->execute([$categoryId]);
        } else {
            $stmt = $pdo->query("SELECT * FROM connaissances");
        }
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['nom'], $data['niveau'], $data['categorie_id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Champs requis manquants']);
            exit;
        }
        $stmt = $pdo->prepare("INSERT INTO connaissances (nom, description, niveau, date_apprentissage, categorie_id)
            VALUES (:nom, :description, :niveau, :date, :categorie_id)");
        $stmt->execute([
            'nom' => $data['nom'],
            'description' => $data['description'] ?? null,
            'niveau' => $data['niveau'],
            'date' => $data['date_apprentissage'] ?? null,
            'categorie_id' => $data['categorie_id']
        ]);
        echo json_encode(['id' => $pdo->lastInsertId()]);
        break;

    case 'PUT':
        parse_str(file_get_contents("php://input"), $data);
        $id = $_GET['id'] ?? null;
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID requis']);
            exit;
        }
        $stmt = $pdo->prepare("UPDATE connaissances SET nom = :nom, description = :description, niveau = :niveau, date_apprentissage = :date, categorie_id = :categorie_id WHERE id = :id");
        $stmt->execute([
            'nom' => $data['nom'],
            'description' => $data['description'] ?? null,
            'niveau' => $data['niveau'],
            'date' => $data['date_apprentissage'] ?? null,
            'categorie_id' => $data['categorie_id'],
            'id' => $id
        ]);
        echo json_encode(['success' => true]);
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID requis']);
            exit;
        }
        $stmt = $pdo->prepare("DELETE FROM connaissances WHERE id = :id");
        $stmt->execute(['id' => $id]);
        echo json_encode(['success' => true]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Méthode non autorisée']);
        break;
}
