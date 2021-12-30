<?php
require $_SERVER['DOCUMENT_ROOT'] . "/sosketch/settings/init.php";

header('Content-Type: application/json; charset=utf-8'); 
$imgSql = "SELECT * from images ORDER BY imgDate DESC";

$images = $db->sql($imgSql);

if (!isset($images)) {
    header('HTTP/1.1 500 Internal Server Error');
    $error["errorMessage"] = "There was an internal server error";
    echo json_encode($error);
  }
  
else if (isset($images)) {  
    header('HTTP/1.1 200 OK');
    echo(json_encode($images)); 
}

?>