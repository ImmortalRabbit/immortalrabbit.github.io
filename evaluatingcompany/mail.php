<?php
if((isset($_POST['name'])&&$_POST['name']!="")&&(isset($_POST['tele'])&&$_POST['tele']!="")){ //Проверка отправилось ли наше поля name и не пустые ли они
$name = $_POST['name'];
$tele = $_POST['tele'];
$msg = $_POST['msg'];
$to = "demezhan1998@gmail.com";
$subject = "Заказ";
$headers = 'From: Заказ' . "\r\n";
$body = 'Заказ от '.$name.'и его номер:'.$tele. "\r\n";
if(mail($to, $subject, $body, $headers))
{
  echo 'Ваш заказ отправлен, с вами свяжутся';
}
else {
  echo "Ошибка";
}
}



?>
