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
        this.recentFailTile1="";
        this.recentFailTile2="";
        this.attempts=0;

        this.cellNumber=row*column;
        this.pairsToWin=this.cellNumber/2;
        this.maxPoints=this.pairsToWin*10;
        this.currentPoints=0;
        this.gameTimer=0;

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
            let boardContainer=document.createElement('board');
            boardContainer.id="boardContainer";
            document.body.appendChild(boardContainer);

            let table=document.createElement('table');
            boardContainer.appendChild(table);

            let pointsText=document.createElement('caption');
            pointsText.id="pointsText";
            table.appendChild(pointsText);
            pointsText.innerHTML=`Puntos: ${this.currentPoints}/${this.maxPoints}`;

            let resetButton=document.createElement('button');
            resetButton.type="button";
            resetButton.id="resetButton";
            resetButton.addEventListener('click',this.resetGame);
            resetButton.innerHTML="Reiniciar";
            boardContainer.appendChild(resetButton);
            
            for (let i = 0; i < this.row; i++) {
                let tr=document.createElement('tr');
                table.appendChild(tr);
                for (let j = 0; j < this.column; j++) {
                    let td=document.createElement('td');
                    td.dataset.row=i;
                    td.dataset.column=j;
                    td.id=`row${td.dataset.row}col${td.dataset.column}`;
                    td.dataset.uncovered=0;
                    td.dataset.attempts=0;
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
                tile.dataset.uncovered=1;
                tile.setAttribute("class","uncovered");
                tile.innerHTML=this.boardArray[tileRow][tileCol];
            }else if(this.uncoveredTiles==2){
                this.tile2=document.getElementById(`row${tileRow}col${tileCol}`);
                if(this.tile2.id==this.tile1.id){
                    this.tile1.setAttribute("class","covered");
                    this.tile1.innerHTML="";
                }else{
                    this.tile1.dataset.uncovered=1;
                    this.tile1.setAttribute("class","uncovered");
                    this.tile2.dataset.uncovered=1;
                    this.tile2.setAttribute("class","uncovered");
                    tile.innerHTML=this.boardArray[tileRow][tileCol];

                    let tile1Row=this.tile1.dataset.row;
                    let tile1Col=this.tile1.dataset.column;
                    let tile2Row=this.tile2.dataset.row;
                    let tile2Col=this.tile2.dataset.column;

                    if(this.boardArray[tile1Row][tile1Col]==this.boardArray[tile2Row][tile2Col]){
                        this.addPoints(this.tile1,this.tile2);

                        this.uncoveredTiles=0;
                    }else if(this.boardArray[tile1Row][tile1Col]!=this.boardArray[tile2Row][tile2Col]){

                        let falloReciente=(this.recentFailTile1==this.tile1||this.recentFailTile1==this.tile2||this.recentFailTile2==this.tile1||this.recentFailTile2==this.tile2);
                        //let repitePareja=(this.arrayTablero[this.recentFailTile1.dataset.row][this.arrayTablero[this.recentFailTile1.col]==this.arrayTablero[this.recentFailTile2.dataset.row][this.recentFailTile2.dataset.column]]);
                        if(falloReciente){
                            this.attempts++;
                        }else{
                            this.attempts=0;
                        }
                        this.recentFailTile1=this.tile1;
                        this.recentFailTile2=this.tile2;

                        
                        setTimeout(() => {
                            this.tile1.setAttribute("class","covered");
                            this.tile1.innerHTML="";
                            this.tile1.dataset.uncovered=0;
                            this.tile2.setAttribute("class","covered");
                            this.tile2.innerHTML="";
                            this.tile2.dataset.uncovered=0;
                            if(tile.dataset.uncovered==0){
                                tile.setAttribute("class","covered");
                            }
                            this.uncoveredTiles=0;
                        }, 200);
                    }
                }
            }
        }
    }

    resetGame(){
        let oldBoard=document.getElementById('boardContainer');
        oldBoard.remove();
        let newBoard=new Board(5,4);
        newBoard.fillBoard();
        newBoard.printBoard();
        console.log(newBoard.boardArray);
    }

    addPoints(tile1,tile2){
        tile1.setAttribute("class","matched");
        tile2.setAttribute("class","matched");
        tile1.removeEventListener('click', this.uncoverTile);
        tile2.removeEventListener('click', this.uncoverTile);
        this.pairsMatched++;
        let repitenParejas=tile1==this.recentFailTile1||tile1==this.recentFailTile||this.recentFailTile2==this.recentFailTile1||this.recentFailTile2==this.recentFailTile2;
        if(repitenParejas){
            this.attempts++;
        }else{
            this.attempts=0;
        }
        
        let pointsText=document.getElementById("pointsText");
        switch (this.attempts) {
            case 0:
                this.currentPoints+=10;
                break;
            case 1:
                this.currentPoints+=5
                break;
            case 2:
                this.currentPoints+=2.5
                break;
            default:
                this.currentPoints+=0;
                break;
        }
        this.attempts=0;
        this.recentFailTile1="";
        this.recentFailTile2="";
        pointsText.innerHTML=`Puntos: ${this.currentPoints}/${this.maxPoints}`;
        if(this.pairsMatched==this.pairsToWin){
            this.win();
        }
    }

    win(){
        setTimeout(() => {
            alert(`¡Has ganado!\nHas conseguido ${this.currentPoints} puntos de ${this.maxPoints} disponibles.\nLa partida ha durado ${this.gameTimer} segundos.`);
        }, 500);
    }
}
window.onload=()=>{
    let board1 = new Board(5, 4);
    board1.fillBoard();
    board1.printBoard();
    console.log(board1.boardArray);
}