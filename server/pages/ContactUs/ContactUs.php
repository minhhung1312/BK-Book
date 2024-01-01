<?php
header('Access-Control-Allow-Origin: *');
include '../../db/conn.php';

$array = $_POST;
$name = $array['name'];
$email = $array['email'];
$type = $array['type'];
$content = $array['content'];

// $sql = "
// INSERT INTO contact_us
// VALUES ('$name', '$email', '$type', '$content');
// ";
// $result = mysqli_query($conn, $sql);
$sql = mysqli_prepare($conn, "INSERT INTO `contact_us` VALUES (?, ?, ?, ?)");
mysqli_stmt_bind_param($sql, "ssis", $name, $email, $type, $content);
mysqli_stmt_execute($sql);

$response = "Thành công!";

header('Content-Type: application/json');
echo json_encode($response);
exit;
?>