let rowCount=prompt("¿Cuántas filas tendrá que tener el tablero?");
let colCount=prompt("¿Cuántas columnas tendrá que tener el tablero?");

class Board{
    constructor(row,column){
        this.row=row;
        this.column=column;
    }

    generateBoard(){
        
        for(let row=0;row<this.row;row++){
            this.boardArray[row]=[];

            for(let column=0;column<this.column;column++){
                this.boardArray[row][column]='image';
            }
        }

    }

    printBoard(){
        document.write("<table>");
        for(let i=0;i<this.row;i++){
            document.write("<tr>");
            for(let j=0;j<this.column;j++){
                document.write('<td></td>');
            }
            document.write("</tr>");
        }
    }
}

let board1=new Board(rowCount,colCount);

board1.printBoard();

