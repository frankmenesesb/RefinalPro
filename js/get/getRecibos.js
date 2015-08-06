/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var arrayPendientes = new Array();
var JSONGLOBAL = {'ALLPENDIENTES': false};
var html4 = "";

var path = window.location.pathname;
var pageName = path.split("/").pop();

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
    getAllRecibos();

    $('#dialogRecibo').modal('hide');
    $('#divContent2').modal('hide');


    $("#btnImprPend").on("click", function () {
        JSONGLOBAL.ALLPENDIENTES = true;
        printArrayRecibos(arrayPendientes);

    });

    $("#btnPrueba").on("click", function () {

        var arrayRecibos = new Array();

        $("#listRecibos tbody").find("tr").each(function () {
            var idRow = $(this).attr('id');


            if ($('#' + idRow).is(':visible')) {
                var idFact = $(this).find('td').eq(0).text();
                var fechaGenerado = $(this).find('td').eq(1).text();
                
                var horaGenerado = $(this).find('td').eq(2).text();
                var nomRecolector = $(this).find('td').eq(3).text();
                var plaza = $(this).find('td').eq(4).text();
                var nomProveedor = $(this).find('td').eq(5).text();
                var estado = $(this).find('td').eq(6).text();
                
                //var estado = $(this).find('td').eq(3).find('img').attr('title');

                arrayRecibos.push([idFact,fechaGenerado, horaGenerado,nomRecolector, plaza, nomProveedor, estado]);
                //arrayRecibos.push(idFact);
            }
        });

        generarArchivoPlano(arrayRecibos);


    });



});


