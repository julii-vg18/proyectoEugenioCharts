//? Cargamos el JSON externo /
loadData();
function loadData() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './data.json', true);


    xhr.onload = function () {
        if (this.status == 200) {
            var meses = JSON.parse(this.responseText);
            console.log("Resultados...", meses);
        }
    }
    xhr.send();
}


const canvas = document.querySelector('#micanvas');
var ctx = canvas.getContext('2d');


//      EJES
pintarEjes();
function pintarEjes() {

    //Ordenadas
    ctx.beginPath();
    ctx.moveTo(50, 610)
    ctx.lineTo(50, 50);
    ctx.closePath();
    ctx.stroke();

    //Abscisas
    ctx.beginPath();
    ctx.moveTo(40, 600)
    ctx.lineTo(650, 600);
    ctx.closePath();
    ctx.stroke();
}

//Control de seleccion de mes

const seleccion = document.querySelector("[name ='selecMes']");
console.log('Has seleccionado:' + seleccion.value)
seleccion.addEventListener('change', function () {
    console.log('Has seleccionado:' + seleccion.value)
})

