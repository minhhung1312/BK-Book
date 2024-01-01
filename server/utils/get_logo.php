<?php
header('Access-Control-Allow-Origin: *');
include '../db/conn.php';

// get book from database
$sql = "SELECT link FROM `logo`LIMIT 0,1;";

$result = mysqli_query($conn, $sql);
$res = mysqli_fetch_assoc($result);

header('Content-Type: application/json');
echo json_encode($res); 
        
exit;
?>