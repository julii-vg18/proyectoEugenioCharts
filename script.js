const meses = [
    {
        "id": 1,
        "mes": "enero",
        "semanas": [
            {
                "id": 11,
                "semana": "Semana 1",
                "sab": 200,
                "dom": 300
            },
            {
                "id": 12,
                "semana": "Semana 2",
                "sab": 200,
                "dom": 300
            },
            {
                "id": 13,
                "semana": "Semana 3",
                "sab": 200,
                "dom": 300
            },
            {
                "id": 14,
                "semana": "Semana 4",
                "sab": 200,
                "dom": 300
            }
        ]
    },
    {
        "id": 2,
        "mes": "febrero",
        "semanas": [
            {
                "id": 21,
                "semana": "Semana 1",
                "sab": 200,
                "dom": 300
            },
            {
                "id": 22,
                "semana": "Semana 2",
                "sab": 200,
                "dom": 300
            },
            {
                "id": 23,
                "semana": "Semana 3",
                "sab": 200,
                "dom": 300
            },
            {
                "id": 24,
                "semana": "Semana 4",
                "sab": 200,
                "dom": 300
            },
            {
                "id": 25,
                "semana": "Semana 5",
                "sab": 200,
                "dom": 0
            }
        ]
    },
    {
        "id": 3,
        "mes": "marzo",
        "semanas": [
            {
                "id": 31,
                "semana": "Semana 1",
                "sab": 0,
                "dom": 300
            },
            {
                "id": 32,
                "semana": "Semana 2",
                "sab": 200,
                "dom": 300
            },
            {
                "id": 33,
                "semana": "Semana 3",
                "sab": 200,
                "dom": 300
            },
            {
                "id": 34,
                "semana": "Semana 4",
                "sab": 200,
                "dom": 300
            },
            {
                "id": 35,
                "semana": "Semana 5",
                "sab": 200,
                "dom": 300
            }
        ]
    }
]
const canvas = document.querySelector('#micanvas');
var ctx = canvas.getContext('2d');

// var arrayMeses = [function cargarDatos() {
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', 'data.json', true);
//     xhr.onload = function () {
//         console.log('READYSTATE: ', xhr.readyState);
//         if (this.status == 200) {
//             console.log(this.responseText);
//             document.getElementById('text').innerHTML = this.responseText;
//         } else if (this.status = 404) {
//             document.getElementById('text').innerHTML = 'No se ha encontrado el archivo';
//         }
//     }
//     // Procesar posibles errores
//     xhr.onerror = function () {
//         console.log('Request Error...');
//     }





//      EJES

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
pintarEjes();



const seleccion = document.querySelector("[name ='selecMes']");


console.log(seleccion)
getInfo(seleccion)

//Add event listener seleccion

function getInfo(e) {
    var mesSel = e.value;

    tomarDatos(e);
}

function tomarDatos(e) {
    meses.forEach((mes) => {
        if (mes.mes == e.value) {
            console.log(mes.semanas)
        }
    })
}
// console.log(ctx)

     // Envío de la petición
//      xhr.send();
//      console.log('READYSTATE: ', xhr.readyState);
//  }
