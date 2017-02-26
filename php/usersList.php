<?php

        include("dbcon.php");
    	$userInfo = $db->query("SELECT a.userId, a.firstname, a.lastname, a.shortname, a.email, a.clientId, a.trolley, b.roleName, a.token, c.id as groupId, c.groupname from users as a, userRoles as b, congregationGroups as c WHERE b.roleId = a.roleId AND c.id = a.congregationsGroupId");
        $userInfo = $userInfo->fetchAll();

        $userRolesInfo = $db->query("SELECT * from userRoles");
        $userRolesInfo = $userRolesInfo->fetchAll();

        $congregations = $db->query("SELECT * from congregations");
        $congregations = $congregations->fetchAll();

        $congregationGroups = $db->query("SELECT a.groupname,a.id,a.responibleUserId, a.secondresponible, b.firstname, b.lastname from congregationGroups as a,users as b WHERE b.userId = a.responibleUserId");
        $congregationGroups = $congregationGroups->fetchAll();

        $obj = (object)array('userInfo' => $userInfo);
        $obj->userRolesInfo = $userRolesInfo;
        $obj->congregations = $congregations;
        $obj->congregationGroups = $congregationGroups;

        echo json_encode($obj);

?>