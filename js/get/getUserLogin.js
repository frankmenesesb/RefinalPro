/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(function () {
    $(".find_button").click(function () {

        login_usuario();

    });

});


function login_usuario(){
    
    
        //variables de entrada
        var strLog = $("#txtUsuario").val();
        var strPass = $("#txtContrasena").val();
       
        //variables locales

        var id;
        var nombre;
        var apellido;
        var login;
        var telefono;
        var identificacion;
        var email;
        var tipo;
        var log = "";

        var dataString = {'usuario': strLog,'contrasena': strPass};

        if (strLog === '') {

            alert("No has ingresado el usuario :)..");
            $("#txtUsuario").focus();

        } else if (strPass === '') {

            alert("No has ingresado la contraseña :)..");
            $("#txtContrasena").focus();

        } else
        {
            $.ajax({
                type: 'POST',
                data: dataString,
                dataType: 'json',
                url: "http://refinalapp.fluxusmedia.co/php/get/getUserLogin.php",
                success: function (jsonResp) {

                    if (jsonResp.RESPONSE) {


                        if (jsonResp.MESSAGE === "undefined" || jsonResp.MESSAGE === undefined) {

                            alert('Error Usuario no registrado!!');
                        }
                        if (jsonResp.MESSAGE === "") {



                            for (var i = 0; i < jsonResp.DATA.length; i++) {




                                id = jsonResp.DATA[i]["id_usuario"];
                                nombre = jsonResp.DATA[i]["nombre"];
                                apellido = jsonResp.DATA[i]["apellido"];
                                login = jsonResp.DATA[i]["usuario"];
                                telefono = jsonResp.DATA[i]["telefono"];
                                ;
                                identificacion = jsonResp.DATA[i]["identificacion"];
                                ;
                                email = jsonResp.DATA[i]["email"];
                                ;
                                tipo = jsonResp.DATA[i]["tipo"];
                                ;
                                
                                
                                if (typeof (Storage) !== "undefined") {
                                    // Store
                                    localStorage.setItem("id_usuario", id);
                                    localStorage.setItem("nombre", nombre);
                                    localStorage.setItem("tipo_usuario",tipo);
                                    // Retrieve

                                } else {
                                    alert("Sorry, your browser does not support Web Storage...");
                                }


                                log = "";
                                if ((nombre === null || nombre === "") || (id === null || id === "")) {

                                    alert("Error: usuario y contraseña invalidos ");

                                } else {

                                    if (tipo === 'A') {
                                       
                                        location.href = 'frm/frmMainA.html';
                                    } else if (tipo === 'R') {
                                        location.href = 'frm/frmInicio.html';
                                    } else if (tipo === 'S') {
                                        location.href = 'frm/frmMainS.html';

                                    }
                                }
                            }

                            //$("#txtHint").html(encabezado+html+final);

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
    
}

