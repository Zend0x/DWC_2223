let columnSize = prompt("¿Cuántas columnas tiene que tener la tabla?");
let rowSize = prompt("¿Cuántas filas tiene que tener la tabla?");
let mineCount = prompt("¿Cuántas minas hay que insertar?");

let arrayTablero = [];
let contadorMinas = 0;
let posFila;
let posColumna;

let fila = 2;
let columna = 3;
let minasAlrededor = 0;

document.write('<table>');

for (let i = 0; i < columnSize; i++) {
    document.write('<tr>');
    for (let j = 0; j < rowSize; j++) {
        document.write('<td></td>');
    }
    document.write('</tr>');
};
//Creamos array bidimensional para la inserción de minas

for (let fila = 0; fila < rowSize; fila++) {
    arrayTablero[fila] = [];

    for (let columna = 0; columna < columnSize; columna++) {
        arrayTablero[fila][columna] = " ";
    }
}

while (contadorMinas < mineCount) {
    posFila = Math.floor(Math.random() * rowSize);
    posColumna = Math.floor(Math.random() * columnSize);
    if (arrayTablero[posFila][posColumna] != "MINA") {
        arrayTablero[posFila][posColumna] = "MINA";
        contadorMinas++;
    }
};

for (let fila = 0; fila < rowSize; fila++) {
    for (let columna = 0; columna < columnSize; columna++) {
        minasAlrededor = 0;
        console.log("ola")
        if (arrayTablero[fila][columna] != "MINA") {
            for (let cFila = fila - 1; cFila < fila + 1; cFila++) {
                for (let cColumna = columna - 1; cColumna < columna + 1; cColumna++) {
                    if ((cFila >= 0 && cFila < rowSize) || (cColumna > 0 && cColumna < columnSize)) {
                        console.log(arrayTablero[cFila][cColumna]);
                        if (arrayTablero[cFila][cColumna] == "MINA") {
                            minasAlrededor++;
                        }
                    }
                }
            }
        }
        arrayTablero[fila][columna] = minasAlrededor;
    }
}

console.log(arrayTablero);