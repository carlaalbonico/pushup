//agrega funcion load a HTML; 
addEventListener("load",load)
 
//variable del servidor Heroku
//var miBackEnd = "https://apppushup.herokuapp.com/";
var miBackEnd = "http://localhost:8080/";


//DOM
function $(nombre)
{
    return document.getElementById(nombre);
}


function load(){
    //alert(boton)
    document.getElementById("btnEnviar").addEventListener("click",click)
}

function click(){
    enviarParametrosPOST(miBackEnd,respuestadelServidor)
}


function respuestadelServidor(respuesta){

    if(respuesta == "Acceso correcto"){
        window.location.assign(miBackEnd + "index.html");
    }
    else{
        
        $("mensajeError").innerHTML = respuesta;
    }
}


function enviarParametrosGET(servidor, funcionARealizar){

    //Declaro el objeto
    var xmlhttp = new XMLHttpRequest();

    //Indico hacia donde va el mensaje
    xmlhttp.open("GET", servidor, true);

    xmlhttp.onreadystatechange = function(){

        if(xmlhttp.readyState == XMLHttpRequest.DONE){

            if(xmlhttp.status == 200){
                funcionARealizar(xmlhttp.responseText);
            }
            else{
                alert("Ocurrio un error");
            }
        }
    }
    //Envio el mensaje
    xmlhttp.send();
}

//ok
function enviarParametrosPOST(servidor, funcionARealizar){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("user",$("txtUser").value);
    datos.append("pass",$("txtPass").value);

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
                alert("ocurrio un error");
            };
        }
    }
    //esto va siempre cuando se hace un formulario
    xmlhttp.setRequestHeader("enctype","multipart/form-data");

    //envio el mensaje 
    xmlhttp.send(datos);
    


}