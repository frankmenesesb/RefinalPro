

$(function () {


    $(".submit_button").click(function () {





        var strLog = $("#recibirVariable").val();



        //var strGen = $("#radioGenero").val();
        //var strGen = $('input:radio[name=radioGenero]:checked').val();


        var dataString = {'usuario': strLog};
        if (strLog === '') {

            alert("No has iniciado sesion correctamente :)..");


        } else
        {
//esta es una prueba
            $.ajax({
                type: "POST",
                //url: "http://refinal.frienderco.com/php/set/setUser.php",
                url: "../php/set/setReciboEnc.php",
                data: dataString,
                dataType: 'json',
                cache: true,
                success: function (jsonResp, html) {


                    if (jsonResp.RESPONSE) {

                        alert(jsonResp.MESSAGE);

                        for (x = 1; x < 17; x++) {

                            if ($("#" + x).val() !== null) {

                                detallado(x, $("#" + x).val());
                            }
                        }


                        var html = "Se guardo Correctamente!";

                        $("#txtRespuesta").html(html);
                        $("#txtRespuesta").focus();



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
        }
        return false;
    });
});