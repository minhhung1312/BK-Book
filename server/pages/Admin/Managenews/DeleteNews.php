<?php
header('Access-Control-Allow-Origin: *');
include '../../../db/conn.php';

$id = $_POST['id'];

$sql = "
    DELETE
    FROM news
    WHERE news.id = '$id';
";

$result = mysqli_query($conn, $sql);

header('Content-Type: application/json');
echo json_encode($response);
exit;
?>