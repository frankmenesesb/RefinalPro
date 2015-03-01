/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


window.onload = function()
{
var recibiendoVariable = location.search.slice( location.search.indexOf("=") + 1,location.search.indexOf("$"));



//document.getElementById("recibirVariable").innerHTML = recibiendoVariable;


$("#recibirVariable").val(recibiendoVariable);


};


$(function () {
    $(".recibo_button").click(function () {
        
        location.href = 'frmIngreso.html?var='+$("#recibirVariable").val()+'$';
        
        
  });

});



$(function () {
    $(".usuario_button").click(function () {
        
        location.href = 'frmUsuarios.html?var='+$("#recibirVariable").val()+'$';
        
        
  });

});


$(function () {
    $(".consulta_button").click(function () {
        
        location.href = 'frmReciboBuscar.html?var='+$("#recibirVariable").val()+'$';
        
        
  });

});

