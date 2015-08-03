<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    include("../config.php");

    $blResp = false;

    $strMessage = "";

    $idUsuario = intval($_REQUEST['idUsuario']);
        
    $con = mysqli_connect($datos[0],$datos[1],$datos[2],$datos[3]);
    $blResp = true;
    
    if (!$con) {
        $blResp = false;
        die('Could not connect: ' . mysqli_error($con));
        $strMesage = "No fue posible conectarse: ".mysqli_error($con);
    }

    mysqli_select_db($con,"ajax_demo");

if($idUsuario !== 0){
	$sql="select id_usuario, identificacion, nombre, apellido, case tipo when 'R' then 'Recolector' when 'A' then 'Administrador' when 'S' then 'Oficina' end as tipo from usuario where id_usuario = $idUsuario";
}else{
	$sql="select id_usuario, identificacion, nombre, apellido, case tipo when 'R' then 'Recolector' when 'A' then 'Administrador' when 'S' then 'Oficina' end as tipo from usuario";
}

$result = mysqli_query($con,$sql);

$arrayData = array();

while($row = mysqli_fetch_assoc($result)) {
    array_push($arrayData,$row);
    
    
}

if(count($arrayData) === 0 || count($arrayData) === null || count($arrayData) === ''){
    $strMessage = "EMPTY";
}



mysqli_close($con);

$arrayResp = array(
    'RESPONSE'  => $blResp,
    'MESSAGE'   => $strMessage,
    'DATA'      => $arrayData
);

echo json_encode($arrayResp);

?>