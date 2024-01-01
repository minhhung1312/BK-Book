<?php
header('Access-Control-Allow-Origin: *');
include '../db/conn.php';

// get book from database
$sql = "SELECT link FROM `slider`;";

$result = mysqli_query($conn, $sql);
$res = [];
while ($row = mysqli_fetch_assoc($result)) {
  array_push($res, $row);
}

header('Content-Type: application/json');
echo json_encode($res); 
        
exit;
?>