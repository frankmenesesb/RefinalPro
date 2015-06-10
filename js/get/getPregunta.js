





function mostrarPreguntas() {


    var id = '';
    var descripcion = "";
    var z = 0;
    var strLog = "admon";
    var zArray = new Array();
    var idArray = new Array();
    var html = '<ul class="list-group">';
    html += '<li class="list-group-item">';



    if (strLog === '') {

        alert("No has ingresado el usuario :)..");


    } else
    {
        $.ajax({
            type: 'POST',
            async: false,
            //data: dataString,
            dataType: 'json',
            url: "../php/get/getPregunta.php",
            success: function (jsonResp) {

                if (jsonResp.RESPONSE) {



                    if (jsonResp.MESSAGE === "") {


                        


                        for (var i = 0; i < jsonResp.DATA.length; i++) {


                            z = z + 1;



                            id = jsonResp.DATA[i]["idpreguntas"];

                            descripcion = jsonResp.DATA[i]["descripcion"];

                            if ((descripcion === null || descripcion === "")) {

                                alert("Error: citas invalidas ");

                            } else {
                                
                               // html += '<ul class="list-group" >';
                               // html += '<li class="list-group-item">';
                                html += '<label>' + id + ' ' + descripcion + '</label>';
                               // html += '</li>';
                                //html += '</ul>';
                                
                                html += '<ul class="list-group" id="radio' + z + '">';
//                                
//                                //html += '<legend><b>' + id + ' ' + descripcion + '</b></legend>';
//                                //html += '<form id="radio' + z + '" data-theme="b">';
// 
//                                //html += '</form>';
                                html +='</ul>';
                                //html += '</div>';

//                                zArray[i]=z;
//                                idArray[i]=id;
                                zArray.push(z);
                                idArray.push(id);
                            }



//                       for (var u = 0; u < miArray.length; u++) {
//                            
                            //mostrarRPreguntas(z,id);
//                        }
                        }
                        html += '</li></ul>';
                        $("#notasdatos").html(html);

                        for (var u = 0; u < zArray.length; u++) {
                            mostrarRPreguntas(zArray[u], idArray[u]);
                            //alert(zArray[u]+idArray[u]);
                        }
                        //mostrarRPreguntas(z,id);  


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

