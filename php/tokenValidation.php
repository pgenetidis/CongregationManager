<?php

        include("dbcon.php");
        
        $user = json_decode(file_get_contents("php://input"));
        $token = $user->token;

        $userInfo = $db->query("SELECT a.userId, a.firstname, a.lastname, a.email, a.clientId, a.token, b.roleName FROM users as a, userRoles as b WHERE b.roleId = a.roleId AND token='$token'");
        $userInfo = $userInfo->fetchAll();



    	if (count($userInfo) == 1){

    		echo json_encode($userInfo[0]);
    	}
    	else{
    	    $array = ['error' => 'Timeout'];

            echo json_encode($array);
    	}

?>