<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    include("../config.php");

    $blResp = false;

    $strMessage = "";

    //$q = intval($_REQUEST['strUser']);
    
    //$login = htmlspecialchars(trim($_REQUEST['usuario']));
    //$pass1 = sha1(md5(trim($_REQUEST['contrasena'])));
    
    //variable donde traigo la identificacion
    //$identificacion = htmlspecialchars(trim($_REQUEST['identificacion']));
    
    
    $con = mysqli_connect($datos[0],$datos[1],$datos[2],$datos[3]);
    $blResp = true;
    
    if (!$con) {
        $blResp = false;
        die('Could not connect: ' . mysqli_error($con));
        $strMesage = "No fue posible conectarse: ".mysqli_error($con);
    }

    mysqli_select_db($con,"ajax_demo");

$sql="select p.rut, p.id_plaza, p.id_proveedor, p.nombre, pl.nombre nom_plaza, p.estado estado_prov from proveedor p, plaza pl  where pl.id_plaza = p.id_plaza order by p.nombre";
//$sql="select p.id_proveedor, p.nombre from proveedor p order by p.nombre";
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