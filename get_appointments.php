<?php
require 'db.php';

header('Content-Type: application/json');

$user_id = $_GET['user_id'] ?? null;

if (!$user_id) {
    echo json_encode(["success" => false, "message" => "User ID is required"]);
    exit;
}

$stmt = $pdo->prepare("SELECT date, time, reason AS type, 'NHS Clinic' AS location, 'Upcoming' AS status 
                       FROM appointments WHERE user_id = ? ORDER BY date DESC");
$stmt->execute([$user_id]);

$appointments = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(["success" => true, "data" => $appointments]);
