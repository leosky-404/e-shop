<?php

require './connection.php';

$email = $_POST["e"];
$newPassword = $_POST["np"];
$retypedPassword = $_POST["rnp"];
$verificationCode = $_POST["vc"];

if (empty($email)) {
    echo ("Please enter your email address.");
} else if (empty($newPassword)) {
    echo ("Please enter a New Password.");
} else if (strlen($newPassword) < 5 || strlen($newPassword) > 20) {
    echo ("Invalid New Password.");
} else if (empty($retypedPassword)) {
    echo ("Please Retype the New Password.");
} else if ($newPassword != $retypedPassword) {
    echo ("Password does not matched.");
} else if (empty($verificationCode)) {
    echo ("Please enter your verification code.");
} else {

    $rs = Database::search("SELECT * FROM `users` WHERE `email`='" . $email . "' AND 
    `verification_code`='" . $verificationCode . "'");

    $n = $rs->num_rows;

    if ($n == 1) {

        Database::iud("UPDATE `users` SET `password`='" . $newPassword . "' WHERE `email`='" . $email . "' AND 
        `verification_code`='" . $verificationCode . "'");

        echo ("success");

    } else {
        echo ("Invalid user details.");
    }
}
 
?>