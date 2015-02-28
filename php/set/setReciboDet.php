<?php


// Activando Cors

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


include("../config.php");




    $blResp = false;

    $strMessage = "";

$articulo = htmlspecialchars(trim($_REQUEST['articulo']));
$cantidad = htmlspecialchars(trim($_REQUEST['cantidad']));





$link = mysqli_connect($datos[0],$datos[1],$datos[2],$datos[3]);
$blResp = true;

if (!$link) {
        $blResp = false;
        die('Could not connect: ' . mysqli_error($link));
        $strMesage = "No fue posible conectarse: ".mysqli_error($link);
    }

mysqli_select_db($link,"refinal");
//$query = sprintf("SELECT usuario FROM usuario WHERE usuario='$login'");
//$result = mysqli_query($link,$query);
//if(mysqli_num_rows($result)){
//    $strMessage = "Usuario ya existe por favor intentalo de nuevo!!";
//} else {
//mysqli_free_result($result);
//if($pass1 != $pass2){
//$strMessage = "los password deben considir por favor ingresalos de nuevo!!";
//} else {
    
    

$query = sprintf("INSERT INTO rec_det (id_art,id_rec_enc,cantidad)
VALUES ('$articulo',(select max(id_rec_enc) from rec_enc),'$cantidad')");

$result = mysqli_query($link,$query);


$arrayData = array();


if(mysqli_affected_rows($link)){
 $strMessage = "El recibo detallado ha sido guardado con exito!!";

   
} else {
 $strMessage = "EMPTY";
}






//}
//}

mysqli_close($link);

$arrayResp = array(
    'RESPONSE'  => $blResp,
    'MESSAGE'   => $strMessage
    //'DATA'      => $arrayData
);

echo json_encode($arrayResp);
?>