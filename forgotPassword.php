<?php

require 'connection.php';
require 'smtp.php';
require 'phpmailer.php';
require 'exception.php';

use PHPMailer\PHPMailer\PHPMailer;

if (isset($_GET['email'])) {
    $email = $_GET['email'];

    $rs = Database::search("SELECT * FROM `users` WHERE `email`='" . $email . "'");
    $n = $rs->num_rows;

    if ($n === 1) {
        $code = uniqid();
        Database::iud("UPDATE `users` SET `verification_code`='" . $code . "' WHERE `email`='" . $email . "'");
        
        $senderEmail = 'gaganaweerakoon@gmail.com';
        $senderPassword = 'fbvaoiucldqcnjwm';

        $mail = new PHPMailer();
            $mail->IsSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = $senderEmail;
            $mail->Password = $senderPassword;
            $mail->SMTPSecure = 'ssl';
            $mail->Port = 465;
            $mail->setFrom($senderEmail, 'Reset Password');
            $mail->addReplyTo($senderEmail, 'Reset Password');
            $mail->addAddress($email);
            $mail->isHTML(true);
            $mail->Subject = 'eShop Forgot Password Verification Code';
            $bodyContent = '<h1 style="color:green;">Your verification code is ' . $code . '</h1>';
            $mail->Body = $bodyContent;

        if (!$mail->send()) {
            echo ("Verification Code Sending Failed.");
        } else {
            echo ("success");
        }
    } else {
        echo ("Invalid Email Address.");
    }
}

?>