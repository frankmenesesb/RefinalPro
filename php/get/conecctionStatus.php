<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


	include("../config.php");
$mysqli = mysqli_connect($datos[0],$datos[1],$datos[2],$datos[3]);

/* comprobar la conexion */

$blResp = true;
$message = "";
	
			
if (mysqli_connect_errno()) {

	$blResp = false;
	$message = "Fallo la conexion: %s\n". mysqli_connect_error();
	exit();
	
}else{

	$message = "Estado del sistema: %s\n". $mysqli->stat();

}


$arrayResp = array(
	'RESPONSE'  => $blResp,
	'MESSAGE'   => $message
);

echo json_encode($arrayResp);

$mysqli->close();
?>