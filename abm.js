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

    cargarOpciones(); 

    enviarParametrosGET(miBackEnd + "/producto"); 

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


function cargarOpciones() {
    
    var opciones = ['<option value=0>Seleccion una opcion</option>']


    $("slctCategria").innerHTML = opciones;
}

function click(){
    enviarParametrosGET(miBackEnd + "/producto", respuestaServidor);
}

function respuestaServidor(respuesta){
    alert("llego respuesta");
}


function confirmarBorrar(){

    return confirm('Estás seguro que deseas eliminar el registro?');

}

function mostrarTabla(rta){

    for(var i=0;i<rta.length; i++){
        $('tableProducto').innerHTML=
        '<tr >'+
        '<th scope="row">'+rta[i].nombre+'</th>'+
        '<td>'+rta[i].desc+'</td>'+
        '<td>'+rta[i].precio+'</td>'+
        
        '<td><a href="" class="btn btn-success" >editar</a></td>'+
        '<td><a href="" class="btn btn-danger" onclick="">borrar</a></td>'+
        '</tr>'; 

    } 


}

function enviarParametrosGET(servidor){

    //Declaro el objeto
    var xmlhttp = new XMLHttpRequest();

    //Indico hacia donde va el mensaje
    xmlhttp.open("GET", servidor, true);

    xmlhttp.onreadystatechange = function(){

        if(xmlhttp.readyState == XMLHttpRequest.DONE){

            if(xmlhttp.status == 200){
                console.log(xmlhttp.responseText);
                //funcionARealizar(xmlhttp.responseText);
            }
            else{
                alert("Ocurrio un error");
            }
        }
    }
    //Envio el mensaje
    xmlhttp.send();
}