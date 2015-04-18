

$(function () {


    $(".submit_button").click(function () {





        var strLog = $("#recibirVariable").val();
        var strProveedor = $("#txtProveedor").val();
        var y;
        var can_totales=0;



        //var strGen = $("#radioGenero").val();
        //var strGen = $('input:radio[name=radioGenero]:checked').val();


        var dataString = {'usuario': strLog, 'proveedor': strProveedor};
        
        
        for (x = 1; x < 17; x++) {

                            if ($("#" + x).val() !== null) {

                               can_totales+=Number($("#" + x).val());
                            }
                        }
                        
                        
        
        if (strLog === '') {

            alert("No has iniciado sesion correctamente :)..");


        } else if (can_totales === '' || can_totales === null || can_totales === 0 || can_totales === '0') {

            alert("No puedes guardar un recibo con todas las cantidades en 0 (cero).");


        } else
        {
//esta es una prueba
            $.ajax({
                type: "POST",
                url: "http://refinal.frienderco.com/php/set/setReciboEnc.php",
                //url: "../php/set/setReciboEnc.php",
                data: dataString,
                dataType: 'json',
                cache: true,
                success: function (jsonResp, html) {


                    if (jsonResp.RESPONSE) {

                        
                        alert(jsonResp.MESSAGE);   
                        location.href = '../frm/frmInicio.html?var='+strLog+'$';    
                        for (x = 1; x < 17; x++) {

                            if ($("#" + x).val() !== null) {

                                detallado(x, $("#" + x).val());
                                y=x;
                                
                            }
                        }

                        if(y===17){
                         
                        var html = "Se guardo Correctamente!";
                       
                                    
                                
                        $("#txtRespuesta").html(html);
                        $("#txtRespuesta").focus();
                        
                        //location.href = 'frmReciboConsulta.html?var='+strLog+'$'+;
                        

                        }

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



function mensaje() {
    var x;
    if (confirm("¿Esta correcta la informacion?") === true) {
        x = "You pressed OK!";
    } else {
        x = "You pressed Cancel!";
    }
    document.getElementById("demo").innerHTML = x;
}