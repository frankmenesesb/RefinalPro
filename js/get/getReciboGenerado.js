/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




window.onload = function()
{
var recibiendoVariable = location.search.slice( location.search.indexOf("=") + 1,location.search.indexOf("$"));
var recibo = location.search.slice( location.search.indexOf("$") + 1,location.search.indexOf("*"));



//document.getElementById("recibirVariable").innerHTML = recibiendoVariable;


$("#recibirVariable").val(recibiendoVariable);
$("#reciboNo").val(recibo);


};

$(function () {
    //$(".find_button").click(function () {


    //variables de entrada
    //var strIde = $("#txtIdentificacion").val();

    //variables locales
    var cantidad;
    var id;
    var descripcion;
    var html;
    var strLog = $("#recibirVariable").val();
    var strRec = $("#reciboNo").val();

    var dataString = {'recibo': strRec};


    $.ajax({
        type: 'POST',
        data: dataString,
        dataType: 'json',
        url: "http://refinal.frienderco.com/php/get/getArticulos.php",
        //url: "../php/get/getArticulos.php",
        success: function (jsonResp) {

            if (jsonResp.RESPONSE) {


                if (jsonResp.MESSAGE === "undefined" || jsonResp.MESSAGE === undefined) {

                    alert('Error no hay articulos!!');
                }
                if (jsonResp.MESSAGE === "") {



                    for (var i = 0; i < jsonResp.DATA.length; i++) {




                        //id = jsonResp.DATA[i]["id_art"];
                        descripcion = jsonResp.DATA[i]["descripcion"];
                        cantidad = jsonResp.DATA[i]["cantidad"];



                        var log = "";
                        if ((descripcion === null || descripcion === "") || (cantidad === null || cantidad === "")) {

                            alert("Error: articulos con errores o sin existencia ");

                        } else {



                            html += '<tr>';
                            html += '<td>';
                            html += ''+descripcion+''
                            html += '</td>';
                            html += '<td>';
                            html += '<input type="number" class="form-control" value="'+cantidad+'" "/>';
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
                    alert("Error: no se encontro datos de articulos!!");
                }
            } else {
                alert("Ocurrio Un error:" + jsonResp.MESSAGE);
            }


        },
        error: function (jsonResp) {
            alert("Ocurrio Un error");
        }
    });


    // });

});

