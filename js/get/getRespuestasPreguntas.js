





function mostrarRPreguntas(y, idr) {
    

    var id = '';
    var descripcion = "";
    var z = y;
    var radio = "#radio" + z;
    var u = 0;
    var strLog = "admon";

    //alert(''+idr+' '+radio);

    var dataString = {'id': idr, 'usuario': strLog};

    if (strLog === '') {

        alert("No has ingresado el usuario :)..");


    } else
    {
        $.ajax({
            type: 'POST',
            async: false,
            data: dataString,
            dataType: 'json',
            url: "../php/get/getRespuestas.php",
            success: function (jsonResp) {

                if (jsonResp.RESPONSE) {



                    if (jsonResp.MESSAGE === "") {


                        var html = '';


                        for (var i = 0; i < jsonResp.DATA.length; i++) {



                            u = u + 1;


                            id = jsonResp.DATA[i]["idpreguntas"];

                            descripcion = jsonResp.DATA[i]["descripcion"];

                            if ((descripcion === null || descripcion === "")) {

                                alert("Error: citas invalidas ");

                            } else {


                                if (i === 0) {
                                    html += '<li class="list-group-item">';
                                    html += '<div class="radio">';
                                    html += '<label for="radio-choice-0' + z + u + '">';
                                     html += '<input type="radio" name="radio-choice-0' + z + '" id="radio-choice-0' + z + u + '" checked="checked">';
                                    html+=descripcion + '</label>';
                                    html += '</div>';
                                    html += '</li>';

                                } else {
                                    html += '<li class="list-group-item">';
                                    html += '<div class="radio">';
                                     html += '<label for="radio-choice-0' + z + u + '" >';
                                     html += '<input type="radio" name="radio-choice-0' + z + '" id="radio-choice-0' + z + u + '">';
                                    html+=descripcion + '</label>';
                                    html += '</div>';
                                    html += '</li>';

                                }


                            }



//                       for (var u = 0; u < miArray.length; u++) {
//                            
//                           mostrarCitasUsuarios(miArray[u], miArray2[u]); 
//                        }
                        }
                        
                        //alert('' + radio);
                        $(radio).html(html);
                    } else if (jsonResp.MESSAGE === "EMPTY") {
                        alert("Error: no se encontro datos de registro del usuario!!");
                    }
                } else {
                    alert("Ocurrio Un error:" + jsonResp.MESSAGE);
                }


            },
            error: function (jsonResp) {
                alert("Ocurrio Un error, Json no responde");
            }
        });
    }



}

