let rowCount=prompt("¿Cuántas filas tendrá que tener el tablero?");
let colCount=prompt("¿Cuántas columnas tendrá que tener el tablero?");

let cellCounter=0;

class Board{
    constructor(row,column){
        this.row=row;
        this.column=column;

        this.generateBoard();
    }

    generateBoard(){
        
        this.boardArray=[];

        for(let row=0;row<this.row;row++){
            this.boardArray[row]=[];

            for(let column=0;column<this.column;column++){
                this.boardArray[row][column]=`image${cellCounter}`;
                cellCounter++;
            }
        }
        return cellCounter;
    }

    printBoard(){
        let numeroParejas=rowCount+colCount;
        if(cellCounter%2==0){
            document.write("<table>");
            for(let i=0;i<this.row;i++){
                document.write("<tr>");
                    for(let j=0;j<this.column;j++){
                        document.write(`<td>${this.boardArray[i][j]}</td>`);
                    }
                document.write("</tr>");
            };
        } else if (cellCounter%2!=0){
            alert("¡El tablero no tiene capacidad de alojar parejas pares! Introduce nuevos números.");
        }
        
    }
}

let board1=new Board(rowCount,colCount);
console.log(cellCounter);
board1.printBoard();

