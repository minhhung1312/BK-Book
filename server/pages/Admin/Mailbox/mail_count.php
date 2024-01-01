<?php
header('Access-Control-Allow-Origin: *');
include '../../../db/conn.php';

// get maxline in tabel
$count_row_sql = 'SELECT COUNT(*) FROM mail;';
$count_row_result = mysqli_query($conn, $count_row_sql);
$row_count = mysqli_fetch_array($count_row_result)[0];

header('Content-Type: application/json');
echo json_encode(['count' => $row_count]);
exit;
?>