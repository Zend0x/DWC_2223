let columnSize = prompt("¿Cuántas columnas tiene que tener la tabla?");
let rowSize = prompt("¿Cuántas filas tiene que tener la tabla?");
let mineCount = prompt("¿Cuántas minas hay que insertar?");

let arrayTablero = [];
let contadorMinas=0;
let posFila;
let posColumna;

document.write('<table>');

for (let i = 0; i < columnSize; i++) {
    document.write('<tr>');
    for (let j = 0; j < rowSize; j++) {
        document.write('<td></td>');
    }
    document.write('</tr>');
};
//Creamos array bidimensional para la inserción de minas

for(let fila=0;fila<rowSize;fila++){
    arrayTablero[fila]=[];

    for(let columna=0;columna<columnSize;columna++){
        arrayTablero[fila][columna]=" ";
    }
}

while(contadorMinas<mineCount) {
    posFila = Math.floor(Math.random() * rowSize);
    posColumna = Math.floor(Math.random() * columnSize);
    if (arrayTablero[posFila][posColumna] != "MINA"){
        arrayTablero[posFila][posColumna] = "MINA";
        contadorMinas++;
    }
};

console.log(arrayTablero);
console.log(contadorMinas);

document.write('</table>');