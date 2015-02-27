<?php


// Activando Cors

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


include("../config.php");




    $blResp = false;

    $strMessage = "";

$nombre = htmlspecialchars(trim($_REQUEST['nombre']));
$apell = htmlspecialchars(trim($_REQUEST['apellido']));
$login = htmlspecialchars(trim($_REQUEST['usuario']));
$pass1 = trim($_REQUEST['contrasena']);
$pass2 = trim($_REQUEST['contrasena']);
$email = htmlspecialchars(trim($_REQUEST['email']));
$tipo = htmlspecialchars(trim($_REQUEST['tipo']));
$telefono = htmlspecialchars(trim($_REQUEST['telefono']));
$identificacion = htmlspecialchars(trim($_REQUEST['identificacion']));




$link = mysqli_connect($datos[0],$datos[1],$datos[2],$datos[3]);
$blResp = true;

if (!$link) {
        $blResp = false;
        die('Could not connect: ' . mysqli_error($link));
        $strMesage = "No fue posible conectarse: ".mysqli_error($link);
    }

mysqli_select_db($link,"refinal");
$query = sprintf("SELECT usuario FROM usuario WHERE usuario='$login'");
$result = mysqli_query($link,$query);
if(mysqli_num_rows($result)){
    $strMessage = "Usuario ya existe por favor intentalo de nuevo!!";
} else {
mysqli_free_result($result);
if($pass1 != $pass2){
$strMessage = "los password deben considir por favor ingresalos de nuevo!!";
} else {
    
    
$pass1 = sha1(md5($pass1));
$query = sprintf("INSERT INTO usuario (nombre, apellido, usuario, password, email, telefono, tipo, identificacion) VALUES ('$nombre','$apell','$login','$pass1','$email','$telefono','$tipo','$identificacion')");

$result = mysqli_query($link,$query);


$arrayData = array();


if(mysqli_affected_rows($link)){
 $strMessage = "El usuario ha sido guardado con exito!!";

   
} else {
 $strMessage = "EMPTY";
}






}
}

mysqli_close($link);

$arrayResp = array(
    'RESPONSE'  => $blResp,
    'MESSAGE'   => $strMessage
    //'DATA'      => $arrayData
);

echo json_encode($arrayResp);
?>