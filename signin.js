//agrega funcion load a HTML; 
addEventListener("load",load)


// aca llega con "https://localhost:8080/Registro/Nuevo" por POST
 
//variable del servidor
var miBackEnd = "https://apppushup.herokuapp.com/";
//var miBackEnd = "https://localhost:8880/";

//DOM
function $(nombre)
{
    return document.getElementById(nombre)
}


function load(){
    document.getElementById("btnLogin").addEventListener("click",clickLogin); 
    //alert(boton)
    document.getElementById("btnGuardar").addEventListener("click",click);

    
}


function clickLogin(){
    window.location.assign("https://tiendapushup.herokuapp.com/login.html");
}

function click(){
    enviarParametrosPOST(miBackEnd + "signin/enviar", respuestaServidor);
}

function respuestaServidor(respuesta){
    //actualiza campos a blanco
    $("txtNewUser").value = "";
    $("txtNewPass").value = "";
    //escribe mensaje
    $("mensaje").innerHTML = respuesta;
    
}




function enviarParametrosPOST(servidor,funcionARealizar){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("user",$("txtNewUser").value);
    datos.append("pass",$("txtNewPass").value);

    //datos.append("archivo",$("archivo").files[0]);
    

    //indico hacia donde va el mensaje
    xmlhttp.open ("POST", servidor, true); 

    //seteo el evento
    xmlhttp.onreadystatechange = function(){
        //veo si llego la respuesta del servidor
        if(xmlhttp.readyState==XMLHttpRequest.DONE){
            //reviso si la respuesta del servidor es la correcta
            if(xmlhttp.status==200){
                
                funcionARealizar(xmlhttp.responseText);

            }else{
                alert("ocurrio un errorcwewe3")
            };
        }
    }
    //esto va siempre cuando se hace un formulario
    xmlhttp.setRequestHeader("enctype","multipart/form-data");

    //envio el mensaje 
    xmlhttp.send(datos);
    


}