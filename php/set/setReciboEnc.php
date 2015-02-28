<?php


// Activando Cors

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


include("../config.php");




    $blResp = false;

    $strMessage = "";


$login = htmlspecialchars(trim($_REQUEST['usuario']));





$link = mysqli_connect($datos[0],$datos[1],$datos[2],$datos[3]);
$blResp = true;

if (!$link) {
        $blResp = false;
        die('Could not connect: ' . mysqli_error($link));
        $strMesage = "No fue posible conectarse: ".mysqli_error($link);
    }

mysqli_select_db($link,"refinal");
$query = sprintf("SELECT usuario FROM usuario WHERE id_usuario='$login'");
$result = mysqli_query($link,$query);
if(mysqli_num_rows($result)){
    
    
    
        

$query = sprintf("INSERT INTO rec_enc(observacion,id_usuario,estado,fecha,hora)
VALUES ('','$login','G',curdate(),curtime())");

$result = mysqli_query($link,$query);


$arrayData = array();


if(mysqli_affected_rows($link)){
 $strMessage = "El recibo ha sido guardado con exito!!";

   
} else {
 $strMessage = "EMPTY";
}




    
    
} else {
$strMessage = "El usuario que va ingresar el recibo no existe!";
}

mysqli_close($link);

$arrayResp = array(
    'RESPONSE'  => $blResp,
    'MESSAGE'   => $strMessage
    //'DATA'      => $arrayData
);

echo json_encode($arrayResp);
?>