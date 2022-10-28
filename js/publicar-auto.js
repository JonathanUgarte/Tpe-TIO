
/*Constante URL*/
const URL = 'https://62be06b3bac21839b60f096c.mockapi.io/api/autos';

//Escuchas Botones//


document.querySelector("#btn-agregar1").addEventListener("click", agregar1);
document.querySelector("#btn-agregar3").addEventListener("click", agregar3);
document.querySelector("#btn-vaciar").addEventListener("click", vaciar);


//Funcion Mostrar tabla

function tabla(packAutos){
  let tablaVentaAuto=document.querySelector("#tablaVender");

  let nodoFila  = document.createElement("tr");
  let nodoCelda = document.createElement("td");
  let nodoText = document.createTextNode (packAutos.modelo);

  nodoCelda.appendChild(nodoText);
  nodoFila.appendChild(nodoCelda);

  nodoText = document.createTextNode(packAutos.tipo);
  nodoCelda= document.createElement("td");
  nodoCelda.appendChild(nodoText);
  nodoFila.appendChild(nodoCelda);

  nodoText = document.createTextNode(packAutos.km);
  nodoCelda= document.createElement("td");
  nodoCelda.appendChild(nodoText);
  nodoFila.appendChild(nodoCelda);


  nodoText = document.createTextNode(packAutos.color);
  nodoCelda= document.createElement("td");
  nodoCelda.appendChild(nodoText);
  nodoFila.appendChild(nodoCelda);


let btnEditar = document.createElement("button");
btnEditar.innerHTML="Editar";
btnEditar.setAttribute("data-id",packAutos.id);
btnEditar.onclick = Editar;


let btnGuardar = document.createElement("button");
btnGuardar.innerHTML="Guardar";
btnGuardar.setAttribute("data-id",packAutos.id);
btnGuardar.onclick = Guardar;


let btnBorrar= document.createElement("button");
btnBorrar.innerHTML="Borrar";
btnBorrar.setAttribute("data-id",packAutos.id);
btnBorrar.onclick = Borrar;


  nodoFila.appendChild(nodoCelda);
  tablaVentaAuto.appendChild(nodoFila);
  nodoFila.appendChild(btnGuardar);
  nodoFila.appendChild(btnEditar);
  nodoFila.appendChild(btnBorrar);

}



/* Funcion Obtener datos de la API*/
async function ObtenerDatos(){
  try{ 
    let res = await fetch(URL);
    let json = await res.json();
    for(const item of json){
      tabla(item);
    }

  }
  catch(error){
    console.log (error);

  }
}
ObtenerDatos();



//Vaciar Tabla
function vaciar(){
  let tablaVentaAuto = document.querySelector("#tablaVender");

  while(packAutos.length > 0){
    packAutos.pop();
    tablaVentaAuto.deleteRow(1);
 }

} 



/* Enviar Datos*/
async function traerDatos(packAutos){
  try{
    let res = await fetch (URL, {
      "method" : "POST",
      "headers" : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(packAutos)

    });
    if (res.status == 201){
      console.log("Creado con Exito");
    }
    else tabla(packAutos);
  }
  catch (error){
    console.log(error);
  }

} 

function Editar(event){
let tablaVentaAuto = document.getElementById('tablaVender');
let rowIndex = event.target.parentNode.rowIndex;
let fila = tablaVentaAuto.children[rowIndex];
for(let i = 0 ; i < 4 ; i++){
  let valor = fila.cells[i].innerHTML;
  fila.cells[i].innerHTML = `<input type='text' value = '${valor}' />`;
}
}



async function actualizarCambiosAPI(packAutos, idAuto){
  try{
    let res = await fetch (`${URL}/${idAuto}`, {  
      "method" : "PUT",
      "headers" : {"Content-Type" : "application/json"},
      "body" : JSON.stringify(packAutos)
    });
    if (res.status == 201){
      console.log("Actualizado");
    }
  }catch (error){
    console.log("error");
  }
}



function Guardar (event){
  let idAuto= event.target.getAttribute("data-id");

  /* Agarrar valor de la celda y guardarlos en un json*/
  
  let tablaVentaAuto = document.getElementById('tablaVender');
  let rowIndex = event.target.parentNode.rowIndex;
  let fila = tablaVentaAuto.children[rowIndex];

  let packAutos = { 
  modelo: fila.cells[0].firstChild.value,
  tipo: fila.cells[1].firstChild.value,
  km: fila.cells[2].firstChild.value,
  color: fila.cells[3].firstChild.value,
}
/* ENVIAR A LA API MEDIANTE UN PUT*/

actualizarCambiosAPI(packAutos , idAuto);


/*Tranformar INPUT a TD*/
fila.cells[0].innerHTML =`<td>${packAutos.modelo}</td>`
fila.cells[1].innerHTML =`<td>${packAutos.tipo}</td>`
fila.cells[2].innerHTML =`<td>${packAutos.km}</td>`
fila.cells[3].innerHTML =`<td>${packAutos.color}</td>`

}


async function BorrarProductoAPI(idAuto){
  try{
    let res = await fetch (`${URL}/${idAuto}`, {  
      "method" : "DELETE"
    });
    if(res.status === 201){
      console.log("Borrado");
    }    
    return res.status;

  }catch(error){
    console.log("error");
  }
}

function Borrar(event){
  let tablaVentaAuto = document.getElementById('tablaVender');
  let rowIndex = event.target.parentNode.rowIndex;
  let idAuto = event.target.getAttribute("data-id");

  let res = BorrarProductoAPI(idAuto).then(res => {
    if(res == 200) tablaVentaAuto.removeChild(tablaVentaAuto.children[rowIndex]);
  });
}



/*inicializarTabla();*/

function agregar1 (){
  let modelo = document.querySelector("#modelo").value;
  let tipo = document.querySelector("#tipo").value;
  let km = document.querySelector("#km").value;
  let color = document.querySelector("#color").value;

  let nuevoAuto = { 
    modelo: modelo,
    tipo: tipo,
    km: km,
    color: color,
  }

tabla(nuevoAuto);

}

function agregar3 (){
    let modelo = document.querySelector("#modelo").value;
    let tipo = document.querySelector("#tipo").value;
    let km = document.querySelector("#km").value;
    let color = document.querySelector("#color").value;
   
  
  let nuevoAuto = {
     modelo:modelo,
     tipo:tipo,
     km:km,
     color:color,
     
  }

  for(let i = 0; i < 3; i++){
    tabla(nuevoAuto);
    
  }
 
  }
  







