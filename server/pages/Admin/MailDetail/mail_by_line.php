<?php
header('Access-Control-Allow-Origin: *');
include '../../../db/conn.php';

$mailNo = $_GET['line'];

// get mail
$get_mail_sql = "SELECT * FROM `mail` ORDER BY `time` DESC LIMIT {$mailNo},1;";
$get_mail_result = mysqli_query($conn, $get_mail_sql);
$mail = mysqli_fetch_array($get_mail_result);

$has_read = $mail['hasRead'];
if ($has_read == 0) {
    $has_read_sql = "UPDATE mail SET hasRead=1 WHERE ID='{$mail['ID']}';";
    mysqli_query($conn, $has_read_sql);
}

header('Content-Type: application/json');
echo json_encode($mail);

exit;
?>