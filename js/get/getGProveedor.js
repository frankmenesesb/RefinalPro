/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready(function () {
    $('.filterable .btn-filter').click(function () {
        var $panel = $(this).parents('.filterable'),
                $filters = $panel.find('.filters input'),
                $tbody = $panel.find('.table tbody');
        if ($filters.prop('disabled') === true) {
            $filters.prop('disabled', false);
            $filters.first().focus();
        } else {
            $filters.val('').prop('disabled', true);
            $tbody.find('.no-result').remove();
            $tbody.find('tr').show();
        }
    });

    $('.filterable .filters input').keyup(function (e) {
        /* Ignore tab key */
        var code = e.keyCode || e.which;
        if (code === '9')
            return;
        /* Useful DOM data and selectors */
        var $input = $(this),
                inputContent = $input.val().toLowerCase(),
                $panel = $input.parents('.filterable'),
                column = $panel.find('.filters th').index($input.parents('th')),
                $table = $panel.find('.table'),
                $rows = $table.find('tbody tr');
        /* Dirtiest filter function ever ;) */
        var $filteredRows = $rows.filter(function () {
            var value = $(this).find('td').eq(column).text().toLowerCase();
            return value.indexOf(inputContent) === -1;
        });
        /* Clean previous no-result if exist */
        $table.find('tbody .no-result').remove();
        /* Show all rows, hide filtered ones (never do that outside of a demo ! xD) */
        $rows.show();
        $filteredRows.hide();
        /* Prepend no-result row if all rows are filtered */
        if ($filteredRows.length === $rows.length) {
            $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="' + $table.find('.filters th').length + '">No result found</td></tr>'));
        }
    });


    allProveedores();

//    setSelectProveedores();
//    
//
//
//    $("#btnAddArticulo").on("click", function () {
//        setArticulosInterveentor();
//        
//    });
//
//    $('#selProveedores').on('change', function () {
//        getArticulosProveedor();
//        
//    });

    /*$('#btnNewProveedor').on('change', function () {
     alert("x");
     $('#dialogAddProveedor').modal('show');
     });*/

    // 
});

function dialogItem(id) {


    getArticulosProveedor(id);
    $('#dialogAddArt').modal('show');

}

function allProveedores() {


    var id;
    var descripcion;
    var rut;
    var plaza;
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
                        rut = jsonResp.DATA[i]["rut"];
                        plaza = jsonResp.DATA[i]["nom_plaza"];

                        var log = "";
                        if ((descripcion === null || descripcion === "") || (id === null || id === "")) {

                            alert("Error: articulos con errores o sin existencia ");

                        } else {



                            html += '<tr id="row_' + i + '">';
                            html += '<td >';
                            html += '' + id + '';
                            html += '</td>';
                            html += '<td>';
                            html += '' + descripcion + '';
                            html += '</td>';
                            html += '<td>';
                            if (rut === 'S') {
                                html += '<img src="../images/icon activo.png" alt="">';
                            } else {
                                html += '<img src="../images/icon inactivo.png" alt="">';
                            }
                            html += '</td>';
                            html += '<td>';
                            html += '' + plaza + '';
                            html += '</td>';
                            html += '<td>';
                            //alert("<a id='btnUpdArt_"+i+"' class='btn boton-gestionar-item' onclick='dialogItem(\""+id+"\");'></a>");
                            html += "<a id='btnUpdArt_" + i + "' class='btn boton-gestionar-item' onclick='dialogItem(\"" + id + "\");'></a>";
                            html += '</td>';

                            html += '<td>';
                            html += "<a id='btnUpdArt_" + i + "' class='btn boton-editar' onclick=''></a>";
                            html += '</td>';
                            html += '</tr>';

                        }
                    }
                    setSelectPlaza();
                    $("#listProveedores tbody").html(html);
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

}
;


