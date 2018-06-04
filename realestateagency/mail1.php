<?php
if((isset($_POST['first_name'])&&$_POST['first_name']!="")&&(isset($_POST['contact'])&&$_POST['contact']!="")){ //Проверка отправилось ли наше поля name и не пустые ли они
$name = $_POST['first_name'];
$email = $_POST['contact'];
$to = "demezhan1998@gmail.com";
$subject = "Заказ";
$headers = 'From: Заявку на уборку' . "\r\n";
$body = 'Заказ от '.$name.'и его номер:'.$email. "\r\n";
if(mail($to, $subject, $body, $headers))
{
  echo 'Ваш заказ отправлен, с вами свяжутся';
}
else {
  echo "Ошибка";
}
}



?>
