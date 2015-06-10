/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var titleHeader = "";

window.onload = function ()
{
    
    
//var recibiendoVariable = location.search.slice( location.search.indexOf("=") + 1,location.search.indexOf("$"));
    var tipoU = location.search.slice(location.search.indexOf("^") + 1, location.search.indexOf("}"));


//document.getElementById("recibirVariable").innerHTML = recibiendoVariable;

    titleHeader = $(".panel-heading").find("h4").text();
//    $("#recibirVariable").val(recibiendoVariable);
//    
//    if(recibiendoVariable === null || recibiendoVariable === '' || recibiendoVariable=== 'undefined') {
//    alert('Debes iniciar sesión');    
//    location.href = '../index.html';
//    }

    $("#tipoU").val(tipoU);


    var u = localStorage.getItem("id_usuario");
    var n = localStorage.getItem("nombre");

    recibiendoVariable = u;
    if (recibiendoVariable === null || recibiendoVariable === '' || recibiendoVariable === 'undefined') {
        alert('Debes iniciar sesión');
        location.href = '../index.html';
    }
    $("#recibirVariable").val(recibiendoVariable);
    $("#nom-user").html(n);


    updateClock();
    //conecctionStatus();


};


$(function () {
    $(".recibo_button").click(function () {

        location.href = 'frmIngreso.html';


    });

});



$(function () {
    $(".usuario_button").click(function () {

        location.href = 'frmUsuarios.html';


    });

});


$(function () {
    $(".consulta_button").click(function () {

        location.href = 'frmRecibos.html';


    });



});

$(function () {
    $(".articulos_button").click(function () {

        location.href = 'frmArticulos.html';


    });

});

$(function () {
    $(".gestionPlaza_button").click(function () {

        location.href = 'frmPlazas.html';


    });

});


$(function () {
    $(".gestionRecibo_button").click(function () {

        location.href = 'frmGestionRecibos.html';

    });

});

$(function () {
    $(".gestionProveedores_button").click(function () {

        location.href = 'frmGestionProveedores.html';

    });

});


function updateClock() {

    var d = new Date();
    var hour = d.getHours();
    var minute = d.getMinutes();

    if ((minute) * 1 <= 9) {
        minute = "0" + minute;
    }

    $(".panel-hora").find("h5").text('Hora: ' + d.getHours() + ':' + minute);//,'Segundos: '+d.getSeconds());
    //$(".panel-hora").find("h5").text(titleHeader +' Hora: '+d.getHours()+':'+d.getMinutes());//,'Segundos: '+d.getSeconds());

    setTimeout("updateClock()", 1000);
}

$(function () {
    $(".fact_button").click(function () {

        location.href = 'frmIngreso.html';


    });

});


$(function () {
    $(".cancel_fact_button").click(function () {

        location.href = 'frmInicio.html';


    });

});


function conecctionStatus() {
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

    setTimeout("conecctionStatus()", 10000);

}


$(function () {
    $(".atras_button").click(function () {

        location.href = 'frmInicio.html';


    });

});


$(function () {
    $(".cerrar-sesion").click(function () {
        localStorage.removeItem("id_usuario");
        localStorage.removeItem("nombre");
        location.href = '../index.html';


    });

});


function inicioMenu() {

        if (localStorage.getItem("tipo_usuario") === 'S') {
            location.href = 'frmMainS.html';
        }else if (localStorage.getItem("tipo_usuario") === 'A') {
            location.href = 'frmMainA.html';
        }else{
            alter('no tienes usuario Colombiano');
        }

    }