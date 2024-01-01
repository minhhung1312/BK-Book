<?php 
    header('Access-Control-Allow-Origin: *');
    include '../../db/conn.php';
    if (isset($_GET['id'])) $id = $_GET['id'];
    else exit();
    $sql = "SELECT * FROM news WHERE `id` = '$id'";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($result);
    $res_array = array();
    array_push($res_array, $row);
    $sql = "SELECT * FROM news WHERE `id` <> '$id' LIMIT 3";
    $result = mysqli_query($conn, $sql);
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($res_array, $row);
    }
    // var_dump($res_array);
    echo json_encode($res_array);
    
    // if (mysqli_num_rows($result) > 0) {
    //     $news_arr = array();
    //     while($row = mysqli_fetch_assoc($result)) {
    //         $news_arr[] = $row;
    //     }
    //     echo json_encode($news_arr);
    // }


?>