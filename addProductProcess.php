<?php session_start();

require './connection.php'; 

$email = $_SESSION["u"]["email"];


$category = $_POST["ca"];
$brand = $_POST["b"];
$model = $_POST["m"];
$title = $_POST["t"];
$condition = $_POST["con"];
$color = $_POST["col"];
$quantity = $_POST["qty"];
$cost = $_POST["cost"];
$deliveryWithinColombo = $_POST["dwc"];
$deliveryOutsideColombo = $_POST["doc"];
$description = $_POST["desc"];

$mhb_rs = Database::search("SELECT * FROM `model_has_brand` WHERE `model_model_id`='".$model."' AND `brand_brand_id`='".$brand."'");
$mhb_id ;

if ($mhb_rs -> num_rows > 0) {
    $mhb_data = $mhb_rs -> fetch_assoc();
    $mhb_id = $mhb_data["id"];
} else {
    Database::iud("INSERT INTO `model_has_brand`(`model_model_id`,`brand_brand_id`) VALUES ('".$model."','".$brand."')");
    $mhb_id = Database::$connection->insert_id;
}

$day = new DateTime();
$timeZone = new DateTimeZone("Asia/Colombo");
$day -> setTimezone($timeZone);
$date = $day -> format("Y-m-d H:i:s");

$status = 1;

Database::iud("INSERT INTO `product`(`price`,`qty`,`description`,`title`,`datetime_added`,
`delivery_fee_colombo`,`delivery_fee_other`,`category_cat_id`,`model_has_brand_id`,`color_clr_id`,
`status_status_id`,`condition_condition_id`,`users_email`) VALUES ('".$cost."','".$qty."',
'".$desc."','".$title."','".$date."','".$dwc."','".$doc."','".$category."','".$mhb_id."',
'".$clr."','".$status."','".$condition."','".$email."')");

$product_id = Database::$connection->insert_id;
$length = sizeof($_FILES);

$if ($length <= 3 && $length > 0) {
    $allowedImageExtensions = array("image/jpg","image/jpeg","image/png","image/svg+xml");

    for ($x = 0; $x < $length; $x ++) {
        if (isset($_FILES["img".$x])) {
            $imageFile = $_FILES["img".$x];
            $fileExtension = $imageFile["type"];

            if (in_array($file_extention,$allowed_img_extentions)) {
                $newImageExtension;

                if ($file_extention === 'image/jpg') {
                    $newImageExtension = '.jpg';
                } else if ($file_extention === 'image/jpeg') {
                    $newImageExtension = '.jpeg';
                } else if ($file_extention === 'image/png') {
                    $newImageExtension = '.png';
                } else if ($file_extention === 'image/svg+xml') {
                    $newImageExtension = '.svg';
                }

                $fileName = 'resources//products//'.$title.'_'.$x.'_'.uniqid().$newImageExtension;
                move_uploaded_file($imageFile["tmp_name"],$fileName);

                Database::iud("INSERT INTO `product_img`(`img_path`,`product_id`) VALUES ('".$fileName."','".$product_id."')");
                echo ("success");
            } else {
                echo ("Not an allowed image type.")
            }
        }
    }
} else {
    echo ('Invalid number of images. Please upload 1 to 3 images.');
} ?>
