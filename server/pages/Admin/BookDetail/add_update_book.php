<?php
header('Access-Control-Allow-Origin: *');
include '../../../db/conn.php';

$id = $_POST['ID'];
$publisher = $_POST['publisher'];
$namebook = $_POST['namebook'];
$coverType = $_POST['coverType'];
$author = $_POST['author'];
$price = $_POST['price'];
$discount = $_POST['discount'];
$stock = $_POST['stock'];
$age = $_POST['age'];
$pic = $_POST['pic'];
$publish_year = $_POST['publish_year'];
$language = $_POST['language'];
$description = $_POST['description'];
$category = $_POST['category'];
$category = explode(',', $category);

$response = "";

if ($id != 0) //Trang update
{
    $sql = "
    DELETE FROM book_has_category WHERE BOOK_ID = '$id';
    ";

    $result = mysqli_query($conn, $sql);

    $sql = "
    UPDATE book
    SET publisher='$publisher', name='$namebook',coverType='$coverType', author='$author', price = '$price', discount = '$discount',
        image='$pic', year='$publish_year', language='$language', description='$description', inStock='$stock', age='$age'
    WHERE ID = '$id';
    ";

    $response = "Chỉnh sửa thành công";
}
else { //trang ADD
    $get_row = "
    SELECT COUNT(*) AS `index` 
    FROM book;
    ";

    $temp = mysqli_query($conn, $get_row);

    if (mysqli_num_rows($temp) > 0) {
        while($row = mysqli_fetch_assoc($temp)) {
            $new_ID = $row['index'] + 2;
            $new_ID = 'B' . $new_ID;
        }
    }

    $sql = "
    INSERT INTO book
    VALUE ('$new_ID', '$publisher', '$namebook','$coverType', '$author', '$price', '$discount',
        '$stock','$age','$pic', '$publish_year', '$language', '$description');
    ";

    $id = $new_ID;
    $response = "Thêm sách thành công";
}

$result = mysqli_query($conn, $sql);

//Them the loai vao cho book
if ($category[0] != '') {
    foreach ($category as $Acate){
        $sql = "
        INSERT INTO book_has_category
        VALUES ('$id', '$Acate');
        ";

        $result = mysqli_query($conn, $sql);
    }
}

header('Content-Type: application/json');
echo json_encode($category);
exit;
?>