const tipoGraf = document.querySelectorAll("[name = 'seleccion']");

console.log(tipoGraf)
var seleccionada = "barras";

tipoGraf.forEach((boton) => {
    boton.addEventListener('click', getTipo)
})

console.log("fffff " + seleccionada)

//! Toma el tipo de grafica que ha sido seleccionada  */
function getTipo () {
    tipoGraf.forEach((tipo) => {
    if (tipo.checked == true) {
        seleccionada = tipo.id;
    }
})
}

//? Cargamos el JSON externo 
var meses = [
    {
        "mes": "enero",
        "weeks": []
    },
    {
        "mes": "febrero",
        "weeks": []
    },
    {
        "mes": "marzo",
        "weeks": []
    }
];

var arraytempmediasemanas = [];
var arraytempmediameses = [];

loadData();

function loadData() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../json/data.json', false);


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
            const temperaturamax = [];
            const temperaturamin = [];
            arraytempmediasemanas = [];
            arraytempmediameses = [];

            datos.forEach((dato) => {
                const add = temperaturamedia.push(dato.tmed);
                const addmax = temperaturamax.push(dato.tmax);
                const addmin = temperaturamin.push(dato.tmin);
            });

            cargarDatoTempMedia(temperaturamedia);

            function cargarDatoTempMedia(seleccion) {
                for (var i = 0; i < temperaturamedia.length; i++) {
                    tempmedia = parseFloat(seleccion[i]);
                    if (contador == 7) {
                        var tempsemana = 0;
                        tempsemana = tempmediatotal / 7;
                        const tempmediaporsemanas = arraytempmediasemanas.push(tempsemana.toFixed(1));

                        tempmes = tempmes + tempsemana;
                        if (semana % 4 == 0) {
                            tempmesfinal = tempmes / 4;
                            const tempmediapormeses = arraytempmediameses.push(tempmesfinal.toFixed(1));
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
    }
    xhr.send();
}

/*

                OBTENER MESES SACANDO DEL JSON

*/
const canvas = document.querySelector('#micanvas');
var ctx = canvas.getContext('2d');

tempSem = arraytempmediasemanas;
tempMes = arraytempmediameses;


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
            ctx.font = '30px';
            ctx.fillStyle = 'black';
            //Raul dijo que se pusieran parentesis
            ctx.fillText('Semana ' + (i + 1), ancho + 25, 620);

            ctx.fillRect(ancho + 45, 600, 2, 5);

            ctx.closePath();

        }
        ancho = ancho + 150;
    }
}


//? Control de seleccion de mes 
const seleccion = document.querySelector("[name ='selecMes']");

//Controla la selecciopn inicial, que siempre es enero
trataDatos(seleccion.options[seleccion.selectedIndex].value);

//Toma datos de la pagina cuando esta seleccion es actualizada.
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
        console.log(mes);
        semanas = "";
        for (let i = 0; i <= 3; i++) {
            mes.weeks.push(arraytempmediasemanas[i]);
        }
        semanas = mes.weeks;
        pintaBarra(semanas, color)
    } else if (e == "febrero") {
        gradient = ctx.createLinearGradient(0, 0, 0, 170);
        gradient.addColorStop(0, "#1a97a0");
        gradient.addColorStop(1, "#56ecf7");

        mes = meses[1];
        console.log(mes);
        semanas = "";
        for (let i = 4; i <= 7; i++) {

            mes.weeks.push(arraytempmediasemanas[i]);
        }
        semanas = mes.weeks;
        pintaBarra(semanas, color);
    } else {
        gradient = ctx.createLinearGradient(0, 0, 0, 170);
        gradient.addColorStop(0, "#1a97a0");
        gradient.addColorStop(1, "#56ecf7");

        mes = meses[2];
        console.log(mes);
        semanas = "";
        for (let i = 5; i <= 11; i++) {
            mes.weeks.push(arraytempmediasemanas[i]);
        }
        semanas = mes.weeks;
        pintaBarra(semanas, color);
    }
}

function pintaBarra(semanas) {
    //!     Comprobamos el numero de semanas que tiene ese mes y dependiendo del
    //! numero de semanas que esta tiene, las separaciones son distintas.

    // Hacemos una llamada a las funciones de pintar los ejes de abscisas y ordenadas
    pintarMedidasY();
    pintarMedidasX(4);

    var cont = 20

    ctx.beginPath();

    semanas.forEach((e) => {
        let sem = e;
        ctx.fillStyle = gradient;
        cont = cont + 150

        //           orX   orY   w    h
        ctx.fillRect(cont, 599, -40, (-sem * 25));

    });
    cont = 2000;
    ctx.closePath()

}

var sumatorio = 0;   //804
var ultimoAngulo = 0;

function pintaPastel() {
    meses.forEach(mes => {
        mes.weeks.forEach(semana => {
            sumatorio += semana.sab; // Suma todos los datos para saber el total del mes y poder dividir el circulo
        });
    });

    meses.forEach(mes => {
        for (let i = 0; i < 4; i++) {
            let week = weeks[i];
            ctx.fillStyle = semana.color;
            ctx.beginPath();
            ctx.arc(250, 250, 200, ultimoAngulo, ultimoAngulo + Math.PI * 2 * (semana.sab / sumatorio), false);
            ctx.arc(250, 300, 200, ultimoAngulo + Math.PI * 2 * (semana.sab / sumatorio), ultimoAngulo, true);
            ctx.fill();
            ctx.stroke();
            ultimoAngulo += Math.PI * 2 * (weeks / sumatorio);
        };
    });

    meses.forEach(mes => {
        mes.weeks.forEach(semana => {
            ctx.fillStyle = semana.color;
            ctx.beginPath();
            ctx.moveTo(250, 250);
            ctx.arc(250, 250, 200, ultimoAngulo, ultimoAngulo + Math.PI * 2 * (semana.sab / sumatorio), false); // Área de un círculo 2*PI*radio
            ctx.lineTo(250, 250); // Mueve el selector al centro del canvas,
            ctx.fill();
            ultimoAngulo += Math.PI * 2 * (semana.sab / sumatorio);
        });
    })
}
/*
    Vaciamos el canvas
*/
function vaciarCanvas() {
    //Limpia Canvas
    ctx.clearRect(51, 599, 599, -600);
    //Limpia Ordenadas
    ctx.clearRect(0, 20, 35, 600);
    //Limpia Abscisas
    ctx.clearRect(51, 601, 1000, 100);
}