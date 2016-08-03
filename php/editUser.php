<?php

    include("dbcon.php");

    $user = json_decode(file_get_contents("php://input"));



     $userInfo = $db->query("SELECT * FROM users WHERE email='$user->userId'");

     if (count($userInfo) ==1){
        $roleId = $db->query("SELECT roleId FROM userRoles WHERE roleName='$user->roleName'");
        $roleId = $roleId->fetchAll();
        $roleNameId = json_encode($roleId[0]);
        $tmp = json_decode($roleNameId);

        $q = "UPDATE users SET firstname=:firstname, lastname=:lastname,email=:email,roleId=:roleId,shortname=:shortname WHERE userId=:userId";
        $query = $db->prepare($q);

        $execute = $query->execute(array(
            ":firstname" => $user->firstname,
            ":lastname" => $user->lastname,
            ":email" => $user->email,
            ":userId" => $user->userId,
            ":roleId" => $tmp->roleId,
            ":shortname" => $user->shortname
        ));


        $array = ['success' => 'success'];

        echo json_encode($array);
     }
     else{
        $array = ['error' => 'User not exist'];

        echo json_encode($array);
     }


?>