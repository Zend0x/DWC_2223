class Tablero {
        constructor(filas, columnas) {
            this.filas = filas;
            this.columnas = columnas;

            this.crearTablero();
        }

        crearTablero() {
            // Crear array bidimensional para guardar las minas
            this.arrayTablero = [];

            for (let fila = 0; fila < this.filas; fila++) {
                this.arrayTablero[fila] = [];

                for (let columna = 0; columna < this.columnas; columna++) {
                    this.arrayTablero[fila][columna] = '';
                }
            }
        }

        dibujarTablero() {
            // Creamos el tablero en html
            document.write('<table>');

            for (let i = 0; i < this.filas; i++) {
                document.write('<tr>');

                for (let j = 0; j < this.columnas; j++) {
                    document.write(`<td>${this.arrayTablero[i][j]}</td>`);
                }

                document.write('</tr>');
            }
            document.write('</table>');
        }

        dibujarTableroDOM() {
            let table = document.createElement('table');
            document.body.appendChild(table);

            for (let i = 0; i < this.filas; i++) {
                let tr = document.createElement('tr');
                table.appendChild(tr);

                for (let j = 0; j < this.columnas; j++) {
                    let td = document.createElement('td');
                    td.setAttribute("id",`f${i}_c${j}`);
                    td.dataset.fila=i;
                    td.dataset.columna=j;
                    td.setAttribute("class"," ");

                    tr.appendChild(td);
                    //document.write(`<td>${this.arrayTablero[i][j]}</td>`);
                }
            }
        }

        modificarFilas(nuevasFilas) {
            // Modificar el número de filas y volver a crear el tablero con las filas nuevas
            this.filas = nuevasFilas;

            this.crearTablero();
        }

        modificarColumnas(nuevasColumnas) {
            // Modificar el número de columnas y volver a crear el tablero con las columnas nuevas
            this.columnas = nuevasColumnas;

            this.crearTablero();
        }
        


    }

    //Inicio de la clase Buscaminas
    class Buscaminas extends Tablero {
        constructor(filas, columnas, numMinas) {
            super(filas, columnas);
            this.numMinas = numMinas;

            this.colocarMinas();
            this.colocarNumeros();
        }

        colocarMinas() {
            let contadorMinas = 0;
            let posFila;
            let posColumna;


            while (contadorMinas < this.numMinas) {
                posFila = Math.floor(Math.random() * this.filas);
                posColumna = Math.floor(Math.random() * this.columnas);

                if (this.arrayTablero[posFila][posColumna] != 'MINA') {
                    this.arrayTablero[posFila][posColumna] = 'MINA';
                    contadorMinas++;
                };
            };
        }

        colocarNumeros() {
            let minasAlrededor = 0;
            for (let fila = 0; fila < this.filas; fila++) {
                for (let columna = 0; columna < this.columnas; columna++) {
                    minasAlrededor = 0;
                    if (this.arrayTablero[fila][columna] != "MINA") {
                        for (let cFila = fila - 1; cFila <= fila + 1; cFila++) {
                            if (cFila >= 0 && cFila < this.filas) {
                                for (let cColumna = columna - 1; cColumna <= columna + 1; cColumna++) {
                                    if ((cColumna >= 0 && cColumna < this.columnas) && (this.arrayTablero[cFila][cColumna] == "MINA")) {
                                        minasAlrededor++;
                                    }
                                }
                            }
                        }
                        this.arrayTablero[fila][columna] = minasAlrededor;
                    }
                }
            }
        }  
    }




document.addEventListener("DOMContentLoaded",function(event){
    function anadirListeners(){
        let celda;

        for(let i=0;i<this.filas;i++){
            for(let j=0;j<this.columnas;j++){
                celda=document.getElementById(`f${i}_c${j}`);

                celda.addEventListener('click',this.despejarCelda);
                celda.addEventListener('contextmenu',this.marcarCelda);
            }
        }
    }


    function marcarCelda(){
        //Para que al dar click derecho no salga el menú de opciones
        document.oncontextmenu=function(){return false};
        //Usando un switch
            if(this.getAttribute("class")!="despejado"){
                switch (this.getAttribute("class")) {
                    case " ":
                        this.setAttribute("class","flagged");
                        break;
                    case "flagged":
                        this.setAttribute("class","dudoso");
                        break;
                    default:
                        this.setAttribute("class"," ");
                        break;
                }
            
            }
             
        }

        function despejarCelda(){
            this.setAttribute("class","despejado");
            let fila=this.dataset.fila;
            let columna=this.dataset.columna; 
        }
})

window.onload=function(){
    let buscaminas1 = new Buscaminas(5, 5, 5);
    console.log(buscaminas1.arrayTablero);
    buscaminas1.dibujarTableroDOM();
}  