<?php
header('Access-Control-Allow-Origin: *');
include '../../db/conn.php';

$id = $_GET['id'];
$username = $_GET['username'];
$quantity = $_GET['quantity'];

$cart_sql = "SELECT amount FROM `book_has_cart` WHERE BOOK_ID ='{$id}' AND USERNAME = '{$username}';";
$cart_result = mysqli_query($conn, $cart_sql);

if($row = mysqli_fetch_assoc($cart_result)) {
    $quantity += (int)$row['amount'];
    $toggle_sql = "UPDATE book_has_cart SET amount='{$quantity}' WHERE BOOK_ID ='{$id}' AND USERNAME = '{$username}';";
} else {
    $toggle_sql = "INSERT INTO book_has_cart VALUES ('{$id}','{$username}','{$quantity}');";
}

if (mysqli_query($conn, $toggle_sql)) {
    header('Content-Type: application/json');
    echo json_encode(['code' => 'sucessed']);
} else {
    header('Content-Type: application/json');
    echo json_encode(['code' => 'failed']);
}
?>