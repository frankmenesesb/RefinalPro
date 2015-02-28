

function detallado (articulo, cantidad) {




    
        var strArt = articulo;
        var strCan = cantidad;
        


        //var strGen = $("#radioGenero").val();
        //var strGen = $('input:radio[name=radioGenero]:checked').val();


        var dataString = {'articulo': strArt,'cantidad': strCan };
        
//esta es una prueba
            $.ajax({
                type: "POST",
                url: "http://refinal.frienderco.com/php/set/setReciboDet.php",
                //url: "../php/set/setReciboDet.php",
                data: dataString,
                dataType: 'json',
                cache: true,
                success: function (jsonResp, html) {


                    if (jsonResp.RESPONSE) {

                        //alert(jsonResp.MESSAGE);

                       


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
    };