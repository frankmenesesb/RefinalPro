<?php


// Activando Cors

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


include("../config.php");



    $blResp = false;

    $strMessage = "";

$nombre = htmlspecialchars(trim($_REQUEST['nombre']));
$observacion = htmlspecialchars(trim($_REQUEST['observacion']));
$identificacion = htmlspecialchars(trim($_REQUEST['identificacion']));
$imagen = htmlspecialchars(trim($_REQUEST['imagen']));
$padre = htmlspecialchars(trim($_REQUEST['padre']));




$link = mysqli_connect($datos[0],$datos[1],$datos[2],$datos[3]);
$blResp = true;

if (!$link) {
        $blResp = false;
        die('Could not connect: ' . mysqli_error($link));
        $strMesage = "No fue posible conectarse: ".mysqli_error($link);
    }

mysqli_select_db($link,"refinal");
$query = sprintf("SELECT id_art FROM articulos WHERE id_art=$identificacion");
$result = mysqli_query($link,$query);
if(mysqli_num_rows($result)){
    $strMessage = "Articulo ya existe por favor intentalo de nuevo!!";
} else {

$query = sprintf("INSERT INTO articulos (id_art, descripcion, observacion, imagen, padre, tipo) VALUES ($identificacion,'$nombre','$observacion','$imagen','$padre','H')");

$result = mysqli_query($link,$query);


$arrayData = array();


if(mysqli_affected_rows($link)){
 $strMessage = "El Articulo ha sido guardado con exito";

   
} else {
 $strMessage = "EMPTY";
}






}


mysqli_close($link);

$arrayResp = array(
    'RESPONSE'  => $blResp,
    'MESSAGE'   => $strMessage
    //'DATA'      => $arrayData
);

echo json_encode($arrayResp);