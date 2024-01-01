<?php
header('Access-Control-Allow-Origin: *');
include '../../../db/conn.php';

$mail = $_GET['id'];

$sql = "DELETE FROM `mail` WHERE ID = '{$mail}';";
if (mysqli_query($conn, $sql)) {
    header('Content-Type: application/json');
    echo json_encode(['code' => 'sucessed']);
} else {
    header('Content-Type: application/json');
    echo json_encode(['code' => 'failed']);
}
exit;
?>