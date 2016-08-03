<?php

    include("dbcon.php");

    $user = json_decode(file_get_contents("php://input"));


        try {
            $roleId = $db->query("SELECT roleId FROM userRoles WHERE roleName='$user->roleName'");
            $roleId = $roleId->fetchAll();
            $roleNameId = json_encode($roleId[0]);
            $tmp = json_decode($roleNameId);

            $q = "INSERT INTO users (email, password, firstname, lastname, clientId, roleId, token, shortname) VALUES (:email, :password, :firstname, :lastname, :clientId, :roleId, :token, :shortname)";
            $query = $db->prepare($q);

            $execute = $query->execute(array(
                ":email" => $user->email,
                ":password" => sha1("maniac"),
                ":firstname" => $user->firstname,
                ":lastname" => $user->lastname,
                ":clientId" => $user->clientId,
                ":roleId" => $tmp->roleId,
                ":token" => "LOGGED OUT",
                ":shortname" => $user->shortname
            ));


            $array = ['success' => 'success'];

            echo json_encode($user);

        }
        catch(PDOException $e)
        {
            $array = ['error' => $e->getMessage()];

            echo json_encode($array);
        }
?>