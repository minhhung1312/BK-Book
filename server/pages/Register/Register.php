<?php
header('Access-Control-Allow-Origin: *');
include '../../db/conn.php';
if (isset($_POST['username']) && isset($_POST['password'])) {
  $username = mysqli_real_escape_string($conn, $_POST['username']);
  $password = mysqli_real_escape_string($conn, $_POST['password']);
  if (!empty($username) && !empty($password)) {
    $username = mysqli_real_escape_string($conn, $username);
    $sql = "SELECT * FROM `USER` WHERE USERNAME='$username'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $response = array(
          'status' => 'error',
          'message' => 'Tài khoản đã tồn tại'
        );
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    } else {
      $hashed_password = password_hash($password, PASSWORD_DEFAULT);
      $sql = "INSERT INTO `USER` (USERNAME, password, isBanned, isAdmin) 
              VALUES ('$username', '$hashed_password','False','False')";
      if (mysqli_query($conn, $sql)) {
        $response = array(
          'status' => 'success',
          'message' => 'Đăng ký tài khoản thành công'
        );
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
      } else {
        $response = array(
          'status' => 'error',
          'message' => 'Có lỗi xảy ra khi đăng ký tài khoản' . mysqli_error($conn)
        );
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
      }
    }
  }
}
?>