let rowCount = prompt("¿Cuántas filas tendrá que tener el tablero?");
let colCount = prompt("¿Cuántas columnas tendrá que tener el tablero?");
let cellNumber = rowCount * colCount;
let pairNumber = cellNumber / 2;

const images = ["🇭🇰", "🇹🇼", "🇰🇬", "🇲🇳", "🇺🇿", "🇪🇭", "🇲🇴", "🇫🇮", "🇨🇾", "🇳🇵"];

class Board {
    constructor(row, column) {
        this.row = row;
        this.column = column;

        this.generateBoard();
    }
    //Genera el array del tablero.
    generateBoard() {

        this.boardArray = [];

        for (let row = 0; row < this.row; row++) {
            this.boardArray[row] = [];
            for (let column = 0; column < this.column; column++) {
                this.boardArray[row][column] = ' ';
            }

        }
    }
    //Rellena el tablero generado con el contenido necesario.
    fillBoard(){
        let contentArray = Array();
        let k = 0;
        //Primero crea y rellena un array simple con el contenido de otro array.
        for(let i = 0; i < cellNumber; i = i+2){
            contentArray[i] = images[k];
            contentArray[i+1] = images[k];
            k++;
            if(k > 9){
                k = 0;
            }
        }
        //Shufflea el array para aleatorizar el contenido.
        let shuffledArray = contentArray.sort((a, b) => 0.5 - Math.random());

        //Ahora pasa el contenido del array ya shuffleado al array final.
        k = 0;
        for(let i = 0; i < rowCount; i++){
            for(let j=0;j<colCount;j++){
                this.boardArray[i][j] = shuffledArray[k];
                k++;
            }
        }
    }
    //Imprime el array por pantalla en forma de tabla.
    printBoard() {
        //Comprueba que el número sea divisible entre 2 (es decir, par).
        if ((rowCount * colCount) % 2 == 0) {
            document.write("<table>");
            for (let i = 0; i < this.row; i++) {
                document.write("<tr>");
                for (let j = 0; j < this.column; j++) {
                    document.write(`<td>${this.boardArray[i][j]}</td>`);
                }
                document.write("</tr>");
            };
        //En caso de que no, lanza una alerta por el navegador avisando de que 
        //los números no son correctos.
        } else if (cellCounter % 2 != 0) {
            alert("¡El tablero no tiene capacidad de alojar parejas pares! Introduce nuevos números.");
        }

    }
}

let board1 = new Board(rowCount, colCount);
board1.fillBoard();
board1.printBoard();

