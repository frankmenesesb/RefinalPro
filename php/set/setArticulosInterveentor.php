<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


include("../config.php");

    $blResp = false;

    $strMessage = "";

$idProveedor= $_REQUEST['idProveedor'];
$idArticulo = $_REQUEST['idArticulo'];
$opcion= $_REQUEST['opcion'];



$link = mysqli_connect($datos[0],$datos[1],$datos[2],$datos[3]);
$blResp = true;
$blRespUpd = true;

if (!$link) {
        $blResp = false;
        die('Could not connect: ' . mysqli_error($link));
        $strMesage = "No fue posible conectarse: ".mysqli_error($link);
    }

mysqli_select_db($link,"refinal");


		if($opcion == "DEL"){
			$query = sprintf("DELETE FROM art_prov
					  WHERE id_proveedor = $idProveedor AND id_art = '$idArticulo'");
		}else{
			$query = sprintf("INSERT INTO art_prov(id_proveedor, id_art)						
			VALUES ($idProveedor,'$idArticulo')");
		}
			
		
		$result = mysqli_query($link,$query);
		
		$data = mysqli_affected_rows($link);
		if(mysqli_affected_rows($link)>0){
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
    'RESPONSE'  => $result,
    'MESSAGE'   => $strMessage,
    'DATA'      => $data
);

echo json_encode($arrayResp);

//echo $_REQUEST['arrayPendientes'];

?>