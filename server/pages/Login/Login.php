<?php
session_id("sess");
session_start();

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
include '../../db/conn.php';
if (isset($_POST['username']) && isset($_POST['password'])) {
  // $username = mysqli_real_escape_string($conn, $_POST['username']);
  // $password = mysqli_real_escape_string($conn, $_POST['password']);
  $username = $_POST['username'];
  $password = $_POST['password'];
  if (!empty($username) && !empty($password)) {
    $username = mysqli_real_escape_string($conn, $username);
    $sql = "SELECT * FROM `USER` WHERE USERNAME='$username'";
    // $sql = mysqli_prepare($conn, "SELECT * FROM `USER` WHERE USERNAME=?");
    // mysqli_stmt_bind_param($sql, "s", $username);
    // $result = mysqli_execute_query ($conn, $sql);
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
      $row = mysqli_fetch_assoc($result);
      $usernamedb = $row['USERNAME'];
      $passworddb = $row['password'];
      $check_banned = $row['isBanned'];
      if ($check_banned === "True") {
        $response = array(
          'status' => 'banned',
          'message' => 'Tài khoản đã bị cấm'
        );
        header('Content-Type: application/json');
        echo json_encode($response);
      } else {
        if ($username ===  $usernamedb && password_verify($password, $passworddb)) {
          //password_verify($password, $passworddb)
          $response = array(
            'status' => 'success',
            'message' => 'Success',
            'username' => $username
          );
          $_SESSION["username"] = $username;
          header('Content-Type: application/json');
          echo json_encode($response);
        } else {
          $response = array(
            'status' => 'error',
            'message' => 'Tài khoản hoặc mật khẩu chưa chính xác'
          );
          header('Content-Type: application/json');
          echo json_encode($response);
        }
      }
    } else {
      $response = array(
        'status' => 'error',
        'message' => 'Tài khoản hoặc mật khẩu chưa chính xác'
      );
      header('Content-Type: application/json');
      echo json_encode($response);
    }
  }
}
