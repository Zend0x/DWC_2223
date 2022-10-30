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
    fillBoard(){
        let contentArray = Array();
        let k = 0;

        for(let i = 0; i < cellNumber; i = i+2){
            contentArray[i] = images[k];
            contentArray[i+1] = images[k];
            k++;
            if(k > 9){
                k = 0;
            }
        }
        let shuffledArray = contentArray.sort((a, b) => 0.5 - Math.random());

        console.log(contentArray)

        k = 0;
        for(let i = 0; i < rowCount; i++){
            for(let j=0;j<colCount;j++){
                this.boardArray[i][j] = shuffledArray[k];
                k++;
            }
        }
        console.log(this.boardArray);
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

