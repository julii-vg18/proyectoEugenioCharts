//? Cargamos el JSON externo
var meses = [
  {
    mes: "enero",
    weeks: []
  },
  {
    mes: "febrero",
    weeks: []
  },
  {
    mes: "marzo",
    weeks: []
  }
];

var arraytempmediasemanas = [];
var arraytempmediameses = [];

loadData();

function loadData() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../json/data.json", false);

  xhr.onload = function () {
    if (this.status == 200) {
      var datos = JSON.parse(this.responseText);
      var contador = 0;
      var tempmediatotal = 0;
      var tempsemana = 0;
      var tempmes = 0;
      var tempmesfinal = 0;
      var semana = 1;
      var mes = 1;
      const temperaturamedia = [];
      arraytempmediasemanas = [];
      arraytempmediameses = [];


      datos.forEach(dato => {
        const add = temperaturamedia.push(dato.tmed);
      });

      cargarDatoTempMedia(temperaturamedia);

      function cargarDatoTempMedia(seleccion) {
        for (var i = 0; i < temperaturamedia.length; i++) {
          tempmedia = parseFloat(seleccion[i]);
          if (contador == 7) {
            var tempsemana = 0;
            tempsemana = tempmediatotal / 7;
            const tempmediaporsemanas = arraytempmediasemanas.push(
              tempsemana.toFixed(1)
            );

            tempmes = tempmes + tempsemana;
            if (semana % 4 == 0) {
              tempmesfinal = tempmes / 4;
              const tempmediapormeses = arraytempmediameses.push(
                tempmesfinal.toFixed(1)
              );
              tempmes = 0;
              mes = mes + 1;
            }
            contador = 0;
            semana = semana + 1;
            tempmediatotal = 0;
            tempsemana = 0;
          } else {

            contador = contador + 1;
            tempmediatotal = tempmediatotal + tempmedia;
          }
        }
      }

    }
  };
  xhr.send();
}

/**

                OBTENER MESES SACANDO DEL JSON

*/
const canvas = document.querySelector("#micanvas");
var ctx = canvas.getContext("2d");

tempSem = arraytempmediasemanas;
tempMes = arraytempmediameses;

// var maxTemp = Math.max(arraytempmediameses);
// console.log(tomaxTemp);

function pintarMedidasY() {
  let num = 0;
  let altura = 603;
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.font = "30px";
    ctx.fillStyle = "black";
    ctx.fillText(num, 20, altura);

    ctx.fillRect(45, altura - 4, 5, 2);

    ctx.closePath();
    num = num + 2;
    altura = altura - 50;
  }
}

function pintarMedidasX(num) {
  let ancho = 105;
  let numero = num;

  for (let i = 0; i < numero; i++) {
    for (let j = 0; j < 1; j++) {
      ctx.beginPath();
      ctx.font = "30px";
      ctx.fillStyle = "black";
      //Raul dijo que se pusieran parentesis
      ctx.fillText("Semana " + (i + 1), ancho + 25, 620);

      ctx.fillRect(ancho + 45, 600, 2, 5);

      ctx.closePath();
    }
    ancho = ancho + 150;
  }
}

//Trata los datos de la opcion seleccionadas

var mes;
var semanas;

function pintaBarra(semanas) {
  //?     Comprobamos el numero de semanas que tiene ese mes y dependiendo del
  //? numero de semanas que esta tiene, las separaciones son distintas.

  // Hacemos una llamada a las funciones de pintar los ejes de abscisas y ordenadas
  pintarMedidasY();
  pintarMedidasX(4);

  var cont = 20;

  ctx.beginPath();

  semanas.forEach(e => {
    let sem = e;
    ctx.fillStyle = "red";
    cont = cont + 150;

    //           orX   orY   w    h
    ctx.fillRect(cont, 599, -40, -sem * 25);
  });
  cont = 2000;
  ctx.closePath();
}

function pintaLineas(semanas) {

  pintarMedidasY();
  pintarMedidasX(4);
  var cont = 20;


  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;
  semanas.forEach((sem) => {
    cont = cont + 150;
    ctx.lineTo(cont - 20, (-sem * 25) + 600);
  })
  ctx.stroke();
  ctx.closePath();
  ctx.fillStyle = "#cacaca";
  ctx.fillRect(600, 598, 599, -600);

}



function pintarPastel(semanas) {
 
  canvas.classList.add("pastel")
  var sumatorio = 0; //804
  var ultimoAngulo = 0;
  
  semanas.forEach(semana => {
    console.log("Semana -> " + semana)
    sumatorio = sumatorio + parseFloat(semana); // Suma todos los datos para saber el total del mes y poder dividir el circulo
  });

  var arrayColores = ["red", "green", "blue", "yellow"];
  console.log(arrayColores)
  var color = 0;
  semanas.forEach(semana => {
    ctx.fillStyle = arrayColores[color];
    color++;
    ctx.beginPath();
    ctx.arc(
      250,
      250,
      200,
      ultimoAngulo,
      ultimoAngulo + Math.PI * 2 * (semana / sumatorio),
      false
    );
    ctx.arc(
      250,
      300,
      200,
      ultimoAngulo + Math.PI * 2 * (semana / sumatorio),
      ultimoAngulo,
      true
    );
    ctx.fill();
    ctx.stroke();
    ultimoAngulo += Math.PI * 2 * (semana / sumatorio);    

  });

  console.log(sumatorio)
  color = 0;
  semanas.forEach(semana => {
    ctx.fillStyle = arrayColores[color];
    color++;
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.arc(
      250,
      250,
      200,
      ultimoAngulo,
      ultimoAngulo + Math.PI * 2 * (semana / sumatorio),
      false
    ); // Área de un círculo 2*PI*radio
    ctx.lineTo(250, 250); // Mueve el selector al centro del canvas,
    ctx.fill();
    ultimoAngulo += Math.PI * 2 * (semana / sumatorio);
  });
}
//  FUNCIÓN PARA LIMPIAR EL CANVAS
function limpiarCanvas() {
  ctx.clearRect(51, 599, 599, -600);
  ctx.clearRect(0, 20, 35, 600);
  ctx.clearRect(51, 601, 1000, 100);
}

