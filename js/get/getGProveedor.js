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
                        rut =jsonResp.DATA[i]["rut"];
                        plaza = jsonResp.DATA[i]["nom_plaza"];

                        var log = "";
                        if ((descripcion === null || descripcion === "") || (id === null || id === "")) {

                            alert("Error: articulos con errores o sin existencia ");

                        } else {



                            html += '<tr id="row_' + i + '">';
                        html += '<td style="width: 10%;">';
                        html += '' + id + '';
                        html += '</td>';
                        html += '<td>';
                        html += '' + descripcion + '';
                        html += '</td>';
                        html += '<td>';
                        if(rut==='S'){
                            html +='<img src="../images/icon activo.png" alt="">';
                        }else{
                            html +='<img src="../images/icon inactivo.png" alt="">';
                        }
                        html += '</td>';
                        html += '<td>';
                        html += '' + plaza + '';
                        html += '</td>';
                        html += '<td>';
                        
                        html += '</td>';
                        html += '<td>';
                        
                        html += '</td>';
                        html += '</tr>';

                        }
                    }
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

};


function saveAddProveedor(){
    
    
    var identificacion = $("#txtIdentificacionProveedor").val();
    var nombre = $("#txtNombreProveedor").val();
    var observacion = $("#txtObservacionProveedor").val();
    var rut = $("#txtRutProveedor").val();
    var plaza = $("#txtPlazaProveedor").val();
    
    var dataParams = {'identificacion': identificacion, 'nombre': nombre, 'observacion':observacion, 'rut': rut, 'plaza': plaza};


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
                $("#txtRutProveedor").val();
                $("#txtPlazaProveedor").val();

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
