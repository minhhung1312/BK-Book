<?php 
    header('Access-Control-Allow-Origin: *');
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
                    'sex' => $gender,
                    'dob' => $row['DoB'],
                ];
            }
        }
        echo json_encode($profileinfo);
    }
?>