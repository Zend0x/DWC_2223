let columnSize=prompt("¿Cuántas columnas tiene que tener la tabla?");
let rowSize=prompt("¿Cuántas filas tiene que tener la tabla?");
let mineCount=prompt("¿Cuántas minas hay que insertar?");

let arrayTablero=[];

document.write('<table>');

for(let i=0;i<columnSize;i++){
    document.write('<tr>');
    for(let j=0;j<rowSize;j++){
        document.write('<td></td>');
    }
    document.write('</tr>');
};

for(let i=0;i<mineCount;i++){
    posFila=Math.floor(Math.random()*rowSize*10);
    console.log(posFila);
    //arrayTablero[posFila][posColumna]="MINA";
};

document.write('</table>');