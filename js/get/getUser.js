/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(function() {
    $(".submit_button").click(function() {
    
    
        
        var strLog = $("#txtUsuario").val();
        var strPass = $("#txtContrasena").val();
        
        
        var dataString = {'usuario': strLog, 'contrasena': strPass};
    
    if (strLog === '' ) {

            alert("No has ingresado el usuario :)..");
            $("#txtUsuario").focus();

        }else if (strPass === '' ) {

            alert("No has ingresado Contraseña :)..");
            $("#txtContrasena").focus();

        }else
        {
        $.ajax({
            type:'POST',
            data:dataString,
            dataType:'json',
            url: "../phpGet/getUser.php",
            success:function(jsonResp){
                
                if(jsonResp.RESPONSE){
                    
                    
                    if(jsonResp.MESSAGE === "undefined" || jsonResp.MESSAGE ===undefined) {
                        
                        alert('Error Usuario no registrado!!');
                    }
                    if(jsonResp.MESSAGE === ""){
                        
                        
                        
                        for(var i=0;i<jsonResp.DATA.length;i++){
                            
                            
                           
                            
                            var id=jsonResp.DATA[i]["id"];
                            var nombre=jsonResp.DATA[i]["nombre"];
                            var apellido=jsonResp.DATA[i]["apellidos"];
                            var login=jsonResp.DATA[i]["login"];
                            var foto=jsonResp.DATA[i]["foto"];
                            var sexo=jsonResp.DATA[i]["genero"];
                            var log="";
                            if( (nombre===null || nombre==="")  || (id===null || id==="")){ 
                            
                            alert("Error: usuario y contraseña invalidos ");
                           
                            }else{
                            
                           location.href = '../frm/frmMain.html?var='+nombre+'$'+apellido+'*'+login+"!&"+foto+"@"+sexo+":";
                           
                           
                        }
                        }
                        
                        //$("#txtHint").html(encabezado+html+final);
                        
                    }else if(jsonResp.MESSAGE === "EMPTY"){
                        alert("Error: no se encontro datos de registro del usuario!!");
                    }
                }else{
                    alert("Ocurrio Un error:"+jsonResp.MESSAGE);
                }
                
                
            },
            error:function(jsonResp){
                alert("Ocurrio Un error");
            }
        });
    }
    
     });
    
});

