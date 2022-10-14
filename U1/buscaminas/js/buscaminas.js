let columnSize = prompt("¿Cuántas columnas tiene que tener la tabla?");
let rowSize = prompt("¿Cuántas filas tiene que tener la tabla?");
let mineCount = prompt("¿Cuántas minas hay que insertar?");

//Creamos array bidimensional e insertamos las minas.

function crearArray(columnSize,rowSize){
//Creación del array
    let arrayTablero=[];
    for (let fila = 0; fila < rowSize; fila++) {
        arrayTablero[fila] = [];
    
        for (let columna = 0; columna < columnSize; columna++) {
            arrayTablero[fila][columna] = " ";
        }
    }
    return arrayTablero;
}

function crearMinas(arrayTablero,columnSize,rowSize){
    //Determinamos el número de minas y su posición
    let contadorMinas=0;
    let posFila;
    let posColumna;
    while (contadorMinas < mineCount) {
        posFila = Math.floor(Math.random() * rowSize);
        posColumna = Math.floor(Math.random() * columnSize);
        if (arrayTablero[posFila][posColumna] != "MINA") {
            arrayTablero[posFila][posColumna] = "MINA";
            contadorMinas++;
        }
    };
    return arrayTablero;
}

function mineChecker(arrayTablero,columnSize,rowSize){
    //Determinamos las minas que hay alrededor de cada fila.
    let minasAlrededor=0;
    for (let fila = 0; fila < rowSize; fila++) {
        for (let columna = 0; columna < columnSize; columna++) {
            minasAlrededor = 0;
            if (arrayTablero[fila][columna] != "MINA") {
                for (let cFila = fila - 1; cFila <= fila + 1; cFila++) {
                    if(cFila>=0&&cFila<rowSize){
                        for(let cColumna=columna-1;cColumna<=columna+1;cColumna++){
                            if((cColumna>=0&&cColumna<columnSize)&&(arrayTablero[cFila][cColumna]=="MINA")){
                                minasAlrededor++;
                            }
                        }
                    }
                }
            }
            arrayTablero[fila][columna] = minasAlrededor;
        }
    }
    return arrayTablero;
}

//Creación del tablero insertando los números y minas correspondientes.
function crearTablero(arrayTablero,columnSize,rowSize){
    document.write('<table>');
    for (let i = 0; i < columnSize; i++) {
        document.write('<tr>');
        for (let j = 0; j < rowSize; j++) {
            if(arrayTablero[i][j]==0){
                document.write('<td>'+arrayTablero[i][j]+'</td>');
            }else{
                document.write('<td>','</td>');
            }
        }
        document.write('</tr>');
    }
    document.write('</table>')
    return arrayTablero;
}


arrayTablero=crearArray(columnSize,rowSize);
arrayTablero=crearMinas(arrayTablero,columnSize,rowSize);
arrayTablero=mineChecker(arrayTablero,columnSize,rowSize);
crearTablero(arrayTablero,columnSize,rowSize);