function saveAddProveedor() {


    var identificacion = $("#txtIdentificacionProveedor").val();
    var nombre = $("#txtNombreProveedor").val();
    var observacion = $("#txtObservacionProveedor").val();
    var rut = $("#txtRutProveedor").val();
    var plaza = $("#txtPlazaProveedor").val();

    var dataParams = {'identificacion': identificacion, 'nombre': nombre, 'observacion': observacion, 'rut': rut, 'plaza': plaza};

    if (identificacion === '') {

        alert("Ingresa el nit del proveedor..");
        $("#txtIdentificacionProveedor").focus();

    } else if (nombre === '') {

        alert("No has ingresado el nombre del proveedor..");
        $("#txtNombreProveedor").focus();

    } else if (rut === 'X') {

        alert("selecciona si tiene Rut el proveedor :)..");
        $("#txtRutProveedor").focus();

    } else if (plaza === 'N') {

        alert("Selecciona la plaza del proveedor :)..");
        $("#txtPlazaProveedor").focus();

    } else {

        $.ajax({
            type: "POST",
            url: "http://refinal.frienderco.com/php/set/setProveedor.php",
            //url: "../php/set/setReciboEnc.php",
            data: dataParams,
            dataType: 'json',
            cache: true,
            success: function (jsonResp, html) {

                if (jsonResp.RESPONSE) {
                    alert(jsonResp.MESSAGE);

                    $('#dialogAddProveedor').modal('hide');
                    $("#txtIdentificacionProveedor").val("");
                    $("#txtNombreProveedor").val("");
                    $("#txtObservacionProveedor").val("");
                    $("#txtRutProveedor").val();
                    $("#txtPlazaProveedor").val();


                    allProveedores();
                }


                else {
                    alert("Ocurrio Un error:" + jsonResp.MESSAGE);
                }

            }
            ,
            error: function (jsonResp) {
                //alert("Ocurrio Un error Diferente");
                alert("Falta hacer el update que cambie el estado a las facturas de pendientes a generadas");
            }
        });
    }
}


