<?php

        include("dbcon.php");
        
        $user = json_decode(file_get_contents("php://input"));
        $password = sha1($user>password);
        $email = $user->email;
        $clientId = $user->clientId;



        $userInfo = $db->query("SELECT * FROM users WHERE email='$email' AND password='$password' AND clientId='$clientId'");
        $userInfo = $userInfo->fetchAll();

    	$token;

    	if (count($userInfo) == 1){

    		$token = $email . " | " . uniqid() . uniqid() . uniqid();

    	    $q = "UPDATE users SET token=:token WHERE email=:email AND password=:password AND clientId=:clientId";
    	    $query = $db->prepare($q);
    	    $execute = $query->execute(array(
    		    ":token" => $token,
    		    ":email" => $email,
    		    ":password" => $password,
    		    ":clientId" => $clientId
    	    ));



            $userInfo = $db->query("SELECT a.userId, a.firstname, a.lastname, a.email, a.clientId, a.token, b.roleName FROM users as a, userRoles as b WHERE b.roleId = a.roleId AND token = '$token'");
            $userInfo = $userInfo->fetchAll();


            echo json_encode($userInfo[0]);

    	}
    	else{
    	    $array = ['error' => 'Username, Password or client Id are wrong'];
            
            echo json_encode($array);
    	}

?>