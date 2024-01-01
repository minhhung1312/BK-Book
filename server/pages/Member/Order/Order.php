<?php
header('Access-Control-Allow-Origin: *');
include '../../../db/conn.php';

$id = $_GET['id'];
$username = $_GET['username'];

if ($id != 0)
{
    $sql = "
    SELECT * 
    FROM past_order
    INNER JOIN book_has_pastorder
    ON past_order.ID = book_has_pastorder.PO_ID and past_order.USERNAME = book_has_pastorder.PO_USERNAME
    INNER JOIN book
    ON book_has_pastorder.BOOK_ID = book.ID
    WHERE past_order.USERNAME = '$username' and past_order.status = '$id';
  ";
}
else {
    $sql = "
    SELECT * 
    FROM past_order
    INNER JOIN book_has_pastorder
    ON past_order.ID = book_has_pastorder.PO_ID and past_order.USERNAME = book_has_pastorder.PO_USERNAME
    INNER JOIN book
    ON book_has_pastorder.BOOK_ID = book.ID
    WHERE past_order.USERNAME = '$username';
  ";
}




$result = mysqli_query($conn, $sql);
$response = array();
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
    array_push($response, $row);
    }
}
header('Content-Type: application/json');
echo json_encode($response);
exit;
?>