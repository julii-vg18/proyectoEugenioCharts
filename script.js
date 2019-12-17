//? Cargamos el JSON externo 
loadData();
var meses;
function loadData() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './data.json', true);


    xhr.onload = function () {
        if (this.status == 200) {
            meses = JSON.parse(this.responseText);
            // console.log("Resultados...", meses);
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
function trataDatos(e) {
    console.log(e)
}

