<?php

    include("../config_1.php");

    $blResp = false;

    $strMessage = "";

    $q = intval($_REQUEST['id']);
    
    //$login = htmlspecialchars(trim($_REQUEST['usuario']));
    //$pass1 = sha1(md5(trim($_REQUEST['contrasena'])));

    $con = mysqli_connect($datos[0],$datos[1],$datos[2],$datos[3]);
    $blResp = true;
    
    if (!$con) {
        $blResp = false;
        die('Could not connect: ' . mysqli_error($con));
        $strMesage = "No fue posible conectarse: ".mysqli_error($con);
        
    }

    mysqli_select_db($con,"pspprueba");

$sql="select r.descripcion, r.estado, r.idpreguntas 
from respuesta r, preguntas p 
where p.idpreguntas = ".$q." and r.idpreguntas = p.idpreguntas
group by r.descripcion";
//$sql="SELECT * from respuestas";
//echo ""+$sql;
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