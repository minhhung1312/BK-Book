<?php 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE');
    header('Access-Control-Allow-Headers: Content-Type');
    include '../../../db/conn.php';
    if (isset($_GET['username'])) {
        $username=$_GET['username'];
        $sql = "SELECT USERNAME, lname, fname, phone, email, gender, DoB
        FROM `user` WHERE USERNAME = '$username'";
        $result = mysqli_query($conn, $sql);
        $profileinfo = [];
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                if ($row['gender'] === 'm'){
                    $gender='Nam';
                }
                else if ($row['gender'] === 'f'){
                    $gender='Nữ';
                }
                else {
                    $gender='Khác';
                }
                $profileinfo[] = [
                    'username' => $username,
                    'lastname' => $row['lname'],
                    'firstname' => $row['fname'],
                    'phonenumber' => $row['phone'],
                    'email' => $row['email'],
                    'gender' => $gender,
                    'dob' => $row['DoB'],
                ];
            }
        }
        echo json_encode($profileinfo);
    }     
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if(isset($_POST['username'])) {
            $username = $_POST['username'];
            $lastname = $_POST['lastname'];
            $firstname = $_POST['firstname'];
            $phonenumber = $_POST['phonenumber'];
            $email = $_POST['email'];
            $gender = $_POST['gender'];
            if ($gender === 'Nam') {
                $gender = 'm';
            } else if ($gender === 'Nữ') {
                $gender = 'f';
            } else {
                $gender = null;
            }
            $dob = $_POST['dob'];
            
            $sql = "UPDATE user SET lname='$lastname', fname='$firstname', phone='$phonenumber', email='$email', gender='$gender', DoB='$dob' WHERE USERNAME='$username'";
            $result = mysqli_query($conn, $sql);
            $row = $result->fetch_assoc();
            echo json_encode($row);
        }
    }
?>