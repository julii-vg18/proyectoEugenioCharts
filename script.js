window.onload = function() {
    //? Cargamos el JSON externo /
    loadData();

    function loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'data.json', true);


        xhr.onload = function() {
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
                const arraytempmediasemanas = [];
                const arraytempmediameses = [];

                datos.forEach((dato) => {
                    const add = temperaturamedia.push(dato.tmed);
                    const addmax = temperaturamax.push(dato.tmax);
                    const addmin = temperaturamin.push(dato.tmin);
                });

                cargarDatoTempMedia(temperaturamax);

                function cargarDatoTempMedia(seleccion) {
                    for (var i = 0; i < temperaturamedia.length; i++) {
                        tempmedia = parseFloat(seleccion[i]);
                        if (contador == 7) {
                            var tempsemana = 0;
                            tempsemana = tempmediatotal / 7;
                            console.log("Temperatura  de la semana " + semana + " es " + tempsemana.toFixed(1) + "Cº");
                            const tempmediaporsemanas = arraytempmediasemanas.push(tempsemana.toFixed(1));

                            tempmes = tempmes + tempsemana;
                            if (semana % 4 == 0) {
                                tempmesfinal = tempmes / 4;
                                console.log("Temp del mes " + mes + " es " + tempmesfinal.toFixed(1) + "Cº");
                                const tempmediapormeses = arraytempmediameses.push(tempmesfinal.toFixed(1));
                                tempmes = 0;
                                mes = mes + 1;
                            }
                            contador = 0;
                            semana = semana + 1;
                            tempmediatotal = 0;
                            tempsemana = 0;
                        } else {
                            console.log("Se sumo " + tempmedia + "Cº a la base");
                            contador = contador + 1;
                            tempmediatotal = tempmediatotal + tempmedia;
                        }
                    }

                }
                console.log(arraytempmediasemanas);
                console.log(arraytempmediameses);
            }
        }
        xhr.send();
    }
}

/*const canvas = document.querySelector('#micanvas');
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
seleccion.addEventListener('change', function() {
    console.log('Has seleccionado:' + seleccion.value)
})*/