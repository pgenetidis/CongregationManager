    <?php

       include("dbcon.php");

       $data = json_decode(file_get_contents("php://input"));

       $boxInfo = $db->query("SELECT * FROM themeboxes WHERE id='$data->id'");
       $boxInfo = $boxInfo->fetchAll();



       if (count($boxInfo) == 1){
       try{
            $q = "DELETE FROM themeboxes WHERE id=:id";
            $query = $db->prepare($q);

            $execute = $query->execute(array(
                        ":id" => $data->id,

                    ));
       }
       catch(PDOException $e)
       {
           $array = ['error' => $e->getMessage()];

           echo json_encode($array);
       }
    }
?>