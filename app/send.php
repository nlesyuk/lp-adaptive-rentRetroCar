<?php
$Result = array(
	"status" => "ERROR",
	"error" => "Data is empty",
	"data" => "",
);
$MailList = array('pronaza@gmail.com');
$subject = "Ретро-автобус VW T2 ".time();
$FromName = "Ретро-автобус VW T2";
$From = "order-zodiac@markline.agency";

$Charset = "utf-8";
$ContentType = "text/html";

$HTMLHeaders = "MIME-Version: 1.0\r\nContent-type: ".$ContentType."; charset=".$Charset."\r\n";
$HTMLHeaders .= "From: ". $FromName ." <". $From .">\r\n";

$mail_to = "";
$i = 0;
foreach($MailList AS $Email){
	$Separator = $i == 0 ? "" : ", ";
	$mail_to .= $Separator . "<" . $Email . ">";
	$i++;
}

$Name = isset($_POST['name']) && !empty($_POST['name']) ? trim($_POST['name']) : "Фиг его знает кто";
$Phone = isset($_POST['phone']) && !empty($_POST['phone']) ? trim($_POST['phone']) : "Хоть в рельсу звони";

$text = "";

$text .= '<div>'
		. '<h2>Поступил новый заказ</h2>'
		. '<div>От: '.$Name.'</div>'
		. '<div>Телефон: '.$Phone.'</div>'
		. '<div>Услуга: ".$FromName ."</div>'
		. '</div>';

if(isset($_POST) && !empty($_POST)){
	if(mail($mail_to, $subject, $text, $HTMLHeaders)){
		$Result['status'] = "OK";
		$Result['error'] = "Message has been sent successfully";
		$Result['data'] = $Name ." ".$Phone;
	}
}
echo json_encode($Result); 
// Header('Location: success.html'); 