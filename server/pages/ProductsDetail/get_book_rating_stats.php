<?php
header('Access-Control-Allow-Origin: *');
include '../../db/conn.php';

// get book from database
$id = $_GET['id'];

$sql = "SELECT * FROM `comment` WHERE BOOK_ID = '{$id}';";

$result = mysqli_query($conn, $sql);
$stats = [
    1 => 0,
    2 => 0,
    3 => 0,
    4 => 0,
    5 => 0
];
$count = 0;

while ($row = mysqli_fetch_assoc($result)) {
    $count += 1;
    $stats[$row['star']] += 1;
}

for ($i=0; $i < count($stats); $i++) { 
    $stats[$i+1] /= $count;
}

header('Content-Type: application/json');
echo json_encode($stats);
exit;
?>