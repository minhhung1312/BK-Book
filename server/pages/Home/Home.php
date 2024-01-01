<?php
    header('Access-Control-Allow-Origin: *');
    include '../../db/conn.php';
    require_once '../../utils/get_book_rating.php';

    $sql = "SELECT book_has_category.CONTENT AS category, COUNT(*) AS count
    FROM book_has_category
    GROUP BY book_has_category.CONTENT";
    $result = $conn->query($sql);


    $books = array();
    while($row = $result->fetch_assoc()) {
        $category = $row["category"];
        // top1
        $top1Sql = "SELECT ID, name, price, discount, image, description
                    FROM book
                    INNER JOIN book_has_category ON book.ID = book_has_category.BOOK_ID
                    WHERE book_has_category.CONTENT = '$category'
                    ORDER BY book.price DESC
                    LIMIT 1";
        $top1Result = $conn->query($top1Sql);
        $top1Row = $top1Result->fetch_assoc();
        $top1Book = array(
            "id" => $top1Row["ID"],
            "name" => $top1Row["name"],
            "price" => $top1Row["price"],
            "discount" => $top1Row["discount"],
            "image" => $top1Row["image"],
            "description" => $top1Row["description"],
            "rating" => getBookRating($top1Row["ID"], $conn)
        );

        // topk
        $topkSql = "SELECT ID, name, price, discount, image
                    FROM book
                    INNER JOIN book_has_category ON book.ID = book_has_category.BOOK_ID
                    WHERE book_has_category.CONTENT = '$category' AND book.ID != '" . $top1Book['id'] . "'
                    ORDER BY book.price DESC
                    LIMIT 4";
        $topkResult = $conn->query($topkSql);
        $topkBooks = array();
        while($topkRow = $topkResult->fetch_assoc()) {
            $topkBook = array(
                "id" => $topkRow["ID"],
                "name" => $topkRow["name"],
                "price" => $topkRow["price"],
                "discount" => $topkRow["discount"],
                "image" => $topkRow["image"],
                "rating" => getBookRating($topkRow["ID"], $conn)
            );
            array_push($topkBooks, $topkBook);
        }

        $book = array(
            "category" => $category,
            "top1" => $top1Book,
            "topk" => $topkBooks
        );
        array_push($books, $book);
    }

    header('Content-Type: application/json');
    echo json_encode($books);

    // Print
    // foreach ($books as $book) {
    //     echo "category: " . $book["category"] . "<br>";
    //     echo "Top 1:<br>";
    //     echo "Name: " . $book["top1"]["name"] . "<br>";
    //     echo "Price: " . $book["top1"]["price"] . "<br>";
    //     echo "Discount: " . $book["top1"]["discount"] . "<br>";
    //     echo "Image: " . $book["top1"]["image"] . "<br>";
    //     echo "description: " . $book["top1"]["description"] . "<br>";
    //     echo "Top k:<br>";
    //     foreach ($book["topk"] as $topkBook) {
    //         echo "Name: " . $topkBook["name"] . "<br>";
    //         echo "Price: " . $topkBook["price"] . "<br>";
    //         echo "Discount: " . $topkBook["discount"] . "<br>";
    //         echo "Image: " . $topkBook["image"] . "<br>";
    //     }
    //     echo "<br><br><br><br>";
    // }

?>