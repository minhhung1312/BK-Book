<?php
header('Access-Control-Allow-Origin: *');
include '../../../db/conn.php';

$array = $_POST;
$ID = $array['ID'];
$title = $array['title'];
$description = $array['description'];
$date = date("Y-m-d");
$thumbnail = $array['thumbnail'];
$tag = $_POST['tag'];
$tag = explode(',', $tag);

$response = "";

if ($ID != 0) { //Trang UPDATE
    $sql = "
    DELETE FROM news_has_tag WHERE NEWS_ID = '$ID';
    ";

    $result = mysqli_query($conn, $sql);

    $sql = "
    UPDATE news
    SET title='$title', content='$description', time='$date', thumnail='$thumbnail'
    WHERE ID = '$ID';
    ";
    
    $result = mysqli_query($conn, $sql);

    $response = "Chỉnh sửa thành công";
}
else { //Trang ADD
    $get_row = "
    SELECT COUNT(*) AS `index` 
    FROM news;
    ";

    $temp = mysqli_query($conn, $get_row);

    if (mysqli_num_rows($temp) > 0) {
        while($row = mysqli_fetch_assoc($temp)) {
            $new_ID = $row['index'] + 1;
            $ID = 'N' . $new_ID;
        }
    }

    $sql = "
    INSERT INTO news
    VALUES ('$ID', '$title', '$description',  '$date', '$thumbnail');
    ";
    $result = mysqli_query($conn, $sql);
    
    $response = "Thêm tin tức thành công !!";
}


//Them the loai vao cho book
if ($tag[0] != '') {
    foreach ($tag as $Atag){
        $sql = "
        INSERT INTO news_has_tag
        VALUES ('$ID', '$Atag', 1);
        ";

        $result = mysqli_query($conn, $sql);
    }
}

header('Content-Type: application/json');
echo json_encode($response);
exit;
?>