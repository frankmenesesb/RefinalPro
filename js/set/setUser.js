

$(function() {
    $(".submit_button").click(function() {
        
        
        var strNom = $("#txtNombre").val();
        var strApe = $("#txtApellido").val();
        var strLog = $("#txtUsuario").val();
        var strPass = $("#txtContrasena").val();
        var strPass2 = $("#txtContrasena2").val();
        var strEma = $("#txtEmail").val();
       
        var strTel = $("#txtTelefono").val();
        var strTipo = $("#txtTipo").val();
        
        
        //var strGen = $("#radioGenero").val();
        //var strGen = $('input:radio[name=radioGenero]:checked').val();
        
        
        var dataString = {'nombre': strNom, 'apellido': strApe, 'usuario': strLog, 'contrasena': strPass, 'email': strEma
        , 'telefono': strTel};
        if (strNom === '') {

            alert("Ingresa tu nombre..");
            $("#txtNombre").focus();

        } else if (strApe === '' ) {

            alert("No has ingresado tu apellido :)..");
            $("#txtApellido").focus();

        }else if (strLog === '' ) {

            alert("No has ingresado el usuario :)..");
            $("#txtUsuario").focus();

        }else if (strPass === '' ) {

            alert("No has ingresado Contraseña :)..");
            $("#txtContrasena").focus();

        }else if (strEma === '' ) {

            alert("No has ingresado un email :)..");
            $("#txtEmail").focus();

        }
        else if (strPass !== strPass2) {

            alert("las contraseñas no coinciden ingresalas de nuevo :)..");
            $("#txtContrasena").focus();
            $("#txtContrasena").val('');
            $("#txtContrasena2").val('');

        }
        else
        {
            
            $.ajax({
                type: "POST",
                url: "../phpSet/regis_user.php",
                data: dataString,
                dataType: 'json',
                cache: true,
                success: function(jsonResp, html) {


                    
                    document.getElementById('txtNombre').value = '';
                    
                    

                    if (jsonResp.RESPONSE) {

                        alert(jsonResp.MESSAGE);
                        llevar();
                        
                        
                    document.getElementById('txtNombre').value = '';
                    

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
                error: function(jsonResp) {
                    alert("Ocurrio Un error Diferente");
                }
            });
        }
        return false;
    });
});