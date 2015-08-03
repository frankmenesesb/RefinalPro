/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var articulos = new Array();

$(function () {
    //$(".find_button").click(function () {
var recibiendoVariable = location.search.slice( location.search.indexOf("=") + 1,location.search.indexOf("$"));



//document.getElementById("recibirVariable").innerHTML = recibiendoVariable;

    titleHeader = $(".panel-heading").find("h4").text();
    $("#recibirVariable").val(recibiendoVariable);

    //variables de entrada
    var strLog = $("#recibirVariable").val();

    //variables locales

    var can;
    var descripcion;
    var html;

    var dataString = {'usuario': strLog};


    $.ajax({
        type: 'POST',
        data: dataString,
        dataType: 'json',
        url: "http://refinalapp.fluxusmedia.co/php/get/getArticulosResumen.php",
        //url: "../php/get/getArticulos.php",
        success: function (jsonResp) {

            if (jsonResp.RESPONSE) {


                if (jsonResp.MESSAGE === "undefined" || jsonResp.MESSAGE === undefined) {

                    alert('Error no hay articulos!!');
                }
                if (jsonResp.MESSAGE === "") {



                    for (var i = 0; i < jsonResp.DATA.length; i++) {



                    articulos.
                        can = jsonResp.DATA[i]["can_res"];
                        descripcion = jsonResp.DATA[i]["descripcion"];
                        

                        var log = "";
                        if ((descripcion === null || descripcion === "") || (can === null || can=== "")) {

                            //alert("Error: articulos con errores o sin existencia ");

                        } else {



                            html += '<tr>';
                            html += '<td>';
                            html += ''+descripcion+''
                            html += '</td>';
                            html += '<td>';
                            html += ''+can;
                            html += '</td>';
                            html += '<td>';
                            html += '<label>Kg.</label>';
                            html += '</td>';
                            html += '</tr>';
                            //articulos.add(id);
                           

                        }
                    }
                    $("#recibo").html(html);
                    //$("#txtHint").html(encabezado+html+final);

                } else if (jsonResp.MESSAGE === "EMPTY") {
                    //alert("Error: no se encontro datos de articulos!!");
                }
            } else {
                //alert("Ocurrio Un error:" + jsonResp.MESSAGE);
            }


        },
        error: function (jsonResp) {
            alert("Ocurrio Un error");
        }
    });


    // });

});

