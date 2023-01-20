const images = ["🇭🇰", "🇹🇼", "🇰🇬", "🇲🇳", "🇺🇿", "🇪🇭", "🇲🇴", "🇫🇮", "🇨🇾", "🇳🇵"];

class Memorin {
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

        this.startTime="";
        this.endTime="";

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
        /*Toma la hora de impresión del tablero, haciendo que guarde en qué momento se acabó de imprimir el teclado (o lo
        que es igual, cuándo empezo la partida.)*/
        this.startTime=new Date();
        //Comprueba que el número sea divisible entre 2 (es decir, par).
        let notOversized=this.row<=16&&this.column<=16;
        let notUndersized=this.row>=4&&this.column>=4;
        if(notUndersized&&notOversized){
            if (this.cellNumber % 2 == 0) {
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
            } else if (this.cellNumber % 2 != 0) {
                alert("¡El tablero no tiene capacidad de alojar parejas pares! Introduce nuevos números.");
                let rowCount = prompt("¿Cuántas filas tendrá que tener el tablero?");
                let colCount = prompt("¿Cuántas columnas tendrá que tener el tablero?");
                let board1 = new Memorin(rowCount, colCount);
                board1.fillBoard();
                board1.printBoard();
            }
        }else{
            alert("Dimensiones inválidas. Por favor, introduce cantidades mayores a 4 y menores a 16.");
            let rowCount = prompt("¿Cuántas filas tendrá que tener el tablero?");
            let colCount = prompt("¿Cuántas columnas tendrá que tener el tablero?");
            let board1 = new Memorin(rowCount, colCount);
            board1.fillBoard();
            board1.printBoard();
        }
        

    }

    uncoverTile(event){
        //Defino las variables que voy a necesitar más adelante. Una define el evento de la casilla,
        //otra guarda el valor de la casilla, que obtiene a través del evento. Después saco filas y columnas
        //de la casilla.
        let tileEvent=event||window.event;
        let tile=tileEvent.currentTarget;
        let tileRow=tile.dataset.row;
        let tileCol=tile.dataset.column;

        //Aquí comprueba si la casilla está descubierta o no a través de su propiedad del dataset.
        if(tile.dataset.uncovered==0){
            this.uncoveredTiles++; //Sumamos uno a la variable de casillas descubiertas. A través de esta variable,
            if(this.uncoveredTiles==1){ //puede comprobar cuántas casillas hay destapadas simultáneamente y saber qué hacer.
                this.tile1=document.getElementById(`row${tileRow}col${tileCol}`);
                tile.dataset.uncovered=1;
                tile.setAttribute("class","uncovered");
                tile.innerHTML=this.boardArray[tileRow][tileCol];
            }else if(this.uncoveredTiles==2){
                this.tile2=document.getElementById(`row${tileRow}col${tileCol}`);
                if(this.tile2.id==this.tile1.id){ //Si el ID de la casilla es igual, la vuelve a cubrir.
                    this.tile1.setAttribute("class","covered");
                    this.tile1.innerHTML="";
                }else{
                    this.tile1.dataset.uncovered=1; //Marca ambas casillas como descubiertas en el dataset, y les pone
                    this.tile1.setAttribute("class","uncovered"); //la clase "uncovered" para el CSS.
                    this.tile2.dataset.uncovered=1;
                    this.tile2.setAttribute("class","uncovered");
                    tile.innerHTML=this.boardArray[tileRow][tileCol];

                    let tile1Row=this.tile1.dataset.row;
                    let tile1Col=this.tile1.dataset.column;
                    let tile2Row=this.tile2.dataset.row;
                    let tile2Col=this.tile2.dataset.column;
                    //Si el contenido de ambas celdas es igual, llama a la función "addPoints" y le pasa las casillas
                    if(this.boardArray[tile1Row][tile1Col]==this.boardArray[tile2Row][tile2Col]){
                        this.addPoints(this.tile1,this.tile2);
                        this.uncoveredTiles=0;
                    }else if(this.boardArray[tile1Row][tile1Col]!=this.boardArray[tile2Row][tile2Col]){
                        //Esta variable define si es un fallo reciente, es decir: si alguna de las casillas se ha usado en el fallo anterior.
                        let falloReciente=(this.recentFailTile1==this.tile1||this.recentFailTile1==this.tile2||this.recentFailTile2==this.tile1||this.recentFailTile2==this.tile2);
                        if(falloReciente){
                            this.attempts++;//Si se ha usado antes: +1 intento
                        }else{
                            this.attempts=0;//Si no: contador a 0 y reinicializamos las variables auxiliares.
                            this.recentFailTile1="";
                            this.recentFailTile2="";
                        }
                        this.recentFailTile1=this.tile1;
                        this.recentFailTile2=this.tile2;
                        setTimeout(() => { //Este timeout sirve para que las casillas se mantengan destapadas unos instantes,
                            this.tile1.setAttribute("class","covered");// permitiendo al jugador verlas después de fallar.
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
        this.gameActive=false;//Se pone la variable "gameActive" en "false" para que pare el tiempo.

        let confirmacion=confirm("¿Estás seguro de que quieres reiniciar?");//Confirma si quiere reiniciar
        if(confirmacion){//En caso de que sí, borra el tag que contiene todo y vuelve a ejecutar las funciones
            let oldBoard=document.getElementById('boardContainer');
            oldBoard.remove();
            let newBoard=new Memorin(5,4);
            newBoard.fillBoard();
            newBoard.printBoard();
            console.log(newBoard.boardArray);
        }
    }

    addPoints(tile1,tile2){
        tile1.setAttribute("class","matched");//Pone las casillas con la clase "matched" de CSS, que pone el fondo verde
        tile2.setAttribute("class","matched");
        tile1.removeEventListener('click', this.uncoverTile);//Quita el eventListener para que no puedan ser clicadas más
        tile2.removeEventListener('click', this.uncoverTile);
        this.pairsMatched++;//Añade uno al contador de parejas resueltas
        let falloReciente=(this.recentFailTile1==this.tile1||this.recentFailTile1==this.tile2||this.recentFailTile2==this.tile1||this.recentFailTile2==this.tile2);
        if(falloReciente){
            this.attempts++;
        }
        
        let pointsText=document.getElementById("pointsText");//Obtiene el texto de los puntos que hay sobre el tablero
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
        this.recentFailTile2="";//Quita los intentos y reinicializa las variables.
        pointsText.innerHTML=`Puntos: ${this.currentPoints}/${this.maxPoints}`;//Cambia el texto de los puntos con el nuevo número

        if(this.pairsMatched==this.pairsToWin){//Comprueba si ya se han resuelto las variables necesarias para ganar
            this.win();
        }
    }

    win(){
        this.endTime=new Date();
        let finalTime=Math.floor((this.endTime-this.startTime)/1000);//Obtiene el tiempo total (en milisegundos) y
                                                                    //lo divide entre 1000 para redondear en segundos.
        setTimeout(() => {
            alert(`¡Has ganado!\nHas conseguido ${this.currentPoints} puntos de ${this.maxPoints} disponibles.\nLa partida ha durado ${finalTime} segundos.`);
        }, 500);
    }
}
window.onload=()=>{
    let rowCount = prompt("¿Cuántas filas tendrá que tener el tablero?");
    let colCount = prompt("¿Cuántas columnas tendrá que tener el tablero?");
    let board1 = new Memorin(rowCount, colCount);
    board1.fillBoard();
    board1.printBoard();
    console.log(board1.boardArray);
}