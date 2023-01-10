//let rowCount = prompt("¿Cuántas filas tendrá que tener el tablero?");
//let colCount = prompt("¿Cuántas columnas tendrá que tener el tablero?");

const images = ["🇭🇰", "🇹🇼", "🇰🇬", "🇲🇳", "🇺🇿", "🇪🇭", "🇲🇴", "🇫🇮", "🇨🇾", "🇳🇵"];

class Board {
    constructor(row, column) {
        this.row = row;
        this.column = column;

        this.uncoveredTiles=0;
        this.pairsMatched=0;
        this.tile1="";
        this.tile2="";

        this.cellNumber=row*column;

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
        for(let i = 0; i < this.cellNumber; i = i+2){
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
        for(let i = 0; i < this.row; i++){
            for(let j=0;j<this.column;j++){
                this.boardArray[i][j] = shuffledArray[k];
                k++;
            }
        }
    }
    //Imprime el array por pantalla en forma de tabla.
    printBoard() {
        //Comprueba que el número sea divisible entre 2 (es decir, par).
        if ((this.row * this.column) % 2 == 0) {
            let table=document.createElement('table');
            document.body.appendChild(table);
            for (let i = 0; i < this.row; i++) {
                let tr=document.createElement('tr');
                table.appendChild(tr);
                for (let j = 0; j < this.column; j++) {
                    let td=document.createElement('td');
                    td.dataset.row=i;
                    td.dataset.column=j;
                    td.id=`row${td.dataset.row}col${td.dataset.column}`;
                    td.dataset.uncovered=0;
                    td.setAttribute("class","covered");

                    td.addEventListener('click', this.uncoverTile.bind(this));

                    tr.appendChild(td);
                }
            };
        //En caso de que no, lanza una alerta por el navegador avisando de que 
        //los números no son correctos.
        } else if (cellCounter % 2 != 0) {
            alert("¡El tablero no tiene capacidad de alojar parejas pares! Introduce nuevos números.");
        }

    }

    uncoverTile(event){
        let tileEvent=event||window.event;
        let tile=tileEvent.currentTarget;
        let tileRow=tile.dataset.row;
        let tileCol=tile.dataset.column;


        if(tile.dataset.uncovered==0){
            this.uncoveredTiles++;
            if(this.uncoveredTiles==1){
                this.tile1=document.getElementById(`row${tileRow}col${tileCol}`);
                tile.setAttribute("uncovered",1);
                tile.setAttribute("class","uncovered");
                tile.innerHTML=this.boardArray[tileRow][tileCol];
            }else if(this.uncoveredTiles==2){
                this.tile2=document.getElementById(`row${tileRow}col${tileCol}`);
                if(this.tile2.id!=this.tile1.id){
                    tile.setAttribute("uncovered",1);
                    tile.setAttribute("class","uncovered");
                    tile.innerHTML=this.boardArray[tileRow][tileCol];

                    if(this.tile1.innerHTML==this.tile2.innerHTML){
                        this.tile1.setAttribute("class","matched");
                        this.tile2.setAttribute("class","matched");
                    }
                }else{
                    this.tile1.setAttribute("class","covered");
                    this.tile1.innerHTML="";
                    this.tile2.setAttribute("class","covered");
                    this.tile2.innerHTML="";
                }
                this.uncoveredTiles=0;
            }
        }
    }
}
window.onload=()=>{
    let board1 = new Board(5, 4);
    board1.fillBoard();
    board1.printBoard();
    console.log(board1.boardArray);
}