<?php require './connection.php';
require './smtp.php';
require './phpmailer.php';
require './exception.php';

use PHPMailer\PHPMailer\PHPMailer;

if (isset($_GET['e'])) {
    $email = $_GET['e'];
    $rs = Database::search("SELECT * FROM `users` WHERE `email`='" . $email . "'");
    $n = $rs -> num_rows;

    if ($n === 1) {
        $code = uniqid();
        Database::iud("UPDATE `users` SET `verification_code`='" . $code . "' WHERE `email`='" . $email . "'");

        $mail = new PHPMailer;
        $mail -> IsSMTP();
        $mail -> Host = 'smtp.gmail.com';
        $mail -> SMTPAuth = true;
        $mail -> Username = ''; // Enter email address here
        $mail -> Password = ''; // Enter password here
        $mail -> SMTPSecure = 'ssl';
        $mail -> Port = 465;
        $mail -> setFrom('', 'Reset Password'); // Enter email address here
        $mail -> addReplyTo('', 'Reset Password'); // Enter email address here
        $mail -> addAddress($email);
        $mail -> isHTML(true);
        $mail -> Subject = 'eShop Forgot Password Verification Code';
        $bodyContent = '<h1 style="color:green;">Your verification code is ' . $code . '</h1>';
        $mail -> Body = $bodyContent;

        if (!$mail -> send()) {
            echo ("Verification Code Sending Failed.");
        } else {
            echo ("success");
        }
    } else {
        echo ("Invalid Email Address.");
    }
} ?>