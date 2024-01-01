<?php
// get book from database
function getBookRating($id, $conn) {
    $sql = "SELECT * FROM `comment` WHERE BOOK_ID = '{$id}';";
    
    $result = mysqli_query($conn, $sql);
    $ratings = [];
    while ($row = mysqli_fetch_assoc($result)) {
      array_push($ratings, (int)$row['star']);
    }
    
    if(count($ratings) != 0)
        $avg_rating = (float)number_format(array_sum($ratings) / count($ratings), 1);
    else
        $avg_rating = 0;
    
    return $avg_rating;
}
?>