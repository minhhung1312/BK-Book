<?php
header('Access-Control-Allow-Origin: *');
include '../../../db/conn.php';

$username = $_GET['username'];
$sql = "DELETE FROM user WHERE USERNAME='{$username}';";
if (mysqli_query($conn, $sql)) {
    header('Content-Type: application/json');
    echo json_encode(['code' => 'sucessed']);
} else {
    header('Content-Type: application/json');
    echo json_encode(['code' => 'failed']);
}
exit;
// INSERT INTO USER
// VALUES ('danglequocbao', '1122334455', 'danglequocbao@gmail.com', 'Bảo', 'Đặng Lê Quốc', 0703692654,'m', '2008-11-29', 'True', 'False');
?>
