<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


include("../config.php");

    $blResp = false;

    $strMessage = "";

$idRecibo = $_REQUEST['idRecibo'];
$estado = $_REQUEST['estado'];



$link = mysqli_connect($datos[0],$datos[1],$datos[2],$datos[3]);
$blResp = true;
$blRespUpd = true;

if (!$link) {
        $blResp = false;
        die('Could not connect: ' . mysqli_error($link));
        $strMesage = "No fue posible conectarse: ".mysqli_error($link);
    }

mysqli_select_db($link,"refinal");



		$query = sprintf("UPDATE rec_enc SET estado = $estado WHERE id_rec_enc=$idRecibo ");
			
		
		$result = mysqli_query($link,$query);
		
		
		if(mysqli_affected_rows($link)){
		 $strMessage = "Datos actualizados con exito!!";
		
		   
		} else {
		 $strMessage = "EMPTY";
		$blRespUpd  = false;
		}

	





mysqli_close($link);

if($blRespUpd === false){
	$strMessage = "Algo salio mal :C";
	$blResp = false;
}

$arrayResp = array(
    'RESPONSE'  => $blResp,
    'MESSAGE'   => $strMessage,
    'DATA'      => $arrayPendientes
);

echo json_encode($arrayResp);

//echo $_REQUEST['arrayPendientes'];

?>