function getAllRecibos() {

    //alert('entro');
    var usuarioFiltro = $("#txtFiltroUsuario").val();
    //alert('entro con '+usuarioFiltro);
    var dataParams = {'idRecibo': "NULL", 'usuario': usuarioFiltro};

    $("#listRecibos tbody").html('<tr><td colspan="7" align="center"><img src="../images/Loading_bar.gif" alt="Smiley face" title="Cargando"></center></td></tr>');

    $.ajax({
        type: 'POST',
        data: dataParams,
        dataType: 'json',
        url: "http://refinalapp.fluxusmedia.co/php/get/getRecibosEnc.php",
        //url: "../php/get/getUser.php",
        success: function (jsonResp) {

            if (jsonResp.RESPONSE) {


                if (jsonResp.MESSAGE === "") {

                    var html = "";
                    var nuPendientes = 0;

                    for (var i = 0; i < jsonResp.DATA.length; i++) {

                        var id_rec_enc = jsonResp.DATA[i]["id_rec_enc"];
                        var nombre_usuario = jsonResp.DATA[i]["nombre_usuario"];
                        var nombre_proveedor = jsonResp.DATA[i]["nom_proveedor"];
                        var estado = jsonResp.DATA[i]["estado"];
                        var fecha = jsonResp.DATA[i]["fecha"];
                        var placa = jsonResp.DATA[i]["id_placa"];
                        var hora = jsonResp.DATA[i]["hora"];
                        var plaza = jsonResp.DATA[i]["nom_plaza"];
                        //lblRecPen

                        if (estado === "Pendiente") {
                            nuPendientes++;
                            arrayPendientes.push(id_rec_enc);
                        }
                        /*var log = "";
                         if ((descripcion === null || descripcion === "") || (id === null || id === "")) {
                         alert("Error: articulos con errores o sin existencia ");
                         } else {*/



                        html += '<tr id="row_' + i + '">';
                        html += '<td style="width: 5%;">';
                        html += '' + id_rec_enc + '';
                        html += '</td>';
                        html += '<td style="width: 5%;">';
                        html += '' + fecha + '';
                        html += '</td>';
                        html += '<td style="width: 5%;">';
                        html += '' + hora + '';
                        html += '</td>';
                        html += '<td style="width: 15%;">';
                        html += '' + nombre_usuario + '';
                        html += '</td>';
                        html += '<td style="width: 10%;">';
                        html += '' + plaza + '';
                        html += '</td>';
                        html += '<td style="width: 15%;">';
                        html += '' + nombre_proveedor + '';
                        html += '</td>';
                        html += '<td style="width: 5%;">';
                        html += '' + placa + '';
                        html += '</td>';


                        html += '<td style="width: 5%;">';
                        //html += ''+estado+''
                        if (estado === "Generado") {
                            html += '<p hidden>Generado</p><img src="../images/icon activo.png" alt="Smiley face" height="32" width="31" title="Generado">';
                        } else if (estado === "Anulado") {
                            html += '<p hidden>Anulado</p><img src="../images/icon inactivo.png" alt="Smiley face" height="32" width="31" title="Anulado">';
                        } else if (estado === "Entregado") {
                            html += '<p hidden>Entregado</p><img src="../images/icon entregado.png" alt="Smiley face" height="32" width="31" title="Entregado">';
                        }
                        html += '</td>';
                        html += '<td style="width: 10%;">';
                        html += '<a id="btnVisRec_' + i + '"  onclick="getRecibo(\'' + id_rec_enc + '\',\'' + fecha + '\',\'' + nombre_usuario + '\',\'' + placa + '\',\'' + hora + '\',\'' + nombre_proveedor + '\',\'' + plaza + '\')"><span style="background-size: 110px; height: 35px; background-image: url(\'../images/btn-ver-0.png\'); display:block; background-repeat: no-repeat;" ></span></a>';
                        //html += '<input type="button" id="btnReimprRec_'+i+'" class="glyphicon glyphicon-file"/>';
                        html += '</td>';
                        if (pageName === "frmGestionRecibos.html") {
                            html += '<td style="width: 10%;">';
                            html += "<a id='btnUpdRec_" + i + "' onclick='updRecibo(\"" + id_rec_enc + "\",\"" + estado + "\",\"" + fecha + "\");'><span style='background-size: 110px; height: 35px; background-image: url(\"../images/btn-editar-0.png\"); display:block; background-repeat: no-repeat;' ></span></a>";
                            //alert("<a id='btnUpdRec_" + i + "' onclick='updRecibo(" + id_rec_enc + ");'><span style='background-size: 110px; height: 35px; background-image: url(\"../images/btn-editar-0.png\"); display:block; background-repeat: no-repeat;' ></span></a>");
                            html += '</td>';
                        }
                        html += '</tr>';
                        //articulos.add(id);






                    }

                    $("#lblRecPen").html("<h3>" + nuPendientes + "</h3>");

                    $("#listRecibos tbody").html(html);

//                    $("#listRecibos tbody").find("tr").each(function () {
//                        var idRow = $(this).attr('id');
//                        idRow = idRow.replace("row_", "");
//                        var idFact = $(this).find('td').eq(0).text();
//                        var nomCliente = $(this).find('td').eq(1).text();
//                        var fechaGenerado = $(this).find('td').eq(2).text();
//
//                        $('#btnVisRec_' + idRow).on("click", function () {
//
//                            //alert( "Vista previa Recibo N° "+idFact+" :)" );
//                            alert(idFact + ' ' + nomCliente + ' ' + fechaGenerado);
//                            var jsonParams = {
//                                'idRecibo': idFact,
//                                'nomCliente': nomCliente,
//                                'fechaGenerado': fechaGenerado
//                            };
//
//
//                            getRecibo(jsonParams);
//
//                        });
//                        // do something with productId, product, Quantity
//                    });

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

function getRecibo(id_rec_enc, fecha, nombre_usuario, placa, hora, nom_proveedor, nom_plaza) {

    var dataParams = {'idRecibo': id_rec_enc};


    $.ajax({
        type: 'POST',
        data: dataParams,
        dataType: 'json',
        url: "http://refinalapp.fluxusmedia.co/php/get/getReciboDet.php",
        //url: "../php/get/getUser.php",
        success: function (jsonResp) {

            if (jsonResp.RESPONSE) {

                //alert(JSON.stringify(jsonResp));


                if (jsonResp.MESSAGE === "") {
                    //alert(JSON.stringify(jsonResp));
                    var html = '<center><table width="95%" align="center" cellpadding="10" cellspacing="0" style="border:1px solid black;">';
                    html += "<tr align='center' style='border-bottom: solid;'>";
                    html += "<td style='border-bottom: 1px solid black;'><label style='font-weight: bold;'>Factura No. " + id_rec_enc + "</label></td>";
                    html += "<td style='border-bottom: 1px solid black;'><label>Fecha: " + fecha + " " + hora + "</label></td>";
                    html += "</tr>";
                    html += "<tr align='center'>";
                    html += "<td style='border-bottom: 1px solid black;'><label style='font-weight: bold;'>Usuario:</label></td>";
                    html += "<td style='border-bottom: 1px solid black;'><label>" + nombre_usuario + "</label></td>";
                    html += "</tr>";
                    html += "<tr align='center'>";
                    html += "<td style='border-bottom: 1px solid black;'><label style='font-weight: bold;'>Proveedor:</label></td>";
                    html += "<td style='border-bottom: 1px solid black;'><label>" + nom_proveedor + "</label></td>";
                    html += "</tr>";
                    html += "<tr align='center'>";
                    html += "<td style='border-bottom: 1px solid black;'><label style='font-weight: bold;'>Plaza:</label></td>";
                    html += "<td style='border-bottom: 1px solid black;'><label>" + nom_plaza + "</label></td>";
                    html += "</tr>";
                    if (placa.toString() !== '') {
                        html += "<tr align='center'>";
                        html += "<td style='border-bottom: 1px solid black;'><label style='font-weight: bold;'>Placa entrega:</label></td>";
                        html += "<td style='border-bottom: 1px solid black;'><label>" + placa + "</label></td>";
                        html += "</tr>";
                    }

                    html += "<tr>";
                    html += "<td colspan='2'>";



                    html += '<table width="100%" border="1" cellspacing="0" style="border:1px solid black;text-align: center;">';
                    html += "<thead>";
                    html += "<tr>";
                    html += "<th style='text-align: center;'>Productos</th>";
                    html += "<th style='text-align: center;'>Kilos</th>";
                    html += "</tr>";
                    html += "</thead>";
                    html += "<tbody>";
                    //{"nombreArticulo":"SEBO EN RAMA","cantidad":"0"}
                    for (var i = 0; i < jsonResp.DATA.length; i++) {

                        var nombreArticulo = jsonResp.DATA[i]["nombreArticulo"];
                        var cantidad = jsonResp.DATA[i]["cantidad"];

                        html += "<tr align='left' id='rowDet_" + i + "'><td width='60%'><label style='margin-left: 20px;'>" + nombreArticulo + "</label></td><td style='text-align: center;'>" + cantidad + " Kg.</td></tr>";

                    }

                    html += "</tbody>";
                    html += "</table>";

                    html += "</td>";
                    html += "</tr>";
                    html += "</table></center>";


                    if (JSONGLOBAL.ALLPENDIENTES) {
                        html += "<br />";
                        html += "<br />";
                        html += "<br />";
                        html += "<br />";
                        html += "<br />";
                        html += "<br />";
                        html += "<br />";
                        html += "<br />";
                        html += "<br />";
                        html += "<br />";
                        html += "<br />";
                        html += "<br />";
                        html += "<br />";
                        html += "<br />";
                        html += "<br />";
                        html += "<br />";
                        html += "<br />";
                        html += "<br />";
                        html += "<br />";
                        html += "<br />";
                        html += "<br />";
                        html += "<br />";
                        html += "<br />";
                        html += "<br />";
                        $("#divContent2").append(html);

                    } else {
                        $("#divContent2").html(html);
                        var html2 = html;

                        html = '<div class="modal-dialog">';
                        html += '<div class="modal-content">';
                        html += '<div class="modal-header">';
                        html += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
                        html += '<h4 class="modal-title" id="myModalLabel">Vista previa</h4>';
                        html += '</div>';
                        html += '<div class="modal-body" id="divContent">';
                        html += '<table width="95%" align="center" cellpadding="10" cellspacing="0" style="border:1px solid black;">';
                        html += '<tr align="center" style="border-bottom: solid;">';
                        html += '<td style="border-bottom: 1px solid black;"><label id="lblNoFactura" style="font-weight: bold;"></label></td>';
                        html += '<td style="border-bottom: 1px solid black;"><label id="lblFecha"></label></td>';
                        html += '</tr>';
                        html += '<tr align="center" >';
                        html += '<td style="border-bottom: 1px solid black;"><label style="font-weight: bold;">REFINAL</label></td>';
                        html += '<td style="border-bottom: 1px solid black;"><label id="lblNomCliente"></label></td>';
                        html += '</tr>';
                        html += '<tr>';
                        html += '<td colspan="2">';
                        html += '<div id="divContent">' + html2;

                        html += '<div id="divMotivos">';
                        html += '</div>';

                        html += '</div>';
                        html += '</td>';
                        html += '</tr>';
                        html += '</table>';
                        html += '</div>';
                        html += '<div class="modal-footer">';
                        html += '<button type="button" class="btn btn-default glyphicon glyphicon-print" data-dismiss="modal" id="btnImprimir">Imprimir</button>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';

                        $("#dialogRecibo").html(html);
                        $('#dialogRecibo').modal('show');

                        motivos(id_rec_enc);

                        $("#btnImprimir").on("click", function () {

                            //$("#dialogRecibo").print();
                            var ficha = $("#divContent2").html();
                            //window.document.write(ficha);
                            //window.document.title = "Reporte Factura";
                            window.print();


//                            setTimeout(function () {
//                                alert(window.location.href);
//                                window.location.href = '../frm/frmRecibos.html';
//                            }, 3000);


                        });

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

    $('#divContent2').hide();

}


function printArrayRecibos(arrayFacturas) {

    //alert(JSON.stringify(arrayPendientes));
    setUpdRecPen(arrayFacturas);
    $("#divContent2").html("");


    $("#listRecibos tbody").find("tr").each(function () {
        var idRow = $(this).attr('id');
        var idFact = $(this).find('td').eq(0).text();

        for (var i = 0; i < arrayFacturas.length; i++) {
            //alert(arrayFacturas[i] +"==="+ idFact);
            if (arrayFacturas[i] === idFact) {
                $('#' + idRow).trigger("click");
                /*setTimeout(function() {
                 $( "#btnImprimir" ).trigger( "click" );
                 }, 2000);*/

            }
        }


    });


    //
    setTimeout(function () {
        var ficha = $("#divContent2").html();
        var ventimp = window;
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

function setUpdRecPen(arrayPendientes) {

    var dataParams = {'arrayPendientes': arrayPendientes};


    $.ajax({
        type: "POST",
        url: "http://refinalapp.fluxusmedia.co/php/set/setUpdRecPen.php",
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

function generarArchivoPlano(arrayRecibos) {

    var dataParams = {'arrayRecibos': arrayRecibos};

    $.ajax({
        type: "POST",
        url: "http://refinalapp.fluxusmedia.co/php/get/getRecArchivoPlano.php",
        data: dataParams,
        dataType: 'json',
        cache: true,
        success: function (jsonResp, html) {

            if (jsonResp.RESPONSE) {
                descargarArchivo(generarTexto(jsonResp.DATA), 'archivo.txt');

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

function generarTexto(txt) {

    var texto = [txt];
    //El contructor de Blob requiere un Array en el primer parámetro
    //así que no es necesario usar toString. el segundo parámetro
    //es el tipo MIME del archivo
    return new Blob(texto, {
        type: 'text/plain'
    });
}
;

function descargarArchivo(contenidoEnBlob, nombreArchivo) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var save = document.createElement('a');
        save.href = event.target.result;
        save.target = '_blank';
        save.download = nombreArchivo || 'archivo.dat';
        var clicEvent = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });
        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    reader.readAsDataURL(contenidoEnBlob);
}
;

function updRecibo(id_rec, est_rec, fec_rec) {

    var id = id_rec;
    var estado = est_rec;
    var fecha = fec_rec;

    if (estado === "Generado") {
        estado = "G";
    } else if (estado === "Entregado") {
        estado = "E";
    } else {
        estado = "A";
    }

    $("#txtIdRecibo").val(id);
    $("#selEstadoRec").val(estado);
    $("#txtFechaRec").val(fecha);

    $('#dialogUpdRecibo').modal('show');

    //btnUpdateRec



}

$(function () {
    $("#btnUpdateRec").on("click", function () {

        var id = $("#txtIdRecibo").val();
        var estado = $("#selEstadoRec").val();

        //setUdpRec
        var dataParams = {'idRecibo': id, 'estado': estado};

        $.ajax({
            type: "POST",
            url: "http://refinalapp.fluxusmedia.co/php/set/setUdpRec.php",
            data: dataParams,
            dataType: 'json',
            cache: true,
            success: function (jsonResp, html) {

                if (jsonResp.RESPONSE) {
                    //descargarArchivo(generarTexto(jsonResp.DATA), 'archivo.txt');
                    $('#dialogUpdRecibo').modal('hide');
                    getAllRecibos();

                } else {
                    alert("Ocurrio Un error:" + jsonResp.MESSAGE);
                }

            }
            ,
            error: function (jsonResp) {
                alert("Ocurrio Un error Diferente");
            }
        });
    });
});


function motivos(id_rec_enc) {

    var id = id_rec_enc;
    html4 = "";
    html4 += "<br><br><center><label>Motivos cambios de estado:</label></center><br>";
    html4 += '<table  width="95%" align="center" cellpadding="10" cellspacing="0" style="border:1px solid black;">';
    html4 += '<tr align="center" style="border-bottom: solid;"><td style="border: 1px solid black;">Usuario</td>';
    html4 += '<td style="border: 1px solid black;">Estado</td>';
    html4 += '<td style="border: 1px solid black;">Observacion</td></tr>';
    //setUdpRec



    var dataParams = {'idRecibo': id};

    $.ajax({
        type: "POST",
        url: "http://refinalapp.fluxusmedia.co/php/get/getMotivosRec.php",
        data: dataParams,
        dataType: 'json',
        cache: true,
        success: function (jsonResp, html) {

            if (jsonResp.RESPONSE) {
                for (var i = 0; i < jsonResp.DATA.length; i++) {
                    var usuario = jsonResp.DATA[i]["nombre_usu"];
                    var observacion = jsonResp.DATA[i]["observacion"];
                    var estado = jsonResp.DATA[i]["estado"];




                    html4 += '<tr align="center" style="border-bottom: solid;">';

                    html4 += '<td style="border: 1px solid black;">';
                    html4 += "" + usuario;
                    html4 += "</td>";
                    html4 += '<td style="border: 1px solid black;">';
                    html4 += "" + estado;
                    html4 += "</td>";
                    html4 += '<td style="border: 1px solid black;">';
                    html4 += "" + observacion;
                    html4 += "</td>";
                    html4 += "</tr>";
                }

                html4 += '</table><br>';

                $("#divMotivos").html(html4);

            } else {
                alert("Ocurrio Un error:" + jsonResp.MESSAGE);

            }

        }
        ,
        error: function (jsonResp) {
            alert("Ocurrio Un error Diferente");
            $("#divMotivos").html('');
        }
    });
}