<?php
header('Access-Control-Allow-Origin: *');
include '../../db/conn.php';
if (isset($_GET['sort'])) $sort = $_GET['sort'];
if (isset($_GET['ctgr'])) {
  $ctgr = $_GET['ctgr'];
  if ($ctgr == "Tất Cả") {
    $ctgr = "";
  }
}
if (isset($_GET['page'])) $page = intval($_GET['page']);
// $sql = "SELECT * FROM (`news` JOIN `news_has_tag` ON `ID` = `NEWS_ID`) LEFT JOIN (SELECT NEWS_ID, COUNT(*) as like_count FROM `like` GROUP BY NEWS_ID) WHERE `news_has_tag`.`CONTENT` = '$ctgr'";
$sql = "SELECT * FROM `news` JOIN `news_has_tag` ON `ID` = `NEWS_ID` LEFT JOIN (SELECT NEWS_ID, COUNT(*) as like_count FROM `like` GROUP BY NEWS_ID) counttbl ON counttbl.news_id = news_has_tag.NEWS_ID WHERE `news_has_tag`.`CONTENT` LIKE '%$ctgr%'";
if (isset($_GET['search'])) {
  $search = $_GET['search'];
  $sql .= " AND `title` LIKE '%$search%'";
}
if ($sort == "Thời gian") {
  $sql .= " ORDER BY `time` DESC";
} else {
  $sql .= " ORDER BY `title` ASC";
}
$sql_all = $sql;
$sql .= " LIMIT " . 4 * ($page - 1) . ", " . 4;
$res = mysqli_query($conn, $sql);
$res_array = array();
while ($row = mysqli_fetch_assoc($res)) {
  array_push($res_array, $row);
}
$fullRes = mysqli_query($conn, $sql_all);
$count = 0;   
while ($row = mysqli_fetch_assoc($fullRes)) {
  $count += 1;
}
header('Content-Type: application/json');
echo json_encode(array("resData" => $res_array, "count" => $count, "sql" => $sql));
exit();