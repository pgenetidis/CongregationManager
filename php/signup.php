<?php
	    include("dbcon.php");

	    $email = $_GET["email"];
	    $firstname = $_GET["firstname"];
	    $lastname = $_GET["lastname"];
    	$password = sha1($_GET["password"]);
    	$clientId = $_GET["clientId"];
    	$roles = $_GET["roles"];

        $q = "INSERT INTO users (email, firstname, lastname, password, clientId, roles) VALUES ('$email', '$firstname', '$lastname', '$password', '$clientId', '$roles')";

    	mysql_query($q) or die(mysql_error());

    	echo mysql_error();

?>