//  FUNCIÓN PARA PINTAR EJES EN EL CANVAS
function pintarEjes() {
  ctx.beginPath();
  ctx.moveTo(50, 610);
  ctx.lineTo(50, 50);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(40, 600);
  ctx.lineTo(650, 600);
  ctx.closePath();
  ctx.stroke();
}

function vaciarCanvasConEjes() {
  //Limpia Canvas
  ctx.clearRect(51, 599, 599, -600);
  //Limpia Ordenadas
  ctx.clearRect(0, 20, 35, 600);
  //Limpia Abscisas
  ctx.clearRect(51, 601, 1000, 100);
}

function vaciarCanvasTotal() {
  //Vacia el canvas al completo, con ejes incluidos
  ctx.clearRect(0, 0, 1000, 1000)
}

//  FUNCIÓN PARA LEER EL MES SELECCIONADO
const selectorMeses = document.getElementById("listaMeses");
const leyenda = document.getElementById("leyenda");

pintarGrafica("barras", "enero");

var tipoActual, mesActual;

function leerMes() {
  mes = selectorMeses.options[selectorMeses.selectedIndex].value;
  console.log("Mes seleccionado --> " + mes);
  return mes;
}

selectorMeses.addEventListener("change", function () {
  leerMes();
  pintarGrafica(tipoSeleccionado(), leerMes())
});

//  FUNCIÓN PARA LEER EL TIPO DE GRÁFICA SELECCIONADA
const selectorTipo = document.querySelectorAll('[name="tipoGrafica"]');
selectorTipo[0].checked = true;

selectorTipo.forEach((tipo) => {
  tipo.addEventListener('change', tipoSeleccionado);
})

function tipoSeleccionado() {
  // IMPLEMENTAR UN LECTOR DEL TIPO PARA QUE CUANDO CAMBIE, SE LEA
  if (this.checked == true) {
    tipoActual = this.id;
  }
  console.log("Tipo actual -> " + tipoActual);
  pintarGrafica(tipoActual, leerMes())
}



//  FUNCIÓN PARA OBTENER UN ARRAY DE 4 VALORES CORRESPONDIENTES A LAS TEMPERATURAS MEDIAS SEMANALES DE UN MES CONCRETO (SUPONIENDO QUE 1 MES TIENE 4 SEMANAS)
var arrayDatos = [];
function obtenerArrayDatos(mes) {
  arrayDatos = [];
  
  switch (mes) {
    case "enero":
      //Seleccionamos el mes 0 = ENERO
      mes = meses[0];
      console.log(mes);
      mes.weeks = [];
      for (let i = 0; i <= 3; i++) {
        console.log("Numero " + arraytempmediasemanas[i]);
        mes.weeks.push(arraytempmediasemanas[i]);
      }
      arrayDatos = mes.weeks;
      break;

    case "febrero":
      mes = meses[1];
      console.log(mes);
      mes.weeks = [];
      for (let i = 4; i <= 7; i++) {
        console.log("Numero " + arraytempmediasemanas[i]);
        mes.weeks.push(arraytempmediasemanas[i]);
      }
      arrayDatos = mes.weeks;
      break;

    case "marzo":
      mes = meses[2];
      console.log(mes);
      mes.weeks = [];
      for (let i = 8; i <= 11; i++) {
        console.log("Numero " + arraytempmediasemanas[i]);
        mes.weeks.push(arraytempmediasemanas[i]);
      }
      arrayDatos = mes.weeks;
      break;

    default:
      console.log("Error de seleccion de gráfica");
      break;
  }

  console.log("Array de datos " + arrayDatos);
  return arrayDatos;
}

//  FUNCIÓN PARA PINTAR CUALQUIER TIPO DE GRÁFICA PASANDOLE EL TIPO Y EL MES (TENER EN CUENTA QUE arrayDatos ES LO MISMO QUE LA VARIABLE ANTIGUA semanas)
function pintarGrafica(tipo, mes) {
  var arrayDatos = obtenerArrayDatos(mes);
  
  console.log("Se han borrado los ejes y eliminado las devormaciones del canvas")

  switch (tipo) {
    case "barras":
      vaciarCanvasConEjes();
      canvas.classList.remove("pastel")
      leyenda.classList.remove("active");
      pintarEjes();
      pintaBarra(arrayDatos);
      break;

    case "lineas":
      vaciarCanvasConEjes();
      canvas.classList.remove("pastel")
      leyenda.classList.remove("active");
      pintarEjes();
      pintaLineas(arrayDatos);
      break;

    case "pastel":
      vaciarCanvasTotal();
      leyenda.classList.add("active");
      pintarPastel(arrayDatos);
      break;

    default:
      break;
  }
}