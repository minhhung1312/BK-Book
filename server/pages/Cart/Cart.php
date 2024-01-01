<?php 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE');
    include '../../db/conn.php';
    session_id("sess");
    session_start();
    if (isset($_GET['username'])) {
        $username=$_GET['username'];
        $sql = "SELECT * FROM `book_has_cart` WHERE USERNAME = '$username'";
        $result = mysqli_query($conn, $sql);
        $products = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $book_id=$row['BOOK_ID'];
            $count=$row['amount'];
            $sql_book = "SELECT * FROM `book` WHERE ID = '$book_id'";
            $result_book = mysqli_query($conn, $sql_book);
            $row_book = mysqli_fetch_assoc($result_book);
            $name=$row_book['name'];
            $price=$row_book['price'];
            $discount=$row_book['discount'];
            $image=$row_book['image'];

            $product = array(
                'id' => $book_id,
                'image' => $image,
                'name' => $name,
                'price' => $price,
                'discount' => $discount,
                'count' => $count
            );
            array_push($products, $product);     
        } 
        echo json_encode($products);
    } 
    else {
        echo json_encode(array());
    }

    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        $username = $_SESSION["username"];
        $id = $_GET['id'];
        $sql_delete = "DELETE FROM `book_has_cart` WHERE USERNAME = '$username' AND BOOK_ID = '$id'";
        $result_delete = mysqli_query($conn, $sql_delete);
        echo $id;
    }
?>