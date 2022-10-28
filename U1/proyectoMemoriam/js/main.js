let rowCount = prompt("¿Cuántas filas tendrá que tener el tablero?");
let colCount = prompt("¿Cuántas columnas tendrá que tener el tablero?");
let cellNumber = rowCount * colCount;
let pairNumber = cellNumber / 2;

const images = ["🇭🇰", "🇹🇼", "🇰🇬", "🇲🇳", "🇺🇿", "🇪🇭", "🇲🇴", "🇫🇮", "🇨🇾", "🇳🇵"];
const testArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

class Board {
    constructor(row, column) {
        this.row = row;
        this.column = column;

        this.generateBoard();
    }

    generateBoard() {

        this.boardArray = [];

        for (let row = 0; row < this.row; row++) {
            this.boardArray[row] = [];
            for (let column = 0; column < this.column; column++) {
                this.boardArray[row][column] = ' ';
            }

        }
    }

    fillBoard() {
        for(let i=0;i<rowCount;i++){
            for(let j=0;j<colCount;j++){
                let test=Math.floor(Math.random()*images.length);
                for(let x=0;x<2;x++){
                    this.boardArray[i][j]=images[test];
                }
            }
        }
    }

    printBoard() {
        if ((rowCount * colCount) % 2 == 0) {
            document.write("<table>");
            for (let i = 0; i < this.row; i++) {
                document.write("<tr>");
                for (let j = 0; j < this.column; j++) {
                    document.write(`<td>${this.boardArray[i][j]}</td>`);
                }
                document.write("</tr>");
            };
        } else if (cellCounter % 2 != 0) {
            alert("¡El tablero no tiene capacidad de alojar parejas pares! Introduce nuevos números.");
        }

    }
}

let board1 = new Board(rowCount, colCount);
board1.fillBoard();
board1.printBoard();

