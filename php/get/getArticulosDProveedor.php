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
    $nit = htmlspecialchars(trim($_REQUEST['nit']));
    
    
    $con = mysqli_connect($datos[0],$datos[1],$datos[2],$datos[3]);
    $blResp = true;
    
    if (!$con) {
        $blResp = false;
        die('Could not connect: ' . mysqli_error($con));
        $strMesage = "No fue posible conectarse: ".mysqli_error($con);
    }

    mysqli_select_db($con,"ajax_demo");

$sql="select a.id_art, a.descripcion, a.imagen from articulos a
        where a.id_art not in (select ap.id_art from art_prov ap where ap.id_proveedor = $nit)
      order by a.id_art";
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