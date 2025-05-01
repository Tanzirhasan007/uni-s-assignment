<?php
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST['title'];
    $first = $_POST['first-name'];
    $last = $_POST['last-name'];
    $dob = $_POST['dob'];
    $nhs_number = $_POST['nhs-number'];
    $address = $_POST['address'];
    $postcode = $_POST['postcode'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $current_gp = $_POST['current-gp'];
    $consent = isset($_POST['consent']) ? 1 : 0;

    $stmt = $pdo->prepare("INSERT INTO registrations 
        (title, first_name, last_name, dob, nhs_number, address, postcode, phone, email, current_gp, consent)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    try {
        $stmt->execute([
            $title, $first, $last, $dob, $nhs_number, $address, $postcode, $phone, $email, $current_gp, $consent
        ]);
        header("Location: index.php?success=1");
        exit();
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>
