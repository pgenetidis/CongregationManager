<?php

     include("dbcon.php");

     $data = json_decode(file_get_contents("php://input"));

     $boxfields = $db->query("SELECT * FROM boxfields where themeboxid='$data->id'");
     $boxfields = $boxfields->fetchAll();


     $obj = (object)array('boxfields' => $boxfields);
     $obj->boxfields = $boxfields;
     echo json_encode($obj);



?>