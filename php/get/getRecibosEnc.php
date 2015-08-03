<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    include("../config.php");

    $blResp = false;

    $strMessage = "";

    $idRecibo = intval($_REQUEST['idRecibo']);   
        
    $con = mysqli_connect($datos[0],$datos[1],$datos[2],$datos[3]);
    $blResp = true;
    
    if (!$con) {
        $blResp = false;
        die('Could not connect: ' . mysqli_error($con));
        $strMesage = "No fue posible conectarse: ".mysqli_error($con);
    }

    mysqli_select_db($con,"ajax_demo");

if($idRecibo !== 0){
	$sql="select id_rec_enc, id_usuario, estado, DATE_FORMAT(fecha,'%d %b %y') as fecha, hora from rec_enc where id_rec_enc = $idRecibo";
}else{
	$sql="select id_rec_enc, (select CONCAT(nombre, ' ', apellido) from usuario where usuario.id_usuario = rec_enc.id_usuario) as nombre_usuario, case estado when 'G' then 'Generado' when 'A' then 'Anulado' when 'E' then 'Entregado' end as estado, DATE_FORMAT(fecha,'%d %b %y') as fecha, hora from rec_enc";
}


//$sql="SELECT id, nombre, apellidos, login, foto FROM usuarios WHERE login= '$login' and password='$pass1'";
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