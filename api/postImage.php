<?php
require $_SERVER['DOCUMENT_ROOT'] . "/sosketch/settings/init.php";

$postData = json_decode(file_get_contents('php://input'));

$imgId;
$file = $_FILES;
$canvasImg2 = $_POST['file'];
$canvasImg = $_POST["file"];

if (empty($postData->image)) {
  header('HTTP/1.1 400 Bad Request');
  $error["errorMessage"] = "No image was found in the request.";
  echo json_encode($error);
}

if (!empty($postData->image)) {
    $imgSql =
      "INSERT INTO images (imgDate) VALUES(:imgDate)";
    $imgBind = [
      ":imgDate" => gmdate("Y-m-d H:i:s"),
    ];

    $db->sql($imgSql, $imgBind, false);

    $imageIdSql = "SELECT imgId FROM images ORDER BY imgId DESC LIMIT 1";

    $imageId = $db->sql($imageIdSql, null)[0];
 
  if (isset($imageId)) {
    $db->saveBase64ImagePng($postData->image, $_SERVER['DOCUMENT_ROOT'] . "/sosketch/uploads/submittedImages/", $imageId->imgId);
  }
  
  else if (!isset($imageId)) {
    header('HTTP/1.1 500 Internal Server Error');
    $error["errorMessage"] = "There was an internal server error";
    echo json_encode($error);
  }

  header('HTTP/1.1 201 Created');
  echo(json_encode($imageId->imgId));

} else {
  //echo "TEST 2";
}
?>