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

    //cargarOpciones(); 

    enviarParametrosGET(miBackEnd + "producto/mostrar",mostrarTabla); 


    document.getElementById("btnAgregar").addEventListener("click",click);

}

function completarTabla(respuesta){

        $("mensajeError").innerHTML = respuesta;
    
}

function click(){
    enviarParametrosPOST(miBackEnd + "producto/agregar", respuestaAgregar); 
    enviarParametrosGET(miBackEnd + "producto/mostrar",mostrarTabla); 
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
    //era para clasificar por categorias
    var opciones = ['<option value=0>Seleccione una opcion</option>'
    +'<option value=1>pesas</option>'+'<option value=3>bandas</option>']


    $("slctCategoria").innerHTML = opciones;
}

function clickMostrar(){
    //esto es para cuando hago una seleccion en el select
    enviarParametrosGET(miBackEnd + "producto/mostrar", mostrarTabla);
}




function confirmarBorrar(){
    //esta era una confirmacion para borrar
    return confirm('Estás seguro que deseas eliminar el registro?');

}

function mostrarTabla(valor){

   
    var analiza =JSON.parse(valor); 
    console.log(analiza); 

    var opciones=[]; 


    analiza.forEach(element => {
        opciones.push('<tr >'+
        '<th scope="row">'+element.nombre+'</th>'+
        '<td>'+element.descrip+'</td>'+
        '<td>'+element.precio+'</td>'+
        '<td>'+element.categoria+'</td>'+
        /*'<td><a href="" class="btn btn-success" >editar</a></td>'+
        '<td><a href="" class="btn btn-danger" onclick="">borrar</a></td>'+*/
        '</tr>' );
        //era para agregar boton de borrar y modificar
    });

    $('tableProducto').innerHTML=opciones;
    


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
    datos.append("descrip",$("txtNewDesc").value);
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