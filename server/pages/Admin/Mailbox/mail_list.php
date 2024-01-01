<?php
header('Access-Control-Allow-Origin: *');
include '../../../db/conn.php';

// get maxline in tabel
$count_row_sql = 'SELECT COUNT(*) FROM mail;';
$count_row_result = mysqli_query($conn, $count_row_sql);
$row_count = mysqli_fetch_array($count_row_result)[0];

// get mail from database
$from = $_GET['from'];
$size = $_GET['size'];

$sql = "SELECT * FROM `mail` ORDER BY `time` DESC LIMIT {$from},{$size};";

$result = mysqli_query($conn, $sql);
$res = [];
while ($row = mysqli_fetch_assoc($result)) {
  array_push($res, $row);
}

header('Content-Type: application/json');
echo json_encode($res);
exit;
?>