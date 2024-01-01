<?php
header('Access-Control-Allow-Origin: *');
include '../../db/conn.php';

$id = $_GET['id'];
$username = $_GET['username'];

// check row exits
$wishlist_sql = "SELECT BOOK_ID FROM `book_has_wishlist` WHERE BOOK_ID ='{$id}' AND USERNAME = '{$username}';";
$wishlist_result = mysqli_query($conn, $wishlist_sql);

if($row = mysqli_fetch_assoc($wishlist_result)) {
    $toggle_sql = "DELETE FROM `book_has_wishlist` WHERE BOOK_ID ='{$id}' AND USERNAME = '{$username}';";
} else {
    $toggle_sql = "INSERT INTO book_has_wishlist VALUES ('{$id}','{$username}');";
}

if (mysqli_query($conn, $toggle_sql)) {
    header('Content-Type: application/json');
    echo json_encode(['code' => 'sucessed']);
} else {
    header('Content-Type: application/json');
    echo json_encode(['code' => 'failed']);
}

exit;
?>