function setSelectPlaza() {
    var plaza = '%';
    var dataParams = {'idPlaza': plaza};
    var options = "";
    options += '<option value="N">Seleccione Plaza</option>';

    $.ajax({
        type: 'POST',
        data: dataParams,
        dataType: 'json',
        url: "http://refinal.frienderco.com/php/get/getPlazas.php",
        //url: "../php/get/getArticulos.php",
        success: function (jsonResp) {

            if (jsonResp.RESPONSE) {


                if (jsonResp.MESSAGE === "undefined" || jsonResp.MESSAGE === undefined) {

                    alert('Error no hay articulos!!');
                }
                if (jsonResp.MESSAGE === "") {



                    for (var i = 0; i < jsonResp.DATA.length; i++) {
                        var id = jsonResp.DATA[i]["id_plaza"];
                        var descripcion = jsonResp.DATA[i]["nombre"];

                        options += '<option value="' + id + '">' + descripcion + '</option>';
                    }

                    $('#txtPlazaProveedor').html(options);

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
}


function getArticulosProveedor(id) {



    //var idProveedor = $("#selProveedores").val();
    var idProveedor = id;
    var dataParams = {'idproveedor': idProveedor};
    var html = "";

    $.ajax({
        type: 'POST',
        data: dataParams,
        dataType: 'json',
        url: "http://refinal.frienderco.com/php/get/getArticulosProveedor.php",
        //url: "../php/get/getUser.php",
        success: function (jsonResp) {

            if (jsonResp.RESPONSE) {

                //alert(JSON.stringify(jsonResp));

                if (jsonResp.MESSAGE === "") {



                    for (var i = 0; i < jsonResp.DATA.length; i++) {

                        var id_art = jsonResp.DATA[i]["id_art"];
                        var descripcion = jsonResp.DATA[i]["descripcion"];
                        var imagen = jsonResp.DATA[i]["imagen"];


                        html += '<tr id="row_' + i + '">';
                        html += '<td style="width: 10%;">';
                        html += '' + id_art + '';
                        html += '</td>';
                        html += '<td style="width: 10%;">';
                        //html += '<img src="../images/'+ imagen +'.png" alt="Smiley face" height="32" width="31" title="Generado">';
                        html += '<img src="../images/' + imagen + '" alt="">';
                        html += '</td>';
                        html += '<td style="width: 30%;">';
                        html += '' + descripcion + '';
                        html += '</td>';

                        html += '<td style="width: 10%;">';
                        //html += '<a id="btnRemoveArticulo_"'+i+'><span style="background-position: center bottom; width:60px; background-size:40px; height: 50px; background-image: url(\'../images/btn-plus.png\'); display:block; background-repeat: no-repeat;" title="Agregar articulo"></span></a>';
                        html += "<a id='btnRemoveArticulo_" + i + "' onclick='removeArticuloProveedor(\"" + idProveedor + "\",\"" + id_art + "\");'><span style='background-size: 31px 32px; height: 32px; background-image: url(\"../images/btn-remover.png\"); display:block; background-repeat: no-repeat;' ></span></a>";
                        //html += "<a class='boton-eliminar' id='btnRemoveArticulo_" + i + "' onclick='removeArticuloProveedor(" + idProveedor + ","+id_art+");' ></a>";

                        html += '</td>';
                        html += '</tr>';
                        //articulos.add(id);

                    }


                    $("#tabla-a").html(html);



                } else if (jsonResp.MESSAGE === "EMPTY") {
                    //alert("Error: no se encontro datos de registro del usuario!!");
                    html += '<tr><td colspan="3"  align="center"><h2>No se han asignado articulos</h2></td></tr>';

                    $("#tabla-a").html(html);
                }
                setSelectArticulos(idProveedor);

            } else {
                alert("Ocurrio Un error:" + jsonResp.MESSAGE);
            }

        },
        error: function (jsonResp) {
            alert("Ocurrio Un error");
        }
    });

}


function removeArticuloProveedor(idProveedor, id_articulo) {

    var dataParams = {'idProveedor': idProveedor, 'idArticulo': id_articulo, 'opcion': "DEL"};

    $.ajax({
        type: "POST",
        url: "http://refinal.frienderco.com/php/set/setArticulosInterveentor.php",
        //url: "../php/set/setReciboEnc.php",
        data: dataParams,
        dataType: 'json',
        cache: true,
        success: function (jsonResp, html) {

            if (jsonResp.RESPONSE) {
                alert(jsonResp.MESSAGE);
                getArticulosProveedor(idProveedor);

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

function setArticulosInterveentor(id, art) {

    var idProveedor = id;
    var idArticulo = art;

    var dataParams = {'idProveedor': idProveedor, 'idArticulo': idArticulo};


    $.ajax({
        type: "POST",
        url: "http://refinal.frienderco.com/php/set/setArticulosInterveentor.php",
        //url: "../php/set/setReciboEnc.php",
        data: dataParams,
        dataType: 'json',
        cache: true,
        success: function (jsonResp, html) {

            if (jsonResp.RESPONSE) {
                alert(jsonResp.MESSAGE);
                getArticulosProveedor(id);

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


function setSelectProveedores() {


    $.ajax({
        type: 'POST',
        //data: dataString,
        dataType: 'json',
        url: "http://refinal.frienderco.com/php/get/getGestionProveedores.php",
        //url: "../php/get/getArticulos.php",
        success: function (jsonResp) {

            if (jsonResp.RESPONSE) {


                if (jsonResp.MESSAGE === "undefined" || jsonResp.MESSAGE === undefined) {

                    alert('Error no hay proveedores!!');
                }
                if (jsonResp.MESSAGE === "") {

                    var options = "";

                    for (var i = 0; i < jsonResp.DATA.length; i++) {
                        var id = jsonResp.DATA[i]["id_proveedor"];
                        var descripcion = jsonResp.DATA[i]["nombre"];

                        options += '<option value="' + id + '">' + descripcion + '</option>';
                    }

                    $('#selProveedores').html(options);
                    getArticulosProveedor();

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
}


function setSelectArticulos(id) {

    var idProveedor = id;
    var dataParams = {'nit': idProveedor};
    $.ajax({
        type: 'POST',
        data: dataParams,
        dataType: 'json',
        url: "http://refinal.frienderco.com/php/get/getArticulosDProveedor.php",
        //url: "../php/get/getArticulos.php",
        success: function (jsonResp) {

            if (jsonResp.RESPONSE) {


                if (jsonResp.MESSAGE === "undefined" || jsonResp.MESSAGE === undefined) {

                    alert('Error no hay articulos!!');
                }
                if (jsonResp.MESSAGE === "") {

                    var html = "";

                    for (var i = 0; i < jsonResp.DATA.length; i++) {
                        var id = jsonResp.DATA[i]["id_art"];
                        var descripcion = jsonResp.DATA[i]["descripcion"];
                        var imagen = jsonResp.DATA[i]["imagen"];
                        ;
                        html += '<tr id="row_' + i + '">';
                        html += '<td style="width: 5%;">';
                        html += '' + id + '';
                        html += '</td>';
                        html += '<td style="width: 5%;">';
                        //html += '<img src="../images/'+ imagen +'.png" alt="Smiley face" height="32" width="31" title="Generado">';
                        html += '<img src="../images/' + imagen + '" alt="">';
                        html += '</td>';
                        html += '<td style="width: 30%;">';
                        html += '' + descripcion + '';
                        html += '</td>';

                        html += '<td style="width: 5%;">';
                        //html += '<a id="btnRemoveArticulo_"'+i+'><span style="background-position: center bottom; width:60px; background-size:40px; height: 50px; background-image: url(\'../images/btn-plus.png\'); display:block; background-repeat: no-repeat;" title="Agregar articulo"></span></a>';
                        html += "<a id='btnAddArticulo_" + i + "' onclick='setArticulosInterveentor(" + idProveedor + "," + id + ");'><span style='background-size: 31px 32px; height: 32px; background-image: url(\"../images/btn-agregar.png\"); display:block; background-repeat: no-repeat;' ></span></a>";
                        //html += "<a class='boton-eliminar' id='btnRemoveArticulo_" + i + "' onclick='removeArticuloProveedor(" + idProveedor + ","+id_art+");' ></a>";

                        html += '</td>';
                        html += '</tr>';
                        //articulos.add(id);
                    }

                    $('#tabla-n').html(html);

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
}




