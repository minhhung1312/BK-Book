<?php
header('Access-Control-Allow-Origin: *');
include '../../../db/conn.php';

$username = $_GET['username'];

// get status
$get_status_sql = "SELECT isBanned FROM user WHERE USERNAME='{$username}';";
$get_status_result = mysqli_query($conn, $get_status_sql);
$status = mysqli_fetch_array($get_status_result)[0];

$toggleStatus = $status == 'True'?'False':'True';
$toggle_sql = "UPDATE user SET isBanned='{$toggleStatus}' WHERE USERNAME='{$username}';";
if (mysqli_query($conn, $toggle_sql)) {
    header('Content-Type: application/json');
    echo json_encode(['code' => 'sucessed']);
} else {
    header('Content-Type: application/json');
    echo json_encode(['code' => 'failed']);
}

exit;
?>