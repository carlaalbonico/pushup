//agrega funcion load a HTML; 
addEventListener("load",load)
 
//variable del servidor
var miBackEnd = '/pushup/backend/';

//DOM
function $(nombre)
{
    return document.getElementById(nombre)
}


function load(){
    //alert(boton)
    document.getElementById("btnGuardar").addEventListener("click",enviarParametrosPOST)
}

function click(event){
    enviarMsjeServidor(miBackEnd, retornoDelClick)
    //se suele mostrar antes de la respuesta del servidor
    alert("despues de la llamada");

}

function retornoDelClick(respuesta){
    alert(respuesta); 

    $("usuario").value=respuesta; 
}

function enviarMsjeServidor(servidor, funcionARealizar){
    
    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //indico hacia donde va el mensaje
    xmlhttp.open ("GET", miBackEnd, true); 

    //seteo el evento
    xmlhttp.onreadystatechange = function(){
        //veo si llego la respuesta del servidor
        if(xmlhttp.readyState==XMLHttpRequest.DONE){
            //reviso si la respuesta del servidor es la correcta
            if(xmlhttp.status==200){
                console.log(xmlhttp.response);
                funcionARealizar(xmlhttp.responseText);

            }else{
                alert("ocurrio un error")
            };
        }
    }

    //envio el mensaje 
    xmlhttp.send();


}

function enviarParametrosPOST(){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("nombre",$("txtNombre").value);
    datos.append("apellido",$("txtApellido").value);
    datos.append("dni",$("txtDni").value);
    datos.append("telefono",$("txtTelefono").value);
    datos.append("correo",$("txtCorreoElectronico").value);
    datos.append("archivo",$("archivo").files[0]);
    

    //indico hacia donde va el mensaje
    xmlhttp.open ("POST", miBackEnd, true); 

    //seteo el evento
    xmlhttp.onreadystatechange = function(){
        //veo si llego la respuesta del servidor
        if(xmlhttp.readyState==XMLHttpRequest.DONE){
            //reviso si la respuesta del servidor es la correcta
            if(xmlhttp.status==200){
                console.log(xmlhttp.response);
                alert(xmlhttp.responseText);

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