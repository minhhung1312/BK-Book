<?php 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE');
    header('Access-Control-Allow-Headers: Content-Type');
    include '../../../db/conn.php';
    if (isset($_GET['username']) && isset($_GET['id'])) {
        $username=$_GET['username'];
        // $username="phamdaihoangan";
        // $id="A1";
        $id = $_GET['id'];
        $sql = "SELECT lname, fname, phone, province, district, ward, addr
        FROM `address` WHERE USERNAME = '$username' AND ID = '$id'";
        $result = mysqli_query($conn, $sql);
        $Addressinfo = [];
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $Addressinfo[] = [
                    'lastname' => $row['lname'],
                    'firstname' => $row['fname'],
                    'phonenumber' => $row['phone'],
                    'province' => $row['province'],
                    'district' => $row['district'],
                    'ward' => $row['ward'],
                    'addr' => $row['addr'],
                ];
            }
        }
        echo json_encode($Addressinfo);
    }     
    
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
            $sql = "UPDATE address SET lname='$lastname', fname='$firstname', phone='$phonenumber', 
            province='$province', district='$district', ward='$ward', addr='$addr' 
            WHERE USERNAME='$username' AND ID = '$id' ";
            $result = mysqli_query($conn, $sql);
        } 
    } 
?>