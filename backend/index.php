<?php

//
/*include_once("index.html");  */


/*Guarda el archivo con el nombre que yo quiero 


}*/
if(isset($_FILES['archivo'])) {
    $nombreArchivo ='upload/'.$_FILES['archivo']['name'];
    move_uploaded_file($_FILES['archivo']['tmp_name'],$nombreArchivo );
    return; 
}


if(isset($_POST['nombre'])){
    echo "ingreso correcto";

    return;
}



if(isset($_POST['email'])){
    echo "acceso permitidoewqweq";
    return;}

var_dump($_FILES); 


?>