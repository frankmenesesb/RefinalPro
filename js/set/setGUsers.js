/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(function () {
    $(".user_save_button").click(function () {

        var strNom = $("#txtNombre2").val();
        var strApe = $("#txtApellido2").val();
        var strLog = $("#txtUsuario2").val();
        var strPass = $("#txtContrasena3").val();
        var strPass2 = $("#txtContrasena22").val();
        var strEma = $("#txtEmail2").val();
        var strIde = $("#txtIdentificacion2").val();
        var strTel = $("#txtTelefono2").val();
        var strTipo = $("#txtTipo2").val();

//cadena que se envia al php
        var dataString = {'nombre': strNom, 'apellido': strApe, 'usuario': strLog, 'contrasena': strPass, 'email': strEma
            , 'telefono': strTel, 'tipo': strTipo, 'identificacion': strIde};

        if (strNom === '') {

            alert("Ingresa tu nombre..");
            $("#txtNombre2").focus();

        } else if (strApe === '') {

            alert("No has ingresado tu apellido :)..");
            $("#txtApellido2").focus();

        } else if (strIde === '') {

            alert("No has ingresado tu Identificacion :)..");
            $("#txtIdentificacion2").focus();

        } else if (strTipo === 'T') {

            alert("No has seleccioando un tipo de usuario :)..");
            $("#txtTipo2").focus();

        } else if (strLog === '') {

            alert("No has ingresado el usuario :)..");
            $("#txtUsuario2").focus();

        } else if (strPass === '') {

            alert("No has ingresado Contraseña :)..");
            $("#txtContrasena2").focus();

        } else if (strEma === '') {

            alert("No has ingresado un email :)..");
            $("#txtEmail2").focus();

        }
        else if (strPass !== strPass2) {

            alert("las contraseñas no coinciden ingresalas de nuevo :)..");
            $("#txtContrasena3").focus();
            $("#txtContrasena3").val('');
            $("#txtContrasena22").val('');

        }
        else {
//esta es una prueba
            $.ajax({
                type: "POST",
                url: "http://refinal.frienderco.com/php/set/setUser.php",
                //url: "../php/set/setUser.php",
                data: dataString,
                dataType: 'json',
                cache: true,
                success: function (jsonResp, html) {

                    if (jsonResp.RESPONSE) {

                        alert(jsonResp.MESSAGE);

                        //limpio los campos
                        //
                        $("#txtNombre2").val('');
                        $("#txtApellido2").val('');
                        $("#txtIdentificacion2").val('');
                        $("#txtUsuario2").val('');
                        $("#txtContrasena3").val('');
                        $("#txtContrasena22").val('');
                        $("#txtEmail2").val('');
                        $("#txtTelefono2").val('');
                        $("#txtTipo2").val('T');

                        var html = "Se guardo Correctamente!";

                        $("#txtRespuesta").html(html);
                        $("#txtRespuesta").focus();
                        getAllUsuarios();

                        if (jsonResp.MESSAGE === "") {

                            alert('XD');

                        } else if (jsonResp.MESSAGE === "EMPTY") {
                            alert("No se encontraron datos");
                        }
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

        return false;
    });
});


