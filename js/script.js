//? Cargamos el JSON externo 
var meses;
loadData();

function loadData() {
    var xhr = new XMLHttpRequest();

    //Dependiendo del true o false la llamada de AJAX es asincrona o sincrona

    xhr.open('GET', '../json/data.json', false);

    xhr.onload = function () {
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

function pintarMedidasY() {

    let num = 0;
    let altura = 603;
    for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.font = '30px';
        ctx.fillStyle = 'black';
        ctx.fillText(num, 20, altura);

        ctx.fillRect(45, altura - 4, 5, 2)

        ctx.closePath();
        num = num + 1;
        altura = altura - 50;
    }
}

function pintarMedidasX(num) {

    let ancho = 85;
    let numero = num;
    if (num == 4) {
        for (let i = 0; i < numero; i++) {
            for (let j = 0; j < 1; j++) {
                ctx.beginPath();
                ctx.font = '30px';
                ctx.fillStyle = 'black';
                ctx.fillText('Sábado', ancho, 620);
                ctx.fillText("Domingo", ancho + 50, 620)

                ctx.fillRect(ancho + 15, 600, 2, 5);
                ctx.fillRect(ancho + 65, 600, 2, 5);

                ctx.closePath();
                ancho = ancho + 110;
            }
            ancho = ancho + 40;
        }
    } else {
        let ancho = 90;
        let numero = num
        for (let i = 0; i < numero; i++) {
            for (let j = 0; j < 1; j++) {
                ctx.beginPath();
                ctx.font = '30px';
                ctx.fillStyle = 'black';
                ctx.fillText('Sábado', ancho, 620);
                ctx.fillText("Domingo", ancho + 50, 620)

                ctx.fillRect(ancho + 15, 600, 2, 5);
                ctx.fillRect(ancho + 65, 600, 2, 5);

                ctx.closePath();
                ancho = ancho + 77;
            }
            ancho = ancho + 40;
        }
    }
}


//? Control de seleccion de mes 
const seleccion = document.querySelector("[name ='selecMes']");

//Controla la selecciopn inicial, que siempre es enero
trataDatos(seleccion.options[seleccion.selectedIndex].value);

//Toma datos de la pagina cuando esta seleccion es acutalizada.
seleccion.addEventListener('change', function () {
    var e = seleccion;
    var selected = e.options[e.selectedIndex].value;
    vaciarCanvas();
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
        gradient = ctx.createLinearGradient(0, 0, 0, 170);
        gradient.addColorStop(0, "#1a97a0");
        gradient.addColorStop(1, "#56ecf7");

        mes = meses[0];
        semanas = mes.semanas;
        pintaBarra(semanas, color)
        console.log(semanas)
    } else if (e == "febrero") {
        gradient = ctx.createLinearGradient(0, 0, 0, 170);
        gradient.addColorStop(0, "#1a97a0");
        gradient.addColorStop(1, "#56ecf7");

        mes = meses[1];
        semanas = mes.semanas;
        pintaBarra(semanas, color);
        console.log(semanas);
    } else {
        gradient = ctx.createLinearGradient(0, 0, 0, 170);
        gradient.addColorStop(0, "#1a97a0");
        gradient.addColorStop(1, "#56ecf7");

        mes = meses[2];
        semanas = mes.semanas;
        pintaBarra(semanas, color);
        console.log(semanas)
    }
}

function pintaBarra(semanas, color) {
    console.log(semanas.length)
    var sab = 0;
    var dom = 0;
    //!     Comprobamos el numero de semanas que tiene ese mes y dependiendo del
    //! numero de semanas que esta tiene, las separaciones son distintas.

    // Hacemos una llamada a las funciones de pintar los ejes de abscisas y ordenadas

    if (semanas.length == 4) {
        pintarMedidasY();
        pintarMedidasX(4);

        var cont = 20

        ctx.beginPath();

        semanas.forEach((e) => {
            let sab = e.sab;
            let dom = e.dom;
            ctx.fillStyle = gradient;
            cont = cont + 100
            //           orX   orY   w    h
            ctx.fillRect(cont, 599, -40, (-sab * 50));

            cont = cont + 50;
            ctx.fillRect(cont, 599, -40, (-dom * 50));
        });
        ctx.closePath()

    } else if (semanas.length = 5) {
        pintarMedidasY();
        pintarMedidasX(5);

        let cont = 60
        ctx.beginPath();
        semanas.forEach((e) => {
            let sab = e.sab;
            let dom = e.dom;
            ctx.fillStyle = gradient;
            cont = cont + 65;
            //          orX    orY  w    h
            ctx.fillRect(cont, 599, -40, -sab * 50);

            cont = cont + 50;
            ctx.fillRect(cont, 599, -40, -dom * 50);
        });
        ctx.closePath()
    }
}

//?    Esta funcion vacía el canvas justo despues de clickar sobre el boton de una grafica
//? distinta a la actual
function vaciarCanvas() {
    //Limpia Canvas
    ctx.clearRect(51, 599, 599, -600);
    //Limpia Ordenadas
    ctx.clearRect(0, 20, 35, 600);
    //Limpia Abscisas
    ctx.clearRect(51, 601, 1000, 100);

}



//! TRABAJO DATOS

