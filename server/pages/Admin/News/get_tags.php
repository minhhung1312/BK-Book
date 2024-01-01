<?php
header('Access-Control-Allow-Origin: *');
include '../../../db/conn.php';

$sql = "SELECT CONTENT FROM tag WHERE TYPE = 1;";

$result = mysqli_query($conn, $sql);
$response = array();
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        array_push($response, $row['CONTENT']);
    }
}

header('Content-Type: application/json');
echo json_encode($response);
exit;
?>