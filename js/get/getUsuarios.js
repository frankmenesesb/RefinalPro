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
    getAllUsuarios();
    
    $('#dialogUpdUsuario').modal('hide');
    $('#dialogInsUsuario').modal('hide');
    
    
    /*$( "#btnNewUsuario" ).on( "click", function() {
        
        $('#dialogInsUsuario').modal('show'); 
     });*/
      
});


function getAllUsuarios(){
    
    var dataParams = {'idUsuario': 0};

            $.ajax({
                type: 'POST',
                data: dataParams,
                dataType: 'json',
                
                url: "http://refinal.frienderco.com/php/get/getUsuarios.php",
                success: function (jsonResp) {
                    
                    if (jsonResp.RESPONSE) {
                        
                        //alert(JSON.stringify(jsonResp));

                        if (jsonResp.MESSAGE === "") {
                            
                            var html = "";
                            var nuPendientes = 0;
                            
                            for (var i = 0; i < jsonResp.DATA.length; i++) {

                                var id_usuario = jsonResp.DATA[i]["id_usuario"];
                                var identificacion = jsonResp.DATA[i]["identificacion"];
                                var nombre = jsonResp.DATA[i]["nombre"];
                                var apellido = jsonResp.DATA[i]["apellido"];
                                var tipo = jsonResp.DATA[i]["tipo"];
                                
                                var jsonParams = {
                                   'identificacion': identificacion,
                                   'indexRow': i
                               };


                                html += '<tr id="row_'+i+'">';
                                html += '<td>';
                                html += ''+identificacion+'';
                                html += '</td>';
                                html += '<td>';
                                html += ''+nombre+''
                                html += '</td>';
                                html += '<td>';
                                html += ''+apellido+'';
                                html += '</td>';                                    
                                html += '<td>';
                                html += ''+tipo+'';
                                html += '</td>';
                                html += '<td width="20%">';                                
                                html += "<a id='btnUpdUsu_"+i+"' class='btn boton-editar' onclick='updUsuario("+JSON.stringify(jsonParams)+");'></a></li>";
                                html += '</td>';
                                html += '</tr>';

                            }
                            
                        $("#listUsuarios tbody").html(html);                        
                        
                        
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

function updUsuario(jsonParams){    
    
    //alert("En construccion...");
    //alert(JSON.stringify(jsonParams));
    
    $.ajax({
        type: 'POST',
        data: jsonParams,
        dataType: 'json',

        url: "http://refinal.frienderco.com/php/get/getUser.php",
        //url: "../php/get/getUser.php",
        success: function (jsonResp) {

            if (jsonResp.RESPONSE) {


                if (jsonResp.MESSAGE === "undefined" || jsonResp.MESSAGE === undefined) {

                    alert('Error Usuario no registrado!!');
                }
                if (jsonResp.MESSAGE === "") {



                    for (var i = 0; i < jsonResp.DATA.length; i++) {


                        var id = jsonResp.DATA[i]["id_usuario"];
                        var nombre = jsonResp.DATA[i]["nombre"];
                        var apellido = jsonResp.DATA[i]["apellido"];
                        var login = jsonResp.DATA[i]["usuario"];
                        var telefono = jsonResp.DATA[i]["telefono"];
                        var identificacion = jsonResp.DATA[i]["identificacion"];
                        var email = jsonResp.DATA[i]["email"];
                        var tipo = jsonResp.DATA[i]["tipo"];
                        var password = jsonResp.DATA[i]["password"];

                        if ((nombre === null || nombre === "") || (id === null || id === "")) {

                            alert("Error: usuario y contraseña invalidos ");

                        } else {

                            $("#txtNombre").val(nombre);
                            $("#txtApellido").val(apellido);
                            $("#txtIdentificacion").val(identificacion);
                            $("#txtUsuario").val(login);
                            $("#txtEmail").val(email);
                            $("#txtTelefono").val(telefono);
                            $("#txtTipo").val(tipo);
                            $("txtContrasena").val(password);
                        }
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
    
    $('#dialogUpdUsuario').modal('show'); 

}


function printArrayRecibos(arrayFacturas){
    
    //alert(JSON.stringify(arrayPendientes));
    setUpdRecPen(arrayFacturas);
    $("#divContent2").html("");
    
    
    $("#listRecibos tbody").find("tr").each(function() {
        var idRow = $(this).attr('id');
        var idFact = $(this).find('td').eq(0).text();
        
        for (var i = 0; i < arrayFacturas.length; i++) {
            //alert(arrayFacturas[i] +"==="+ idFact);
           if(arrayFacturas[i] === idFact){
               $( '#'+idRow ).trigger( "click" );  
               /*setTimeout(function() {
                     $( "#btnImprimir" ).trigger( "click" );
              }, 2000);*/
              
           }
       }
       
       
    });
           
    
        //
        setTimeout(function() {
            var ficha= $("#divContent2").html();   
            var ventimp=window;        
            ventimp.document.write(ficha);
            window.document.title = "Reporte Facturas Pendientes";
            ventimp.document.close();
            ventimp.print();
            ventimp.close();
            //$( "#btnImprimir" ).trigger( "click" );
                JSONGLOBAL.ALLPENDIENTES = false;
                
                window.location.href = '../frm/frmRecibos.html';
                
         }, 1000);
}

function setUpdRecPen(arrayPendientes){
    
    var dataParams = {'arrayPendientes': arrayPendientes};

            
            $.ajax({
                type: "POST",
                url: "http://refinal.frienderco.com/php/set/setUpdRecPen.php",
                //url: "../php/set/setReciboEnc.php",
                data: dataParams,
                dataType: 'json',
                cache: true,
                success: function (jsonResp, html) {


                    if (jsonResp.RESPONSE) {


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