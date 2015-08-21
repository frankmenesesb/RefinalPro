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
$fechaIni = date($_REQUEST['fec_ini']);
$fechaFin = date($_REQUEST['fec_fin']);
$placa = ($_REQUEST['placa']);
$estado = ($_REQUEST['estado']);

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
} else if ($usuario != null or $plaza != null or $proveedor != null or $placa != null or $estado != null) {
    
    if ($usuario == null){
        $usuario='';
    }
    if ($plaza == null){
        $plaza='';
    }
    if ($proveedor == null){
        $proveedor='';
    }
    
    if ($placa == null){
        $placa='';
    }
    
    if ($estado == null){
        $estado='';
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
AND re.estado like '%$estado%'
AND re.placa like '%$placa%'
AND re.id_proveedor = pr.id_proveedor"
            . " order by re.id_rec_enc desc";
}else if ($fechaIni != null or $fechaFin != null ) {
    
    if ($usuario == null){
        $usuario='';
    }
    if ($plaza == null){
        $plaza='';
    }
    if ($proveedor == null){
        $proveedor='';
    }
    
    if($fechaIni == null){
        $fechaIni=$fechaFin;
    }
    
    if($fechaFin == null){
        $fechaFin=$fechaIni;
    }
    
    if ($placa == null){
        $placa='';
    }
    
    if ($estado == null){
        $estado='';
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
AND re.estado like '%$estado%'
AND re.placa like '%$placa%'
AND re.id_proveedor = pr.id_proveedor"
            . "AND cast(re.fecha as char)  >= '%$fechaIni%' "
            . "AND cast(re.fecha as char) <= '%$fechaFin%'"
            . " order by re.id_rec_enc desc";
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
and p.id_plaza = pr.id_plaza order by re.id_rec_enc desc";
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