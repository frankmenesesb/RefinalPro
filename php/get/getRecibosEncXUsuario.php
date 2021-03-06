<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    include("../config.php");

    $blResp = false;

    $strMessage = "";

    $usuario = intval($_REQUEST['usuario']);   
        
    $con = mysqli_connect($datos[0],$datos[1],$datos[2],$datos[3]);
    $blResp = true;
    
    if (!$con) {
        $blResp = false;
        die('Could not connect: ' . mysqli_error($con));
        $strMesage = "No fue posible conectarse: ".mysqli_error($con);
    }

    mysqli_select_db($con,"ajax_demo");


	$sql="select re.id_rec_enc,
CONCAT(u.nombre,' ',u.apellido) as nombre_usuario,
case re.estado when 'G' then 'Generado' when 'A' then 'Anulado' when 'E' then 'Entregado' end as estado,
DATE_FORMAT(fecha,'%d %b %y') as fecha, 
DATE_FORMAT(hora, '%H:%i:%s') as hora,
p.nombre as nom_plaza,
pr.nombre as nom_proveedor,
re.id_placa
from rec_enc re, usuario u, plaza p, proveedor pr
where re.id_usuario = '$usuario'
and u.id_usuario = re.id_usuario
and pr.id_proveedor=re.id_proveedor
and p.id_plaza = pr.id_plaza "
                . "and re.estado not in ('E')";



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