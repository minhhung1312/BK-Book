<?php
header('Access-Control-Allow-Origin: *');
include '../../db/conn.php';
include '../../utils/get_book_rating.php';
if (isset($_GET['sort'])) $sort = intval($_GET['sort']);
if (isset($_GET['sortAsc'])) $sortAsc = intval($_GET['sortAsc']);
if (isset($_GET['count'])) $count = intval($_GET['count']);
if (isset($_GET['page'])) $page = intval($_GET['page']);
if (isset($_GET["ctgr"])) $ctgrs = $_GET["ctgr"];
if (isset($_GET["cvr"])) $cvrs = $_GET["cvr"];
if (isset($_GET["age"])) $ages = $_GET["age"];
if (isset($_GET["instock"])) $instock = true;
if (isset($_GET["ps"])) $ps = intval($_GET["ps"]);
if (isset($_GET["pe"])) $pe = intval($_GET["pe"]);
if (isset($_GET["search"])) $search = $_GET["search"];
$sortTypes = array("name", "final_price", "discount", "stars");
$trimmed_sql = "SELECT DISTINCT `id`, `discount`, `image`, `name`, `price`, (`price` * (1 - `discount` / 100)) AS `final_price` FROM `book`";
if (isset($cvrs)) {
  if (!str_contains($trimmed_sql, " WHERE ")) $trimmed_sql .= " WHERE ";
  else $trimmed_sql .= " AND ";
  $cvrs_string = "(";
  foreach ($cvrs as $cvr) {
    $cvrs_string .= "'$cvr', ";
  }
  $cvrs_string = substr($cvrs_string, 0, -2);
  $cvrs_string .= ")";
  $trimmed_sql .= "`coverType` in $cvrs_string";
}
if (isset($ages)) {
  if (!str_contains($trimmed_sql, " WHERE ")) $trimmed_sql .= " WHERE ";
  else $trimmed_sql .= " AND ";
  $ages_string = "(";
  foreach ($ages as $age) {
    $ages_string .= "'$age', ";
  }
  $ages_string = substr($ages_string, 0, -2);
  $ages_string .= ")";
  $trimmed_sql .= "`age` in $ages_string";
}
if (isset($instock)) {
  if (!str_contains($trimmed_sql, " WHERE ")) $trimmed_sql .= " WHERE ";
  else $trimmed_sql .= " AND ";
  $trimmed_sql .= "`inStock` > 0";
}
if (isset($search)) {
  if (!str_contains($trimmed_sql, " WHERE ")) $trimmed_sql .= " WHERE ";
  else $trimmed_sql .= " AND ";
  $trimmed_sql .= "`name` LIKE '%$search%'";
}
if (isset($ps) && isset($pe)) {
  if (!str_contains($trimmed_sql, " WHERE ")) $trimmed_sql .= " WHERE ";
  else $trimmed_sql .= " AND ";
  $trimmed_sql .= "(`price` * (1 - `discount` / 100)) >= $ps AND (`price` * (1 - `discount` / 100)) <= $pe";
}
if (isset($ctgrs)) {
  
  $ctgrs_string = "(";
  foreach ($ctgrs as $ctgr) {
    $ctgrs_string .= "'$ctgr', ";
  }
  $ctgrs_string = substr($ctgrs_string, 0, -2);
  $ctgrs_string .= ")";

  $trimmed_sql = "SELECT DISTINCT `id`, `discount`, `image`, `name`, `price`, (`price` * (1 - `discount` / 100)) AS `final_price` FROM ($trimmed_sql) AS b, `book_has_category` AS bc WHERE b.id = bc.book_id AND bc.content IN $ctgrs_string";
}
$sql = $trimmed_sql;
$trimmed_sql .= " ORDER BY " . $sortTypes[$sort] . ($sortAsc ? " ASC" : " DESC");
$trimmed_sql .= " LIMIT " . $count * ($page - 1) . ", " . $count;
// var_dump($trimmed_sql);
$res = mysqli_query($conn, $trimmed_sql);
$res_array = array();
while ($row = mysqli_fetch_assoc($res)) {
  $rating = getBookRating($row['id'], $conn);
  $row['rating'] = $rating;
  array_push($res_array, $row);
}
$fullRes = mysqli_query($conn, $sql);
$fullDataCount = 0;
while ($row = mysqli_fetch_assoc($fullRes)) {
  $fullDataCount += 1;
}
header('Content-Type: application/json');
echo json_encode(array("resData" => $res_array, "count" => $fullDataCount));
exit();
