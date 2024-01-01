<?php
header('Access-Control-Allow-Origin: *');
include '../../../db/conn.php';

$from = $_GET['from'];
$size = $_GET['size'];

$sql = "
SELECT * 
FROM news
LIMIT {$from}, {$size}
;
";


$result = mysqli_query($conn, $sql);
$response = array();
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
    array_push($response, $row);
    }
}
header('Content-Type: application/json');
echo json_encode($response);
exit;
?>