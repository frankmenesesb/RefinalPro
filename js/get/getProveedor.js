/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var articulos = new Array();

$(function () {
    //$(".find_button").click(function () {


    //variables de entrada
    //var strIde = $("#txtIdentificacion").val();

    //variables locales

    var id;
    var descripcion;
    var html;

    //var dataString = {'identificacion': strIde};


    $.ajax({
        type: 'POST',
        //data: dataString,
        dataType: 'json',
        url: "http://refinal.frienderco.com/php/get/getProveedor.php",
        //url: "../php/get/getArticulos.php",
        success: function (jsonResp) {

            if (jsonResp.RESPONSE) {


                if (jsonResp.MESSAGE === "undefined" || jsonResp.MESSAGE === undefined) {

                    alert('Error no hay articulos!!');
                }
                if (jsonResp.MESSAGE === "") {

                    for (var i = 0; i < jsonResp.DATA.length; i++) {

                        id = jsonResp.DATA[i]["id_proveedor"];
                        descripcion = jsonResp.DATA[i]["nombre"];

                        var log = "";
                        if ((descripcion === null || descripcion === "") || (id === null || id === "")) {

                            alert("Error: articulos con errores o sin existencia ");

                        } else {



                            html += '<option value="'+id+'">'+descripcion+'</option>';
                            
                            //articulos.add(id);






                        }
                    }
                    $("#txtProveedor").html(html);
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

