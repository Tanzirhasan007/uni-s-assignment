<?php
require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'];
$password = $data['password'];

$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
$stmt->execute([$username]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password'])) {
    echo json_encode(["success" => true, "user_id" => $user['id'], "username" => $user['username']]);
} else {
    echo json_encode(["success" => false, "message" => "Invalid credentials"]);
}
?>
