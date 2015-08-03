

function detallado(articulo, cantidad) {

    var strArt = articulo;
    var strCan = cantidad;
    var dataString = {'articulo': strArt, 'cantidad': strCan};

//esta es una prueba
    $.ajax({
        type: "POST",
        url: "http://refinalapp.fluxusmedia.co/php/set/setReciboDet.php",
        //url: "../php/set/setReciboDet.php",
        data: dataString,
        dataType: 'json',
        cache: true,
        success: function (jsonResp, html) {

            if (jsonResp.RESPONSE) {

                var html = "Se guardo Correctamente el datallado!";


                if (jsonResp.MESSAGE === "") {

                    alert('XD');

                } else if (jsonResp.MESSAGE === "EMPTY") {
                    alert("No se encontraron datos");
                }
            } else {
                alert("Ocurrio Un error:" + jsonResp.MESSAGE);
            }

        }
        ,
        error: function (jsonResp) {
            alert("Ocurrio Un error Diferente");
        }
    });

    return false;
}
;