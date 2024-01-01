<?php
header('Access-Control-Allow-Origin: *');
include '../../../db/conn.php';

$sql = "
SELECT COUNT(*) AS `index` 
FROM book;
";


$result = mysqli_query($conn, $sql);
$response = array();
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
    array_push($response, $row['index']);
    }
}
header('Content-Type: application/json');
echo json_encode($response);
exit;
?>