/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function buscar(){
    var operacion = $('input:radio[name=optradio]:checked').val();

if (operacion ==='M'){

        //variables de entrada
        var strIde = $("#txtIdentificacion").val();
        
        //variables locales

        var id;
        var nombre;
        var apellido;
        var login;
        var telefono;
        var identificacion;
        var email;
        var tipo;
        var password;
        var log = "";
        var html;

        

        
            $.ajax({
                type: 'POST',
                //data: dataString,
                dataType: 'json',
                
                url: "http://refinal.frienderco.com/php/get/getUserAll.php",
                //url: "../php/get/getUser.php",
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
                                password = jsonResp.DATA[i]["password"];
                                

                                var log = "";
                                if ((nombre === null || nombre === "") || (id === null || id === "")) {

                                    alert("Error: usuario y contraseña invalidos ");

                                } else {

                                     html += '<option value="'+identificacion+'">'+nombre+' '+apellido+'</option>';
                                }
                            }
                            $("#nombres").html(html);
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

