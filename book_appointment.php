<?php
require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'];
$patient_name = $data['patient_name'];
$date = $data['date'];
$time = $data['time'];
$reason = $data['reason'];

$stmt = $pdo->prepare("INSERT INTO appointments (user_id, patient_name, date, time, reason) VALUES (?, ?, ?, ?, ?)");
$stmt->execute([$user_id, $patient_name, $date, $time, $reason]);

echo json_encode(["success" => true]);
?>
