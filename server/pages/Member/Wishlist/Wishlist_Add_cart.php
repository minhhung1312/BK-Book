<?php
header('Access-Control-Allow-Origin: *');
include '../../../db/conn.php';

$id = $_GET['id'];
$username = $_GET['username'];

$sql = "
SELECT * FROM book_has_cart where BOOK_ID='$id' and USERNAME='$username';
";
$result = mysqli_query($conn, $sql);
$isExist = 0;
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $isExist = (int)$row['amount'];
    }
}
if ($isExist != 0) {
    //new isExist is amount of buy
    $isExist += 1;
    $sql = "
    UPDATE book_has_cart
    SET amount='$isExist'
    WHERE BOOK_ID='$id' and USERNAME='$username';
    ";
    $result = mysqli_query($conn, $sql);
}
else {
    $isExist += 1;
    $sql = "
    INSERT INTO book_has_cart
    VALUES('$id', '$username', $isExist);
    ";
    $result = mysqli_query($conn, $sql);
}

header('Content-Type: application/json');
echo json_encode($isExist);
exit;
?>