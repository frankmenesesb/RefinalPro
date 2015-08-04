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




$link = mysqli_connect($datos[0], $datos[1], $datos[2], $datos[3]);
$blResp = true;

if (!$link) {
    $blResp = false;
    die('Could not connect: ' . mysqli_error($link));
    $strMesage = "No fue posible conectarse: " . mysqli_error($link);
}

mysqli_select_db($link, "refinal");
$query = sprintf("SELECT id_plaza FROM plaza WHERE id_plaza=$identificacion");
$result = mysqli_query($link, $query);
if (mysqli_num_rows($result)) {
    $strMessage = "Plaza ya existe por favor intentalo de nuevo!!";
} else {


    $pass1 = sha1(md5($pass1));
    $query = sprintf("INSERT INTO plaza (id_plaza,nombre,observacion) VALUES ($identificacion,'$nombre','$observacion')");

    $result = mysqli_query($link, $query);


    $arrayData = array();


    if (mysqli_affected_rows($link)) {
        $strMessage = "La plaza ha sido guardada con exito";
    } else {
        $strMessage = "EMPTY";
    }
}


mysqli_close($link);

$arrayResp = array(
    'RESPONSE' => $blResp,
    'MESSAGE' => $strMessage
        //'DATA'      => $arrayData
);

echo json_encode($arrayResp);
