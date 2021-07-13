//agrega funcion load a HTML; 
addEventListener("load",load)
 
//variable del servidor Heroku
var miBackEnd = "https://apppushup.herokuapp.com/";
//var miBackEnd = "https://localhost:8880/";


//DOM
function $(nombre)
{
    return document.getElementById(nombre);
}


function load(){
    //alert(boton)
    document.getElementById("btnLogin").addEventListener("click",clickLogin); 
    
    document.getElementById("btnSignin").addEventListener("click",clickSignin);

    document.getElementById("btnProd").addEventListener("click",clickAbm);
}

function clickLogin(){
    window.location.assign("https://tiendapushup.herokuapp.com/login.html");
}
function clickSignin(){
    window.location.assign("https://tiendapushup.herokuapp.com/signin.html");
}

function clickAbm(){
    window.location.assign("https://tiendapushup.herokuapp.com/abm.html");
}
function completarTabla(respuesta){

   
        $("mensajeError").innerHTML = respuesta;
    
}

function confirmarBorrar(){

    return confirm('Estás seguro que deseas eliminar el registro?');

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