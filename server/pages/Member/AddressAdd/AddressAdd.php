<?php 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE');
    header('Access-Control-Allow-Headers: Content-Type');
    include '../../../db/conn.php';
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if(isset($_POST['username']) && isset($_POST['id'])) {
            $id=$_POST['id'];
            $username = $_POST['username'];
            $lastname = $_POST['lastname'];
            $firstname = $_POST['firstname'];
            $phonenumber = $_POST['phonenumber'];
            $province = $_POST['province'];
            $district = $_POST['district'];
            $ward = $_POST['ward'];
            $addr = $_POST['addr'];
            $sql = "INSERT INTO address (ID, USERNAME, fname, lname, 
                    phone, province, district, ward, addr, isDefault)
                    VALUES ('$id', '$username', '$lastname', '$firstname', 
                    '$phonenumber', '$province' , '$district', '$ward', '$addr', 'False') ";
            $result = mysqli_query($conn, $sql);
        }
    } 
?>