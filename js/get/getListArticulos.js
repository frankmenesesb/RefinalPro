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
        if ($filters.prop('disabled') === true) {
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
        if (code === '9') return;
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
    getAllArticulos();
    setSelectImagenes();
    setSelectPadres();
    
    $('#dialogUpdUsuario').modal('hide');
    $('#dialogInsUsuario').modal('hide');
      
});


function getAllArticulos(){
    
    var dataParams = {'idUsuario': 0};
    
    $("#listArticulos tbody").html('<tr><td colspan="6" align="center"><img src="../images/Loading_bar.gif" alt="Smiley face" title="Cargando"></center></td></tr>');
    
            $.ajax({
                type: 'POST',
                data: dataParams,
                dataType: 'json',
                
                url: "http://refinalapp.fluxusmedia.co/php/get/getArticulos.php",
                success: function (jsonResp) {
                    
                    if (jsonResp.RESPONSE) {
                        
                        //alert(JSON.stringify(jsonResp));

                        if (jsonResp.MESSAGE === "") {
                            
                            var html = "";
                            var nuPendientes = 0;
                            
                            for (var i = 0; i < jsonResp.DATA.length; i++) {

                                var id = jsonResp.DATA[i]["id_art"];
                                var descripcion = jsonResp.DATA[i]["descripcion"];
                                var observacion = jsonResp.DATA[i]["observacion"];
                                var imagen = jsonResp.DATA[i]["imagen"];
                                var padre =jsonResp.DATA[i]["padre"];
                                var tipo =jsonResp.DATA[i]["tipo"];
                                var jsonParams = {
                                   'idArticulo': id,
                                   'indexRow': i
                               };


                                html += '<tr id="row_'+i+'">';
                                html += '<td>';
                                html += ''+id+'';
                                html += '</td>';
                                html += '<td>';
                                html += ''+descripcion+'';
                                html += '</td>';
                                html += '<td>';
                                html += ''+observacion+'';
                                html += '</td>';                                    
                                html += '<td>';
                                html +='<img src="../images/'+imagen+'" alt="">';
                                html += '</td>';
                                html += '<td width="20%">';                                
                                html += "<a id='btnUpdArt_"+i+"' class='btn boton-editar' onclick='modalUpdArticulo("+id+");'></a>";
                                html += '</td>';
                                html += '<td>';
                                if(tipo.toString()!=="P"){
                                html += "<a id='btnRemoveArticulo_" + i + "' onclick='removeArticulo(" + id + ");'><span style='background-size: 35px; height: 35px; background-image: url(\"../images/icon inactivo.png\"); display:block; background-repeat: no-repeat;' ></span></a>";
                                }else{
                                   html+=" Categoria Principal";
                                }
                                html += '</td>';
                                html += '</tr>';

                            }
                            
                        $("#listArticulos tbody").html(html);                        
                        
                        
                        } else if (jsonResp.MESSAGE === "EMPTY") {
                            alert("Error: no se encontro datos articulos!!");
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

function modalUpdArticulo(jsonParams){    
        
    $.ajax({
        type: 'POST',
        data: jsonParams,
        dataType: 'json',
        url: "http://refinalapp.fluxusmedia.co/php/get/getArticulos.php",
        success: function (jsonResp) {

            if (jsonResp.RESPONSE) {

                if (jsonResp.MESSAGE === "undefined" || jsonResp.MESSAGE === undefined) {

                    alert('Error!!');
                }
                if (jsonResp.MESSAGE === "") {

                    for (var i = 0; i < jsonResp.DATA.length; i++) {
                        //a.id_art, a.descripcion, a.observacion, a.imagen

                        var id = jsonResp.DATA[i]["id_art"];
                        var descripcion = jsonResp.DATA[i]["descripcion"];
                        var observacion = jsonResp.DATA[i]["observacion"];
                        var imagen = jsonResp.DATA[i]["imagen"];

                        $("#txtIdentificacionArticulo").val(id);
                        $("#txtNombreArticulo").val(descripcion);
                        $("#txtObservacionArticulo").val(observacion);
                        $("#selImagenesUpd").val(imagen);
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
    
    $('#dialogUpdArticulo').modal('show'); 

}

function setSelectImagenes() {
    var urlima;
    
    $.ajax({
        type: 'POST',
        //data: dataString,
        dataType: 'json',
        url: "http://refinalapp.fluxusmedia.co/php/get/getImagen.php",
        //url: "../php/get/getArticulos.php",
        success: function (jsonResp) {

            if (jsonResp.RESPONSE) {


                if (jsonResp.MESSAGE === "undefined" || jsonResp.MESSAGE === undefined) {

                    alert('Error no hay imagenes!!');
                }
                if (jsonResp.MESSAGE === "") {

                    var options = "<option value='N'>Seleccione Imagen</option>";
                    
                    for (var i = 0; i < jsonResp.DATA.length; i++) {
                        var imagen = jsonResp.DATA[i]["imagen"];
                        urlima="'../images/"+imagen+"'";
                        var span="</span>  <span style='display:inline-block; width:100px;'>  美金</span>";
                        //options += '<option value="" data-content="'+urlima+' '+span+'"></option>';
                        options += '<option value="' + imagen + '" style="background-image:url('+urlima+'); background-repeat:no-repeat; height:40px; background-position: right;">'+imagen+'</option>';
                        
                        //options += '<option value="' + imagen + '" style="background-image:url(../images/'+imagen+');no-repeat; height:100px;">'+imagen+'</option>';
                    }

                    $('#selImagenesUpd').html(options);
                    $('#selImagenesNew').html(options);                    

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

function btnUpdArticulo() {

    var dataParams = {'identificacion': $("#txtIdentificacionArticulo").val(), 'descripcion': $("#txtNombreArticulo").val(), 'observacion': $("#txtObservacionArticulo").val(), 'imagen': $("#selImagenesUpd").val()};

    $.ajax({
        type: "POST",
        url: "http://refinalapp.fluxusmedia.co/php/set/setUdpArticulo.php",
        data: dataParams,
        dataType: 'json',
        cache: true,
        success: function (jsonResp, html) {

            if (jsonResp.RESPONSE) {
                $('#dialogUpdArticulo').modal('hide');
                getAllArticulos();

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

function saveAddArticulo(){
    
    
    var identificacion = $("#txtIdentificacionArticuloNew").val();
    var nombre = $("#txtNombreArticuloNew").val();
    var observacion = $("#txtObservacionArticuloNew").val();
    var imagen = $("#selImagenesNew").val();
    var padre = $("#txtPadre").val();
    
    var dataParams = {'identificacion': identificacion, 'nombre': nombre, 'observacion':observacion, 'imagen':imagen, 'padre':padre};

    
    $.ajax({
        type: "POST",
        url: "http://refinalapp.fluxusmedia.co/php/set/setArticulo.php",
        //url: "../php/set/setReciboEnc.php",
        data: dataParams,
        dataType: 'json',
        cache: true,
        success: function (jsonResp, html) {

            if (jsonResp.RESPONSE) {
                alert(jsonResp.MESSAGE);
                getAllArticulos();
                $('#dialogAddArticulo').modal('hide');                
                $("#txtIdentificacionArticuloNew").val("");
                $("#txtNombreArticuloNew").val("");
                $("#txtObservacionArticuloNew").val("");
                $("#txtPadre").val('N');

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

function removeArticulo(idArticulo){
    
    var dataParams = {'idArticulo': idArticulo};

    $.ajax({
        type: "POST",
        url: "http://refinalapp.fluxusmedia.co/php/set/setDelArticulos.php",
        //url: "../php/set/setReciboEnc.php",
        data: dataParams,
        dataType: 'json',
        cache: true,
        success: function (jsonResp, html) {

            if (jsonResp.RESPONSE) {
                alert(jsonResp.MESSAGE);
                getAllArticulos();

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


function setSelectPadres() {
    var urlima;
    
    $.ajax({
        type: 'POST',
        //data: dataString,
        dataType: 'json',
        url: "http://refinalapp.fluxusmedia.co/php/get/getArticulosPadre.php",
        //url: "../php/get/getArticulos.php",
        success: function (jsonResp) {

            if (jsonResp.RESPONSE) {


                if (jsonResp.MESSAGE === "undefined" || jsonResp.MESSAGE === undefined) {

                    alert('Error no hay imagenes!!');
                }
                if (jsonResp.MESSAGE === "") {

                    var options = "<option value='N'>Seleccione Categoria</option>";
                    
                    for (var i = 0; i < jsonResp.DATA.length; i++) {
                        var imagen = jsonResp.DATA[i]["imagen"];
                        var id = jsonResp.DATA[i]["id_art"];
                        var nombre = jsonResp.DATA[i]["descripcion"];
                        urlima="'../images/"+imagen+"'";
                        var span="</span>  <span style='display:inline-block; width:100px;'>  美金</span>";
                        //options += '<option value="" data-content="'+urlima+' '+span+'"></option>';
                        options += '<option value="' + id + '" style="background-image:url('+urlima+'); background-repeat:no-repeat; height:40px; background-position: right;">'+nombre+'</option>';
                        
                        //options += '<option value="' + imagen + '" style="background-image:url(../images/'+imagen+');no-repeat; height:100px;">'+imagen+'</option>';
                    }

                    $('#txtPadre').html(options);
                                       

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