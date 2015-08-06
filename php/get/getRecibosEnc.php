<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
include("../config.php");

$blResp = false;

$strMessage = "";

$idRecibo = intval($_REQUEST['idRecibo']);
$usuario = ($_REQUEST['usuario']);
$plaza = ($_REQUEST['nom_plaza']);
$proveedor = ($_REQUEST['nom_prov']);

$con = mysqli_connect($datos[0], $datos[1], $datos[2], $datos[3]);
$blResp = true;

if (!$con) {
    $blResp = false;
    die('Could not connect: ' . mysqli_error($con));
    $strMesage = "No fue posible conectarse: " . mysqli_error($con);
}

mysqli_select_db($con, "ajax_demo");



if ($idRecibo >= 1) {
    
    $sql = "select re.id_rec_enc,
CONCAT(u.nombre,' ',u.apellido) as nombre_usuario,
case re.estado when 'G' then 'Generado' when 'A' then 'Anulado' when 'E' then 'Entregado' end as estado,
DATE_FORMAT(fecha,'%d %b %y') as fecha, 
DATE_FORMAT(hora, '%H:%i:%s') as hora,
p.nombre as nom_plaza,
pr.nombre as nom_proveedor,
re.id_placa
from rec_enc re, usuario u, plaza p, proveedor pr
where re.id_rec_enc = $idRecibo
adn u.id_usuario = re.id_usuario
and pr.id_proveedor=re.id_proveedor
and p.id_plaza = pr.id_plaza";
} else if ($usuario != null or $plaza != null or $proveedor != null) {
    
    if ($usuario == null){
        $usuario='';
    }
    if ($plaza == null){
        $plaza='';
    }
    if ($proveedor == null){
        $proveedor='';
    }
    
    
    
    $sql = "SELECT re.id_rec_enc, CONCAT( u.nombre,  ' ', u.apellido ) AS nombre_usuario, 
CASE re.estado
WHEN  'G' THEN  'Generado'
WHEN  'A' THEN  'Anulado'
WHEN  'E' THEN  'Entregado'
END AS estado, 
DATE_FORMAT( fecha,  '%d %b %y' ) AS fecha, 
DATE_FORMAT( hora,  '%H:%i:%s' ) AS hora, 
p.nombre AS nom_plaza, 
pr.nombre AS nom_proveedor, 
re.id_placa
FROM rec_enc re, usuario u, plaza p, proveedor pr
WHERE u.nombre like '%$usuario%'
AND re.id_usuario = u.id_usuario
AND p.nombre like '%$plaza%'
AND pr.id_plaza = p.id_plaza
AND pr.nombre like '%$proveedor%'
AND re.id_proveedor = pr.id_proveedor";
} else {
    
    $sql = "select re.id_rec_enc,
CONCAT(u.nombre,' ',u.apellido) as nombre_usuario,
case re.estado when 'G' then 'Generado' when 'A' then 'Anulado' when 'E' then 'Entregado' end as estado,
DATE_FORMAT(fecha,'%d %b %y') as fecha, 
DATE_FORMAT(hora, '%H:%i:%s') as hora,
p.nombre as nom_plaza,
pr.nombre as nom_proveedor,
re.id_placa
from rec_enc re, usuario u, plaza p, proveedor pr
where u.id_usuario = re.id_usuario
and pr.id_proveedor=re.id_proveedor
and p.id_plaza = pr.id_plaza";
}


//$sql="SELECT id, nombre, apellidos, login, foto FROM usuarios WHERE login= '$login' and password='$pass1'";
$result = mysqli_query($con, $sql);

$arrayData = array();

while ($row = mysqli_fetch_assoc($result)) {
    array_push($arrayData, $row);
}

if (count($arrayData) === 0 || count($arrayData) === null || count($arrayData) === '') {
    $strMessage = "EMPTY";
}



mysqli_close($con);

$arrayResp = array(
    'RESPONSE' => $blResp,
    'MESSAGE' => $strMessage,
    'DATA' => $arrayData
);

echo json_encode($arrayResp);
?>