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
    vaciarCanvas()
    trataDatos(selected)

});

//Trata los datos de la opcion seleccionadas

var mes;
var semanas;

function trataDatos(e) {
    let color;
    //? Dependiendo del mes, este toma unos valores u otros
    console.log('Ha selecionado el mes: ' + e)
    if (e == "enero") {
        color = 'red';
        mes = meses[0];
        semanas = mes.semanas;
        pintaBarra(semanas, color)
        console.log(semanas)
    } else if (e == "febrero") {
        color = 'green';
        mes = meses[1];
        semanas = mes.semanas;
        pintaBarra(semanas, color);
        console.log(semanas);
    } else {
        color = 'blue';
        mes = meses[2];
        semanas = mes.semanas;
        pintaBarra(semanas, color);
        console.log(semanas)
    }
<<<<<<< HEAD
}

function pintaBarra(semanas, color) {
    if (semanas.length = 4) {
        let cont = 20
        ctx.beginPath();

        semanas.forEach((e) => {
            let sab = e.sab;
            let dom = e.dom;
            ctx.fillStyle = color;
            cont = cont + 100
            //          orX    orY  w    h
            ctx.fillRect(cont, 599, -40, -sab);
            cont = cont + 50;
            ctx.fillRect(cont, 599, -40, -dom);
        });
        ctx.closePath()

    } else if (semanas.length = 5) {

    }
}

function vaciarCanvas() {
    ctx.clearRect(51, 599, 599, -600);
}
||||||| merged common ancestors
}
=======
}
>>>>>>> ad82d6f7f0236a2286777d476cf169804ebbfbb3
