/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//
//$(document).ready(function () {
//    $('.filterable .btn-filter').click(function () {
//        var $panel = $(this).parents('.filterable'),
//                $filters = $panel.find('.filters input'),
//                $tbody = $panel.find('.table tbody');
//        if ($filters.prop('disabled') === true) {
//            $filters.prop('disabled', false);
//            $filters.first().focus();
//        } else {
//            $filters.val('').prop('disabled', true);
//            $tbody.find('.no-result').remove();
//            $tbody.find('tr').show();
//        }
//    });
//
//    $('.filterable .filters input').keyup(function (e) {
//        /* Ignore tab key */
//        var code = e.keyCode || e.which;
//        if (code === '9')
//            return;
//        /* Useful DOM data and selectors */
//        var $input = $(this),
//                inputContent = $input.val().toLowerCase(),
//                $panel = $input.parents('.filterable'),
//                column = $panel.find('.filters th').index($input.parents('th')),
//                $table = $panel.find('.table'),
//                $rows = $table.find('tbody tr');
//        /* Dirtiest filter function ever ;) */
//        var $filteredRows = $rows.filter(function () {
//            var value = $(this).find('td').eq(column).text().toLowerCase();
//            return value.indexOf(inputContent) === -1;
//        });
//        /* Clean previous no-result if exist */
//        $table.find('tbody .no-result').remove();
//        /* Show all rows, hide filtered ones (never do that outside of a demo ! xD) */
//        $rows.show();
//        $filteredRows.hide();
//        /* Prepend no-result row if all rows are filtered */
//        if ($filteredRows.length === $rows.length) {
//            $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="' + $table.find('.filters th').length + '">No result found</td></tr>'));
//        }
//    });
//
//    
//    setSelectProveedores();
//    setSelectImagenes();
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
//    
//    /*$('#btnNewProveedor').on('change', function () {
//        alert("x");
//       $('#dialogAddProveedor').modal('show');
//    });*/
//    
//    // 
//});









//function saveAddProveedor(){
//    
//    
//    var identificacion = $("#txtIdentificacionProveedor").val();
//    var nombre = $("#txtNombreProveedor").val();
//    var observacion = $("#txtObservacionProveedor").val();
//    
//    var dataParams = {'identificacion': identificacion, 'nombre': nombre, 'observacion':observacion};
//
//
//    $.ajax({
//        type: "POST",
//        url: "http://refinalapp.fluxusmedia.co/php/set/setProveedor.php",
//        //url: "../php/set/setReciboEnc.php",
//        data: dataParams,
//        dataType: 'json',
//        cache: true,
//        success: function (jsonResp, html) {
//
//            if (jsonResp.RESPONSE) {
//                alert(jsonResp.MESSAGE);
//                setSelectArticulos();
//                setSelectProveedores();
//                getArticulosProveedor();
//                $('#dialogAddProveedor').modal('hide');
//                $("#txtIdentificacionProveedor").val("");
//                $("#txtNombreProveedor").val("");
//                $("#txtObservacionProveedor").val("");
//
//            } else {
//                alert("Ocurrio Un error:" + jsonResp.MESSAGE);
//            }
//
//        }
//        ,
//        error: function (jsonResp) {
//            //alert("Ocurrio Un error Diferente");
//            alert("Falta hacer el update que cambie el estado a las facturas de pendientes a generadas");
//        }
//    });
//}