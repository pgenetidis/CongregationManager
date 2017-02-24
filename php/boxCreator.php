    <?php

       include("dbcon.php");

       $data = json_decode(file_get_contents("php://input"));

       $boxInfo = $db->query("SELECT * FROM themeboxes WHERE id='$data->id'");
       $boxInfo = $boxInfo->fetchAll();

       if (count($boxInfo) == 1){
            try{
                $q = "UPDATE themeboxes SET boxname=:boxname, positionIndex=:positionIndex, headercolor=:headercolor WHERE id='$data->id'";
                $query = $db->prepare($q);

                $execute = $query->execute(array(
                    ":boxname" => $data->boxname,
                    ":positionIndex" => $data->positionIndex,
                    ":headercolor" => $data->headercolor
                ));

                foreach($data->fields as $field) {

                    $info = $db->query("SELECT * FROM boxfields WHERE id='$field->id'");
                    $info = $info->fetchAll();

                    if (count($info) == 1){
                        $q2 = "UPDATE boxfields SET boxfieldname=:boxfieldname, fieldsource=:fieldsource, boxfieldindex=:boxfieldindex WHERE id='$field->id'";
                        $query = $db->prepare($q2);

                        $execute = $query->execute(array(
                            ":boxfieldname" => $field->boxfieldname,
                            ":fieldsource" => $field->fieldsource,
                            ":boxfieldindex" => $field->boxfieldindex,
                        ));
                    }
                    else
                    {
                        $q3 = "INSERT INTO boxfields (boxfieldname, themeboxid, boxfieldindex, fieldsource) VALUES (:boxfieldname, :themeboxid, :boxfieldindex, :fieldsource)";
                        $query = $db->prepare($q3);

                        $execute = $query->execute(array(
                            ":boxfieldname" => $field->boxfieldname,
                            ":themeboxid" => $boxInfo2[0]['id'],
                            ":boxfieldindex" => $field->boxfieldindex,
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


                    foreach($data->fields as $field) {

                        $q3 = "INSERT INTO boxfields (boxfieldname, themeboxid, boxfieldindex, fieldsource) VALUES (:boxfieldname, :themeboxid, :boxfieldindex, :fieldsource)";
                        $query = $db->prepare($q3);

                        $execute = $query->execute(array(
                            ":boxfieldname" => $field->boxfieldname,
                            ":themeboxid" => $boxInfo2[0]['id'],
                            ":boxfieldindex" => $field->boxfieldindex,
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