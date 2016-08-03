<?php  
$db = new PDO("mysql:host=localhost;dbname=VersammlungsOrganisation;port=3306","root","root",
  array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
));

$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>