<?php
header('Access-Control-Allow-Origin: *');
include '../../db/conn.php';
require_once '../../utils/get_book_rating.php';

// get book from database
$id = $_GET['id'];

$sql = "SELECT * FROM `book` WHERE ID = '{$id}';";

$result = mysqli_query($conn, $sql);
$res = mysqli_fetch_assoc($result);
$res['rating'] = getBookRating($id, $conn);
$res['has_wishlist'] = false;

if(isset($_GET['username'])) {
    $username = $_GET['username'];
    $wishlist_sql = "SELECT BOOK_ID FROM `book_has_wishlist` WHERE BOOK_ID ='{$id}' AND USERNAME = '{$username}';";
    $wishlist_result = mysqli_query($conn, $wishlist_sql);
    if($row = mysqli_fetch_assoc($wishlist_result))
        $res['has_wishlist'] = true;
}

header('Content-Type: application/json');
echo json_encode($res); 
        
exit;
?>