

$(function () {
    $(".submit_button").click(function () {


        var strNom = $("#txtNombre").val();
        var strApe = $("#txtApellido").val();
        var strLog = $("#txtUsuario").val();
        var strPass = $("#txtContrasena").val();
        var strPass2 = $("#txtContrasena2").val();
        var strEma = $("#txtEmail").val();
        var strIde = $("#txtIdentificacion").val();
        var strTel = $("#txtTelefono").val();
        var strTipo = $("#txtTipo").val();
        
        
        

//
//        //var strGen = $("#radioGenero").val();
//        //var strGen = $('input:radio[name=radioGenero]:checked').val();
//
//
//        var dataString = {'nombre': strNom, 'apellido': strApe, 'usuario': strLog, 'contrasena': strPass, 'email': strEma
//            , 'telefono': strTel, 'tipo': strTipo, 'identificacion': strIde};
//        if (strNom === '') {
//
//            alert("Ingresa tu nombre..");
//            $("#txtNombre").focus();
//
//        } else if (strApe === '') {
//
//            alert("No has ingresado tu apellido :)..");
//            $("#txtApellido").focus();
//
//        } else if (strIde === '') {
//
//            alert("No has ingresado tu Identificacion :)..");
//            $("#txtIdentificacion").focus();
//
//        } else if (strTipo === 'T') {
//
//            alert("No has seleccioando un tipo de usuario :)..");
//            $("#txtTipo").focus();
//
//        } else if (strLog === '') {
//
//            alert("No has ingresado el usuario :)..");
//            $("#txtUsuario").focus();
//
//        } else if (strPass === '') {
//
//            alert("No has ingresado Contraseña :)..");
//            $("#txtContrasena").focus();
//
//        } else if (strEma === '') {
//
//            alert("No has ingresado un email :)..");
//            $("#txtEmail").focus();
//
//        }
//        else if (strPass !== strPass2) {
//
//            alert("las contraseñas no coinciden ingresalas de nuevo :)..");
//            $("#txtContrasena").focus();
//            $("#txtContrasena").val('');
//            $("#txtContrasena2").val('');
//
//        }
//        else
//        {
////esta es una prueba
//            $.ajax({
//                type: "POST",
//                url: "http://refinal.frienderco.com/php/set/setUser.php",
//                //url: "../php/set/setUser.php",
//                data: dataString,
//                dataType: 'json',
//                cache: true,
//                success: function (jsonResp, html) {
//
//
//                    if (jsonResp.RESPONSE) {
//
//                        alert(jsonResp.MESSAGE);
//
//                        //limpio los campos
//                        //
//                        $("#txtNombre").val('');
//                        $("#txtApellido").val('');
//                        $("#txtIdentificacion").val('');
//                        $("#txtUsuario").val('');
//                        $("#txtContrasena").val('');
//                        $("#txtContrasena2").val('');
//                        $("#txtEmail").val('');
//                        $("#txtTelefono").val('');
//                        $("#txtTipo").val('T');
//
//                        var html = "Se guardo Correctamente!";
//
//                        $("#txtRespuesta").html(html);
//                        $("#txtRespuesta").focus();
//
//
//
//                        if (jsonResp.MESSAGE === "") {
//
//                            alert('XD');
//
//                        } else if (jsonResp.MESSAGE === "EMPTY") {
//                            alert("No se encontraron datos");
//                        }
//                    } else {
//                        alert("Ocurrio Un error:" + jsonResp.MESSAGE);
//                    }
//
//                }
//                ,
//                error: function (jsonResp) {
//                    alert("Ocurrio Un error Diferente");
//                }
//            });
//        }
//        return false;
    });
});