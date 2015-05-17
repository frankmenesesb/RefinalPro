/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var titleHeader = "";

window.onload = function()
{
var recibiendoVariable = location.search.slice( location.search.indexOf("=") + 1,location.search.indexOf("$"));



//document.getElementById("recibirVariable").innerHTML = recibiendoVariable;

    titleHeader = $(".panel-heading").find("h4").text();
    $("#recibirVariable").val(recibiendoVariable);
    
    updateClock();
    //conecctionStatus();


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
        
        location.href = 'frmRecibos.html?var='+$("#recibirVariable").val()+'$';
        
        
  });

});

function updateClock(){
    
    var d = new Date();
    var hour  = d.getHours();
    var minute = d.getMinutes();
    
    if((minute)*1 <= 9){
        minute = "0"+minute;
    }
    
    $(".panel-hora").find("h5").text('Hora: '+d.getHours()+':'+minute);//,'Segundos: '+d.getSeconds());
    //$(".panel-hora").find("h5").text(titleHeader +' Hora: '+d.getHours()+':'+d.getMinutes());//,'Segundos: '+d.getSeconds());
    
    setTimeout("updateClock()",1000) ;
}

$(function () {
    $(".fact_button").click(function () {
        
        location.href = 'frmIngreso.html?var='+$("#recibirVariable").val()+'$';
        
   
    });

});


$(function () {
    $(".cancel_fact_button").click(function () {
        
        location.href = 'frmInicio.html?var='+$("#recibirVariable").val()+'$';
        
   
    });

});


function conecctionStatus(){
    //$(".panel-statusConn").html('<img src="../images/icon 03 1.png" alt="Smiley face" height="25" width="25" title="Sin conexión"/><a class="btn glyphicon glyphicon-menu-hamburger" ></a>');
    $.ajax({
        type: "POST",
        url: "http://refinal.frienderco.com/php/get/conecctionStatus.php",
        data: "NULL",
        dataType: 'json',
        cache: true,
        success: function (jsonResp, html) {

            if (jsonResp.RESPONSE) {
                $(".panel-statusConn").html('<img src="../images/icon 03 0.png" alt="Smiley face" height="25" width="25" title="Conexión correcta"/><a class="btn glyphicon glyphicon-menu-hamburger" ></a>');
            } else {
                $(".panel-statusConn").html('<img src="../images/icon 03 1.png" alt="Smiley face" height="25" width="25" title="Sin conexión"/><a class="btn glyphicon glyphicon-menu-hamburger" ></a>');
            }

        }
        ,
        error: function (jsonResp) {
            $(".panel-statusConn").html('<img src="../images/icon 03 1.png" alt="Smiley face" height="25" width="25" title="Sin conexión"/><a class="btn glyphicon glyphicon-menu-hamburger" ></a>');
        }
    });
    
    setTimeout("conecctionStatus()",10000) ;
    
}