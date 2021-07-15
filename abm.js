//agrega funcion load a HTML; 
addEventListener("load",load);
 
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

    enviarParametrosGET(miBackEnd + "producto/mostrar",mostrarTabla); 


    document.getElementById("btnAgregar").addEventListener("click",click);

}

function completarTabla(respuesta){

        $("mensajeError").innerHTML = respuesta;
    
}

function click(){
    enviarParametrosPOST(miBackEnd + "producto/agregar", respuestaAgregar); 
}


function respuestaAgregar(respuesta){
    var opciones = ['<option value=0>Seleccion una opcion</option>']
    
    //actualiza campos a blanco
    $("txtNewNombre").value = "";
    $("txtNewDesc").value = "";
    $("txtNewPrecio").value = "";
    $("txtNewCategoria").value = "";

    //$("slctNwCategoria").innerHTML = opciones;

    //escribe mensaje
    $("mensajeAgregar").innerHTML = respuesta;
    
}

function cargarOpciones() {
    
    var opciones = ['<option value=0>Seleccione una opcion</option>'
    +'<option value=1>pesas</option>'+'<option value=3>bandas</option>']


    $("slctCategoria").innerHTML = opciones;
}

function clickMostrar(){
    enviarParametrosGET(miBackEnd + "producto/mostrar", mostrarTabla);
}

function respuestaServidor(respuesta){
    alert("llego respuesta");
}


function confirmarBorrar(){

    return confirm('Estás seguro que deseas eliminar el registro?');

}

function mostrarTabla(valor){

    var analizaJSON =JSON.parse(valor); 
    var opciones=[]; 


    analizaJSON.forEach(element => {
        opciones.push('<tr >'+
        '<th scope="row">'+element.nombre+'</th>'+
        '<td>'+element.desc+'</td>'+
        '<td>'+element.precio+'</td>'+
        '<td>'+element.categoria+'</td>'+
        '<td><a href="" class="btn btn-success" >editar</a></td>'+
        '<td><a href="" class="btn btn-danger" onclick="">borrar</a></td>'+
        '</tr>' );
        
    });

    $('tableProducto').innerHTML=opciones;

    /*for(var i=0;i<rta.length; i++){
        $('tableProducto').innerHTML=
        '<tr >'+
        '<th scope="row">'+rta[i].nombre+'</th>'+
        '<td>'+rta[i].desc+'</td>'+
        '<td>'+rta[i].precio+'</td>'+
        '<td>'+rta[i].categoria+'</td>'+
        '<td><a href="" class="btn btn-success" >editar</a></td>'+
        '<td><a href="" class="btn btn-danger" onclick="">borrar</a></td>'+
        '</tr>'; 

    } */


}

function enviarParametrosGET(servidor,funcionARealizar){

    //Declaro el objeto
    var xmlhttp = new XMLHttpRequest();

    //Indico hacia donde va el mensaje
    xmlhttp.open("GET", servidor, true);

    xmlhttp.onreadystatechange = function(){

        if(xmlhttp.readyState == XMLHttpRequest.DONE){

            if(xmlhttp.status == 200){
                //console.log(xmlhttp.responseText);
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
function enviarParametrosPOST(servidor,funcionARealizar){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("nombre",$("txtNewNombre").value);
    datos.append("desc",$("txtNewDesc").value);
    datos.append("precio",$("txtNewPrecio").value);
    datos.append("categoria",$("txtNewCategoria").value);

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
                alert("ocurrio un error al agregar")
            };
        }
    }
    //esto va siempre cuando se hace un formulario
    xmlhttp.setRequestHeader("enctype","multipart/form-data");

    //envio el mensaje 
    xmlhttp.send(datos);
    


}