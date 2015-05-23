/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    $('.filterable .btn-filter').click(function(){
        var $panel = $(this).parents('.filterable'),
        $filters = $panel.find('.filters input'),
        $tbody = $panel.find('.table tbody');
        if ($filters.prop('disabled') == true) {
            $filters.prop('disabled', false);
            $filters.first().focus();
        } else {
            $filters.val('').prop('disabled', true);
            $tbody.find('.no-result').remove();
            $tbody.find('tr').show();
        }
    });

    $('.filterable .filters input').keyup(function(e){
        /* Ignore tab key */
        var code = e.keyCode || e.which;
        if (code == '9') return;
        /* Useful DOM data and selectors */
        var $input = $(this),
        inputContent = $input.val().toLowerCase(),
        $panel = $input.parents('.filterable'),
        column = $panel.find('.filters th').index($input.parents('th')),
        $table = $panel.find('.table'),
        $rows = $table.find('tbody tr');
        /* Dirtiest filter function ever ;) */
        var $filteredRows = $rows.filter(function(){
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
            $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="'+ $table.find('.filters th').length +'">No result found</td></tr>'));
        }
    });
    getAllPlazas();
          
});


function getAllPlazas(){
    
    var dataParams = {'idPlaza': "NULL"};

            $.ajax({
                type: 'POST',
                data: dataParams,
                dataType: 'json',                
                url: "http://refinal.frienderco.com/php/get/getPlazas.php",
                success: function (jsonResp) {
                    
                    if (jsonResp.RESPONSE) {
                        
                        //alert(JSON.stringify(jsonResp));

                        if (jsonResp.MESSAGE === "") {
                            
                            var html = "";
                            var nuPendientes = 0;
                            
                            for (var i = 0; i < jsonResp.DATA.length; i++) {

                                var id = jsonResp.DATA[i]["id_plaza"];
                                var nombre = jsonResp.DATA[i]["nombre"];
                                var observacion = jsonResp.DATA[i]["observacion"];
                                
                                var jsonParams = {
                                   'idPlaza': id,
                                   'indexRow': i
                               };


                                html += '<tr id="row_'+i+'">';
                                html += '<td>';
                                html += ''+id+'';
                                html += '</td>';
                                html += '<td>';
                                html += ''+nombre+''
                                html += '</td>';
                                html += '<td>';
                                html += ''+observacion+'';
                                html += '</td>';
                                html += '<td width="20%">';                                
                                html += "<a id='btnUpdPla_"+i+"' onclick='modalUpdPlaza("+JSON.stringify(jsonParams)+");'><span style='background-size: 80px; height: 28px; background-image: url(\"../images/btn-editar-0.png\"); display:block; background-repeat: no-repeat;' ></span></a></li>";
                                html += '</td>';
                                html += '<td>';
                                html += "<a id='btnRemovePlaza_" + i + "' onclick='removePlaza(" + id + ");'><span style='background-size: 35px; height: 50px; background-image: url(\"../images/icon inactivo.png\"); display:block; background-repeat: no-repeat;' ></span></a>";
                                html += '</td>';
                                html += '</tr>';

                            }
                            
                        $("#listPlazas tbody").html(html);                        
                        
                        
                        } else if (jsonResp.MESSAGE === "EMPTY") {
                            alert("Error: no se encontro datos de registro del usuario!!");
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

function modalUpdPlaza(jsonParams){    
        
    $.ajax({
        type: 'POST',
        data: jsonParams,
        dataType: 'json',
        url: "http://refinal.frienderco.com/php/get/getPlazas.php",
        success: function (jsonResp) {

            if (jsonResp.RESPONSE) {

                if (jsonResp.MESSAGE === "undefined" || jsonResp.MESSAGE === undefined) {

                    alert('Error!!');
                }
                if (jsonResp.MESSAGE === "") {

                    for (var i = 0; i < jsonResp.DATA.length; i++) {
                        //a.id_art, a.descripcion, a.observacion, a.imagen

                        var id = jsonResp.DATA[i]["id_plaza"];
                        var nombre = jsonResp.DATA[i]["nombre"];
                        var observacion = jsonResp.DATA[i]["observacion"];

                        $("#txtIdentificacionPlaza").val(id);
                        $("#txtNombrePlaza").val(nombre);
                        $("#txtObservacionPlaza").val(observacion);
                    }

                } else if (jsonResp.MESSAGE === "EMPTY") {
                    alert("Error: no se encontro datos de registro del usuario!!");
                }
            } else {
                alert("Ocurrio Un error:" + jsonResp.MESSAGE);
            }


        },
        error: function (jsonResp) {
            alert("Ocurrio Un error");
        }
    });
    
    $('#dialogUpdPlaza').modal('show'); 

}

function btnUpdPlaza() {

    var dataParams = {'identificacion': $("#txtIdentificacionPlaza").val(), 'nombre': $("#txtNombrePlaza").val(), 'observacion': $("#txtObservacionPlaza").val()};

    $.ajax({
        type: "POST",
        url: "http://refinal.frienderco.com/php/set/setUdpPlaza.php",
        data: dataParams,
        dataType: 'json',
        cache: true,
        success: function (jsonResp, html) {

            if (jsonResp.RESPONSE) {
                $('#dialogUpdPlaza').modal('hide');
                getAllPlazas();

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

function saveAddPlaza(){
    
    
    var identificacion = $("#txtIdentificacionPlazaNew").val();
    var nombre = $("#txtNombrePlazaNew").val();
    var observacion = $("#txtObservacionPlazaNew").val();
    
    var dataParams = {'identificacion': identificacion, 'nombre': nombre, 'observacion':observacion};


    $.ajax({
        type: "POST",
        url: "http://refinal.frienderco.com/php/set/setPlaza.php",
        //url: "../php/set/setReciboEnc.php",
        data: dataParams,
        dataType: 'json',
        cache: true,
        success: function (jsonResp, html) {

            if (jsonResp.RESPONSE) {
                alert(jsonResp.MESSAGE);
                getAllPlazas();
                $('#dialogAddPlaza').modal('hide');                
                $("#txtIdentificacionPlazaNew").val("");
                $("#txtNombrePlazaNew").val("");
                $("#txtObservacionPlazaNew").val("");

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

function removePlaza(idPlaza){
    
    var dataParams = {'idPlaza': idPlaza};

    $.ajax({
        type: "POST",
        url: "http://refinal.frienderco.com/php/set/setDelPlazas.php",
        //url: "../php/set/setReciboEnc.php",
        data: dataParams,
        dataType: 'json',
        cache: true,
        success: function (jsonResp, html) {

            if (jsonResp.RESPONSE) {
                alert(jsonResp.MESSAGE);
                getAllPlazas();

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