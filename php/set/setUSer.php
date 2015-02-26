<?php
include("../config.php");


    $blResp = false;

    $strMessage = "";

$nombre = htmlspecialchars(trim($_REQUEST['nombre']));
$apell = htmlspecialchars(trim($_REQUEST['apellido']));
$login = htmlspecialchars(trim($_REQUEST['usuario']));
$pass1 = trim($_REQUEST['contrasena']);
$pass2 = trim($_REQUEST['contrasena']);
$email = htmlspecialchars(trim($_REQUEST['email']));

$telefono = htmlspecialchars(trim($_REQUEST['telefono']));




$link = mysqli_connect($datos[0],$datos[1],$datos[2],$datos[3]);
$blResp = true;

if (!$link) {
        $blResp = false;
        die('Could not connect: ' . mysqli_error($link));
        $strMesage = "No fue posible conectarse: ".mysqli_error($link);
    }

mysqli_select_db($link,"friender");
$query = sprintf("SELECT login FROM usuarios WHERE usuarios.login='$login'");
$result = mysqli_query($link,$query);
if(mysqli_num_rows($result)){
    $strMessage = "Usuario ya existe por favor intentalo de nuevo!!";
} else {
mysqli_free_result($result);
if($pass1 != $pass2){
$strMessage = "los password deben considir por favor ingresalos de nuevo!!";
} else {
    
    
$pass1 = sha1(md5($pass1));
$query = sprintf("INSERT INTO usuarios (nombre, apellidos, login, password, email, cumpleanos, telefono, genero, pais, region) VALUES ('$nombre','$apell','$login','$pass1','$email','$cumple','$telefono','$genero','$pais','$region')");

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