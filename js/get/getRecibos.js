/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {
    
    getAllRecibos();
    
    $('#dialogRecibo').modal('hide');    
    
});


function getAllRecibos(){
    
    var dataParams = {'idRecibo': "NULL"};

            $.ajax({
                type: 'POST',
                data: dataParams,
                dataType: 'json',
                
                url: "http://refinal.frienderco.com/php/get/getRecibosEnc.php",
                //url: "../php/get/getUser.php",
                success: function (jsonResp) {
                    
                    if (jsonResp.RESPONSE) {
                        
                        //alert(JSON.stringify(jsonResp));

                        if (jsonResp.MESSAGE === "") {
                            
                            var html = "<tr><th>No. Fac</th><th>Usuario</th><th>Fecha</th><th>Estado</th><th></th></tr>";
                            
                            for (var i = 0; i < jsonResp.DATA.length; i++) {

                                var id_rec_enc = jsonResp.DATA[i]["id_rec_enc"];
                                var nombre_usuario = jsonResp.DATA[i]["nombre_usuario"];
                                var estado = jsonResp.DATA[i]["estado"];
                                var fecha = jsonResp.DATA[i]["fecha"];



                                /*var log = "";
                                if ((descripcion === null || descripcion === "") || (id === null || id === "")) {

                                    alert("Error: articulos con errores o sin existencia ");

                                } else {*/



                                    html += '<tr id="row_'+i+'">';
                                    html += '<td>';
                                    html += ''+id_rec_enc+''
                                    html += '</td>';
                                    html += '<td>';
                                    html += ''+nombre_usuario+''
                                    html += '</td>';
                                    html += '<td>';
                                    html += ''+fecha+''
                                    html += '</td>';
                                    html += '<td>';
                                    html += ''+estado+''
                                    html += '</td>';
                                    html += '<td>';
                                    html += '<a id="btnVisRec_'+i+'"><span class="glyphicon glyphicon-file" aria-hidden="true" ></span></a></li>';
                                    //html += '<input type="button" id="btnReimprRec_'+i+'" class="glyphicon glyphicon-file"/>';
                                    html += '</td>';
                                    html += '</tr>';
                                    //articulos.add(id);



                               


                            }
                        $("#listRecibos").html(html);
                        
                        $("#listRecibos tbody").find("tr").each(function() {
                            var idRow = $(this).attr('id');
                            var idFact = $(this).find('td').eq(0).text();
                            var nomCliente = $(this).find('td').eq(1).text();
                            var fechaGenerado = $(this).find('td').eq(2).text();
                            
                            $( '#'+idRow ).on( "click", function() {

                               //alert( "Vista previa Recibo N° "+idFact+" :)" );
                               var jsonParams = {
                                   'idRecibo': idFact,
                                   'nomCliente': nomCliente,
                                   'fechaGenerado': fechaGenerado
                               };
                               
                               
                               getRecibo(jsonParams);
                               
                             });
                            // do something with productId, product, Quantity
                        });
                        
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

function getRecibo(jsonParams){
    
    var dataParams = {'idRecibo': jsonParams.idRecibo};
    
    $("#lblNoFactura").text("Factura No. "+ jsonParams.idRecibo);
    $("#lblFecha").text(jsonParams.fechaGenerado);
    $("#lblNomCliente").text(jsonParams.nomCliente);
    
    

            $.ajax({
                type: 'POST',
                data: dataParams,
                dataType: 'json',
                
                url: "http://refinal.frienderco.com/php/get/getReciboDet.php",
                //url: "../php/get/getUser.php",
                success: function (jsonResp) {
                    
                    if (jsonResp.RESPONSE) {
                        
                        //alert(JSON.stringify(jsonResp));

                        if (jsonResp.MESSAGE === "") {
                            
                            //alert(JSON.stringify(jsonResp));
                            var html = "";
                            //{"nombreArticulo":"SEBO EN RAMA","cantidad":"0"}
                            for (var i = 0; i < jsonResp.DATA.length; i++) {

                                var nombreArticulo = jsonResp.DATA[i]["nombreArticulo"];
                                var cantidad = jsonResp.DATA[i]["cantidad"];

                                    html +="<tr align='left' id='rowDet_"+i+"'><td width='60%'><label style='margin-left: 20px;'>"+nombreArticulo+"</label></td><td style='text-align: center;'>"+cantidad+" Kg.</td></tr>";
                                    
                            }
                            
                        $("#tblArticulos tbody").html(html);
                        $('#dialogRecibo').modal('show'); 
                        
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



