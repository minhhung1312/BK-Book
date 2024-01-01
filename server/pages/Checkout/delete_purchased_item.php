<?php
session_id("sess");
session_start();
header('Access-Control-Allow-Origin: http://localhost');
header("Access-Control-Allow-Credentials: true");
include '../../db/conn.php';
$username = $_POST["username"];
$ids = array_slice($_POST, 0, count($_POST) - 1);
var_dump($ids);
foreach ($ids as $id) {
  $sql = "DELETE FROM `book_has_cart` WHERE `USERNAME` = '$username' AND `BOOK_ID` = '$id'";
  $res = mysqli_query($conn, $sql);
}
exit();