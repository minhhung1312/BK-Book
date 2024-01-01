<?php
header('Access-Control-Allow-Origin: *');
include '../../../db/conn.php';

$array = $_POST;
$id = $array['id'];

// book info
$info_sql = "SELECT * FROM book WHERE ID = '$id';";
$info_result = mysqli_query($conn, $info_sql);
$book = mysqli_fetch_assoc($info_result);

// book categories
$cate_sql = "SELECT CONTENT FROM book_has_category WHERE BOOK_ID='$id';";
$cate_result = mysqli_query($conn, $cate_sql);
$book['categories'] = array();
while($row = mysqli_fetch_assoc($cate_result)) {
    array_push($book['categories'], $row['CONTENT']);
}

header('Content-Type: application/json');
echo json_encode($book);
exit;
?>