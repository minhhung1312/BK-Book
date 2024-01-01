<?php
header('Access-Control-Allow-Origin: *');
include '../../db/conn.php';
require_once '../../utils/get_book_rating.php';

// get book from database
$id = $_GET['id'];

$get_id_sql = "SELECT ID,name, price, discount, image FROM book WHERE NOT ID = '{$id}';";
$result = mysqli_query($conn, $get_id_sql);

$res = [];
for ($i=0; $i < 4 && $row = mysqli_fetch_assoc($result); $i++) { 
    $row['rating'] = getBookRating($row['ID'],$conn);
    array_push($res, $row);
}

header('Content-Type: application/json');
echo json_encode($res); 
exit;
?>