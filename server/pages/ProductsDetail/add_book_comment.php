<?php
header('Access-Control-Allow-Origin: *');
include '../../db/conn.php';

$username = $_GET['username'];
$star = $_GET['star'];
$title = $_GET['title'];
$desc = $_GET['desc'];
$book_id = $_GET['book_id'];
$time = $_GET['time'];

$sql = "
    INSERT INTO comment
    VALUE ($username, $book_id, $star, $title,$desc, $time);
    ";

if (mysqli_query($conn, $sql)) {
    header('Content-Type: application/json');
    echo json_encode(['code' => 'sucessed']);
} else {
    header('Content-Type: application/json');
    echo json_encode(['code' => 'failed']);
}
?>