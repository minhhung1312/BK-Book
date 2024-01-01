<?php
session_id("sess");
session_start();
header('Access-Control-Allow-Origin: http://localhost');
header("Access-Control-Allow-Credentials: true");
include '../db/conn.php';
if (isset($_SESSION['username'])) {
  $username = $_SESSION['username'];
  $sql = "SELECT * FROM `user` WHERE `username` = '$username'";
  $res = mysqli_query($conn, $sql);
  $row = mysqli_fetch_assoc($res);
  header('Content-Type: application/json');
  echo json_encode($row);
}
else echo json_encode(null);