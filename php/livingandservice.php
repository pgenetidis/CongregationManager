<?php

     include("dbcon.php");

     $data = json_decode(file_get_contents("php://input"));



     $themeboxes = $db->query("SELECT * FROM themeboxes where clientId='$data->clientId' AND boxpage='$data->pageName'");
     $themeboxes = $themeboxes->fetchAll();

     $boxfields = $db->query("SELECT a.boxfieldname,a.boxfieldindex,a.fieldsource, a.themeboxid FROM boxfields as a, themeboxes as b WHERE b.clientId='$data->clientId' AND b.boxpage='$data->pageName' AND a.themeboxid=b.id");
     $boxfields = $boxfields->fetchAll();

     $boxValues = $db->query("SELECT * FROM boxValues as a, boxfields as b WHERE a.firstday = '$data->firstday' and a.lastday = '$data->lastday' and a.boxfieldid=b.id");
     $boxValues = $boxValues->fetchAll();


     $obj = (object)array('themeboxes' => $themeboxes);
     $obj->boxValues = $boxValues;
     $obj->boxfields = $boxfields;

     echo json_encode($obj);

?>