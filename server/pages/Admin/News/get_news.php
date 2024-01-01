<?php
header('Access-Control-Allow-Origin: *');
include '../../../db/conn.php';

$id = $_POST['id'];

$info_sql = "SELECT * FROM news WHERE ID = '$id';";
$info_result = mysqli_query($conn, $info_sql);
$news = mysqli_fetch_assoc($info_result);

$tag_sql = "SELECT CONTENT FROM news_has_tag WHERE NEWS_ID='$id';";
$tag_result = mysqli_query($conn, $tag_sql);
$news['tags'] = array();
$news['thumbnail'] = $news['thumnail'];

while($row = mysqli_fetch_assoc($tag_result)) {
    array_push($news['tags'], $row['CONTENT']);
}

header('Content-Type: application/json');
echo json_encode($news);
exit;
