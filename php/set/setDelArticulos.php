<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */





// Activando Cors

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


include("../config.php");




    $blResp = false;

    $strMessage = "";


$identificacion = htmlspecialchars(trim($_REQUEST['idArticulo']));




$link = mysqli_connect($datos[0],$datos[1],$datos[2],$datos[3]);
$blResp = true;

if (!$link) {
        $blResp = false;
        die('Could not connect: ' . mysqli_error($link));
        $strMesage = "No fue posible conectarse: ".mysqli_error($link);
    }

mysqli_select_db($link,"refinal");

    
    

$query = "delete from articulos where id_art = '$identificacion' and tipo = 'H';";

$result = mysqli_query($link,$query);


$arrayData = array();


if(mysqli_affected_rows($link)){
 $strMessage = "El articulo ha sido borrado con exito";

   
} else {
 $strMessage = "EMPTY";
}







mysqli_close($link);

$arrayResp = array(
    'RESPONSE'  => $blResp,
    'MESSAGE'   => $strMessage
    //'DATA'      => $arrayData
);

echo json_encode($arrayResp);
