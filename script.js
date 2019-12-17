//? Cargamos el JSON externo 
var meses;
loadData();

function loadData() {
    var xhr = new XMLHttpRequest();

    //Dependiendo del true o false la llamada de AJAX es asincrona o sincrona

    xhr.open('GET', './data.json', false);

    xhr.onload = function() {
        if (this.status == 200) {
            meses = JSON.parse(this.responseText);

        }
    }
    xhr.send();
}

const canvas = document.querySelector('#micanvas');
var ctx = canvas.getContext('2d');

//*      EJES

pintarEjes();

function pintarEjes() {

    //! Ordenadas
    ctx.beginPath();
    ctx.moveTo(50, 610)
    ctx.lineTo(50, 50);
    ctx.closePath();
    ctx.stroke();

    //! Abscisas
    ctx.beginPath();
    ctx.moveTo(40, 600)
    ctx.lineTo(650, 600);
    ctx.closePath();
    ctx.stroke();
}


//? Control de seleccion de mes 
const seleccion = document.querySelector("[name ='selecMes']");

//Controla la selecciopn inicial, que siempre es enero
trataDatos(seleccion.options[seleccion.selectedIndex].value);

//Toma datos de la pagina cuando esta seleccion es acutalizada.
seleccion.addEventListener('change', function() {
    var e = seleccion;
    var selected = e.options[e.selectedIndex].value;
    trataDatos(selected)
});

//Trata los datos de la opcion seleccionadas

var mes;
var semanas;

function trataDatos(e) {
    //? Dependiendo del mes, este toma unos valores u otros
    console.log('Ha selecionado el mes: ' + e)
    if (e == "enero") {
        mes = meses[0];
        semanas = mes.semanas;
        console.log(semanas)
    } else if (e == "febrero") {
        mes = meses[1];
        semanas = mes.semanas;
        console.log(semanas)
    } else {
        mes = meses[2];
        semanas = mes.semanas;
        console.log(semanas)
    }
}