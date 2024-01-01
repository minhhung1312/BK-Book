<?php
header('Access-Control-Allow-Origin: *');
include '../../../db/conn.php';

$id = $_GET['id'];
$username = $_GET['username'];

if ($id == 0) {
    $sql = "
    SELECT * 
    FROM book
    INNER JOIN book_has_wishlist
    ON book_has_wishlist.BOOK_ID = book.ID
    WHERE book_has_wishlist.USERNAME = '$username'
    ;
    ";
}
else {
    $sql = "
    DELETE
    FROM book_has_wishlist
    WHERE BOOK_ID = '$id' AND USERNAME='$username';
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