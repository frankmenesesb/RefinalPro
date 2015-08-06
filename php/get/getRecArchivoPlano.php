<?php
// Activando Cors

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


include("../config.php");


$strMessage = "";

$arrayRecibos = $_REQUEST['arrayRecibos'];
$arrayData = array();

for ($i = 0; $i < count($arrayRecibos); $i++) {

    $idRecibo = $arrayRecibos[$i][0];
    $con = mysqli_connect($datos[0], $datos[1], $datos[2], $datos[3]);
    $blResp = true;


    if (!$con) {
        $blResp = false;
        die('Could not connect: ' . mysqli_error($con));
        $strMesage = "No fue posible conectarse: " . mysqli_error($con);
    }

    mysqli_select_db($con, "ajax_demo");

    $sql = "select  IFNULL((select rd.cantidad from rec_det rd where rd.id_rec_enc = $idRecibo and rd.id_art = a.id_art),0) as cantidad, a.descripcion
from articulos a 
order by a.id_art;";

    $result = mysqli_query($con, $sql);

    $arrayDataAux = array();

    while ($row = mysqli_fetch_assoc($result)) {
        array_push($arrayDataAux, $row);
    }

    array_push($arrayData, array($arrayRecibos[$i], $arrayDataAux));
}
$encPrincipal = "csc,fecha,hora,usuario,plaza,proveedor,placa";
$arrayText = "";
//$arrayText .= $encPrincipal;
//$arrayText .= "\n";

for ($j = 0; $j < count($arrayData); $j++) {

    $encAux = "";

    $encAux = implode(",", $arrayData[$j][0]);

    $detAux = "";

    for ($k = 0; $k < count($arrayData[$j][1]); $k++) {

        if ($j == 0) {
            $encPrincipal.="," . $arrayData[$j][1][$k]["descripcion"];
            //$arrayText .= $encPrincipal;
            //$arrayText .= "\n";
        }

        //$detAux .= "," . $arrayData[$j][1][$k]["nombreArticulo"] . "," . $arrayData[$j][1][$k]["cantidad"];
        $detAux .= "," . $arrayData[$j][1][$k]["cantidad"];
    }

    if ($j == 0) {
            //$encPrincipal.="," . $arrayData[$j][1][$k]["descripcion"];
            $arrayText .= $encPrincipal;
            $arrayText .= "\n";
        }

    $arrayText .= $encAux . $detAux;
    $arrayText .= "\n";
}

if (count($arrayData) === 0 || count($arrayData) === null || count($arrayData) === '') {
    $strMessage = "EMPTY";
}



mysqli_close($con);

$arrayResp = array(
    'RESPONSE' => $blResp,
    'MESSAGE' => $arrayData,
    'DATA' => $arrayText
);

echo json_encode($arrayResp);

//echo $_REQUEST['arrayRecibos'];
?>