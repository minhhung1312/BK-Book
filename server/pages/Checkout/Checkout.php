<?php
session_id("sess");
session_start();
header('Access-Control-Allow-Origin: http://localhost');
header("Access-Control-Allow-Credentials: true");
include '../../db/conn.php';
if (isset($_SESSION['username'])) {
  $username = $_SESSION['username'];
  $sql = "SELECT * FROM `address` WHERE `username` = '$username'";
  $res = mysqli_query($conn, $sql);
  $res_array = array();
  while ($row = mysqli_fetch_assoc($res)) {
    array_push($res_array, $row);
  }
  header('Content-Type: application/json');
  echo json_encode($res_array);
}