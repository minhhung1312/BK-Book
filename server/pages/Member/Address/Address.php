<?php 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE');
    include '../../../db/conn.php';
    if (isset($_GET['username'])){
        $username = $_GET['username'];
        $sql = "SELECT USERNAME, ID, lname, fname, phone, province, district, ward, addr, isDefault
        FROM `address` WHERE USERNAME = '$username'";
        $result = mysqli_query($conn, $sql);

        $addresses = array(); 
        
        while($row = mysqli_fetch_assoc($result)) {
            $address = array(
                'id' => $row['ID'],
                'lastname' => $row['lname'],
                'firstname' => $row['fname'],
                'phonenumber' => $row['phone'],
                'province' => $row['province'],
                'district' => $row['district'],
                'ward' => $row['ward'],
                'addr' => $row ['addr'],
                'isDefault' => $row['isDefault']
            );
            array_push($addresses, $address);
        }
        
        header('Content-Type: application/json');
        echo json_encode($addresses);
    }

    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        $id = $_GET['id'];
        $username = $_GET['username'];
        $sql_delete = "DELETE FROM `address` WHERE USERNAME = '$username' AND ID = '$id'";
        $result_delete = mysqli_query($conn, $sql_delete);
        echo $id;
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_POST['username']) && isset($_POST['id']) && isset($_POST['idDefault'])){
            $username = $_POST['username'];
            $idDefault = $_POST['idDefault'];
            $id = $_POST['id'];
            
            $sql = "UPDATE `address` 
                SET isDefault='False' 
                WHERE USERNAME = '$username' AND ID = '$idDefault'";
            $result = mysqli_query($conn, $sql);
            
            $sql_default = "UPDATE `address` 
                SET isDefault='True' 
                WHERE USERNAME = '$username' AND ID = '$id'";
            $result_default = mysqli_query($conn, $sql_default);
        }
    } 
    
?>