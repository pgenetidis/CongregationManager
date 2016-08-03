    <?php

       include("dbcon.php");

       $data = json_decode(file_get_contents("php://input"));

       $boxInfo = $db->query("SELECT * FROM themeboxes WHERE id='$data->id'");
       $boxInfo = $boxInfo->fetchAll();

       if (count($boxInfo) == 1){




       }
       else{
            try{
                $q = "INSERT INTO themeboxes (boxname, boxpage, clientId, positionIndex, headercolor) VALUES (:boxname, :boxpage, :clientId, :positionIndex, :headercolor)";
                $query = $db->prepare($q);

                $execute = $query->execute(array(
                    ":boxname" => $data->boxname,
                    ":boxpage" => $data->pageName,
                    ":clientId" => $data->clientId,
                    ":positionIndex" => $data->positionIndex,
                    ":headercolor" => $data->headercolor
                ));

                $boxInfo2 = $db->query("SELECT * FROM themeboxes WHERE boxname='$data->boxname' AND boxpage='$data->pageName' AND clientId='$data->clientId' AND positionIndex='$data->positionIndex' AND headercolor='$data->headercolor'");
                $boxInfo2 = $boxInfo2->fetchAll();

                if (count($boxInfo2) == 1){

                    $count = 0;
                    foreach($data->fields as $field) {
                        $count = $count + 1;
                        $q3 = "INSERT INTO boxfields (boxfieldname, themeboxid, boxfieldindex, fieldsource) VALUES (:boxfieldname, :themeboxid, :boxfieldindex, :fieldsource)";
                        $query = $db->prepare($q3);

                        $execute = $query->execute(array(
                            ":boxfieldname" => $field->boxfieldname,
                            ":themeboxid" => $boxInfo2[0]['id'],
                            ":boxfieldindex" => $count,
                            ":fieldsource" => $field->fieldsource
                        ));

                    }
                }
            }
            catch(PDOException $e)
            {
                $array = ['error' => $e->getMessage()];

                echo json_encode($array);
            }
       }
?>