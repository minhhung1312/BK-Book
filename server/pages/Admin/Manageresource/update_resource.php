<?php
header('Access-Control-Allow-Origin: *');
include '../../../db/conn.php';

$logo = $_POST['logo'];
$sliders = json_decode($_POST['sliders']);

$truncate_logo_sql = "TRUNCATE TABLE `logo`;";
$add_logo_sql = "INSERT INTO `logo` (`ID`, `link`) VALUES ('L1', '{$logo}');";
    
$truncate_sliders_sql = "TRUNCATE TABLE `slider`;";
$add_slider_sql = "";
for ($i=0; $i < count($sliders); $i++) { 
    $add_slider_sql .= "INSERT INTO `slider` (`ID`, `link`) VALUES ('L{$i}', '{$sliders[$i]}');";
}

$compose_sql = $truncate_logo_sql.$add_logo_sql.$truncate_sliders_sql.$add_slider_sql;

if (mysqli_multi_query($conn, $compose_sql)) {
    header('Content-Type: application/json');
    echo json_encode(['code' => 'sucessed']);
} else {
    header('Content-Type: application/json');
    echo json_encode(['code' => 'failed']);
}
?>