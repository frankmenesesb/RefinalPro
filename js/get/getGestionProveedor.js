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

    
    setSelectProveedores();
    


    $("#btnAddArticulo").on("click", function () {
        setArticulosInterveentor();
        
    });

    $('#selProveedores').on('change', function () {
        getArticulosProveedor();
        
    });
    
    /*$('#btnNewProveedor').on('change', function () {
        alert("x");
       $('#dialogAddProveedor').modal('show');
    });*/
    
    // 
});


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

                    var options = "";

                    for (var i = 0; i < jsonResp.DATA.length; i++) {
                        var id = jsonResp.DATA[i]["id_art"];
                        var descripcion = jsonResp.DATA[i]["descripcion"];

                        options += '<option value="' + id + '">' + descripcion + '</option>';
                    }

                    $('#selArticulos').html(options);

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

function setArticulosInterveentor() {

    var idProveedor = $("#selProveedores").val();
    var idArticulo = $("#selArticulos").val();

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
                getArticulosProveedor();

            } else {
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


function getArticulosProveedor() {

    var idProveedor = $("#selProveedores").val();
    var dataParams = {'idProveedor': idProveedor};
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
                        html += '<td style="width: 20%;">';
                        html += '' + id_art + '';
                        html += '</td>';
                        html += '<td>';
                        html += '' + descripcion + '';
                        html += '</td>';
                        html += '<td>';
                        //html += '<img src="../images/'+ imagen +'.png" alt="Smiley face" height="32" width="31" title="Generado">';
                        html +='<img src="../images/'+imagen+'" alt="">';
                        html += '</td>';
                        html += '<td>';
                        //html += '<a id="btnRemoveArticulo_"'+i+'><span style="background-position: center bottom; width:60px; background-size:40px; height: 50px; background-image: url(\'../images/btn-plus.png\'); display:block; background-repeat: no-repeat;" title="Agregar articulo"></span></a>';
                        html += "<a id='btnRemoveArticulo_" + i + "' onclick='removeArticuloProveedor(" + idProveedor + ","+id_art+");'><span style='background-size: 35px; height: 50px; background-image: url(\"../images/icon inactivo.png\"); display:block; background-repeat: no-repeat;' ></span></a>";
                        //html += "<a class='boton-eliminar' id='btnRemoveArticulo_" + i + "' onclick='removeArticuloProveedor(" + idProveedor + ","+id_art+");' ></a>";
                        
                        html += '</td>';
                        html += '</tr>';
                        //articulos.add(id);

                    }
                    setSelectArticulos(idProveedor);
                    $("#listArticulos tbody").html(html);
                    


                } else if (jsonResp.MESSAGE === "EMPTY") {
                    //alert("Error: no se encontro datos de registro del usuario!!");
                    html += '<td colspan="3"  align="center"><h2>No se han asignado articulos</h2></td>';

                    $("#listArticulos tbody").html(html);
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

function removeArticuloProveedor(idProveedor,id_articulo){
    //alert(idProveedor+","+id_articulo);
    
    var dataParams = {'idProveedor': idProveedor, 'idArticulo': id_articulo, 'opcion':"DEL"};


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
                getArticulosProveedor();

            } else {
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

function saveAddProveedor(){
    
    
    var identificacion = $("#txtIdentificacionProveedor").val();
    var nombre = $("#txtNombreProveedor").val();
    var observacion = $("#txtObservacionProveedor").val();
    
    var dataParams = {'identificacion': identificacion, 'nombre': nombre, 'observacion':observacion};


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
                setSelectArticulos();
                setSelectProveedores();
                getArticulosProveedor();
                $('#dialogAddProveedor').modal('hide');
                $("#txtIdentificacionProveedor").val("");
                $("#txtNombreProveedor").val("");
                $("#txtObservacionProveedor").val("");

            } else {
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