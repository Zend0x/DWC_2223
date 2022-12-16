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
        let caption=document.createElement('caption');
        caption.setAttribute("id","contadorBanderas");
        table.appendChild(caption);
        caption.innerHTML="Quedan "+this.banderasDisponibles+" banderas.";

        for (let i = 0; i < this.filas; i++) {
            let tr = document.createElement('tr');
            table.appendChild(tr);

            for (let j = 0; j < this.columnas; j++) {
                let td = document.createElement('td');
                td.setAttribute("id", `f${i}_c${j}`);
                td.dataset.fila = i;
                td.dataset.columna = j;
                td.setAttribute("class", " ");

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

        this.banderasDisponibles=this.numMinas;
        this.banderasBienPuestas=0;
        this.celdasBienDespejadas=0;

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

    dibujarTableroDOM() {
        super.dibujarTableroDOM();

        let celda;

        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                celda = document.getElementById(`f${i}_c${j}`);

                celda.addEventListener('click', this.despejarCeldaEvento.bind(this));
                celda.addEventListener('contextmenu', this.marcarCelda.bind(this));
            }
        }
    }

    marcarCelda(elEvento) {
        let evento = elEvento || window.event;
        let celda = evento.currentTarget;
        let fila=celda.dataset.fila;
        let columna=celda.dataset.fila;
        
        //Para que al dar click derecho no salga el menú de opciones
        document.oncontextmenu = function () { return false };
        //Usando un switch

        if (celda.getAttribute("class") != "despejado" && celda.getAttribute("class") != 'mina') {
            switch (celda.getAttribute("class")) {
                case " ":
                    if(this.banderasDisponibles>0){
                        celda.setAttribute("class", "flagged");
                        this.banderasDisponibles--;
                        let contadorBanderasTexto=document.getElementById("contadorBanderas");
                        contadorBanderasTexto.innerHTML="Quedan "+this.banderasDisponibles+" banderas.";
                        let filaBandera=celda.dataset.fila;
                        let columnaBandera=celda.dataset.columna;
                        if(this.arrayTablero[filaBandera][columnaBandera]=="MINA"){
                            this.banderasBienPuestas++;
                            this.ganar();
                        }
                    }
                    break;
                case "flagged":
                    celda.setAttribute("class", "dudoso");
                    this.banderasDisponibles++;
                    let contadorBanderasTexto=document.getElementById("contadorBanderas");
                    contadorBanderasTexto.innerHTML="Quedan "+this.banderasDisponibles+" banderas.";
                    break;
                default:
                    celda.setAttribute("class", " ");
                    break;
            }
        }
    }

    despejarCelda(celda) {
        let fila = celda.dataset.fila;
        let columna = celda.dataset.columna;

        celda.dataset.despejado = true;

        let contenidoCelda = this.arrayTablero[fila][columna];
        let esNumero = (contenidoCelda != "MINA" && contenidoCelda != 0);
        let esMina = (contenidoCelda == "MINA");
        let esCero = (contenidoCelda == 0);
        let estaMarcado = (celda.getAttribute("class") == "flagged");

        let arrayFilas;
        let arrayColumnas;

        celda.setAttribute("class", "despejado");

        if (estaMarcado) {
            celda.setAttribute("class", "flagged");
        }
        else if (esNumero) {
            celda.innerHTML = contenidoCelda;
            switch (celda.innerHTML) {
                case "1":
                    celda.setAttribute("style", "color:rgb(0, 57, 214);");
                    break;
                case "2":
                    celda.setAttribute("style", "color:green;");
                    break;
                case "3":
                    celda.setAttribute("style", "color:red;");
                    break;
                case "4":
                    celda.setAttribute("style", "color:navy;");
                    break;
                case "5":
                    celda.setAttribute("style", "color:darkred")
                    break;
                case "6":
                    celda.setAttribute("style", "color:aqua")
                    break;
                case "7":
                    celda.setAttribute("style", "color:black")
                    break;
                case "8":
                    celda.setAttribute("style", "color:gray");
                    break;
            }
            this.celdasBienDespejadas++;
            this.ganar();
        } else if (esCero) {
            if(celda.getAttribute("class")!="flagged"){
                celda.innerHTML = "";
                let fila = parseInt(celda.dataset.fila);
                let columna = parseInt(celda.dataset.columna);

                let estaDestapada = (celda.dataset.despejado == "true");
                for (let cFila = fila - 1; cFila <= fila + 1; cFila++) {
                    if (cFila >= 0 && cFila < this.filas) {
                        for (let cCol = columna - 1; cCol <= columna + 1; cCol++) {
                            if (cCol >= 0 && cCol < this.columnas) {
                                let celdaActual = document.getElementById(`f${cFila}_c${cCol}`);
                                let estaDestapada = (celdaActual.dataset.despejado == "true");

                                if (!estaDestapada) {
                                    this.despejarCelda(celdaActual);
                                }
                            }
                        }
                    }
                }
            }
            this.celdasBienDespejadas++;
            this.ganar();
        } else if (esMina) {
            arrayFilas = celda.parentNode.parentNode.childNodes;
            for (let tr of arrayFilas) {
                arrayColumnas = tr.childNodes;
                for (let td of arrayColumnas) {
                    let filaBomba = td.dataset.fila;
                    let columnaBomba = td.dataset.columna;
                    let valorCeldaBomba = this.arrayTablero[filaBomba][columnaBomba];

                    if (td.lastChild != "") {
                        let banderaMalPuesta = (celda.getAttribute("class") == 'flagged' && contenidoCelda != 'MINA');

                        if(valorCeldaBomba=="MINA"){
                            td.setAttribute("class","minaRoja")
                        }else if(valorCeldaBomba!="MINA"&&td.getAttribute("class")=="flagged"){
                            td.setAttribute("class","error");
                        }
                    }
                }
            }
            setTimeout(function () { alert("Has perdido.") }, 500);
        }
    }

    ganar() {
        let banderasBuenas=(this.banderasBienPuestas==this.numMinas);
        let celdasDespejadas=(this.celdasBienDespejadas==(this.filas*this.columnas)-this.numMinas);

        if(banderasBuenas||celdasDespejadas){
            setTimeout(function () { alert("¡Has ganado!") }, 500);
        }
    }

    despejarCeldaEvento(elEvento) {
        let evento = elEvento || window.event;
        let celda = evento.currentTarget;

        this.despejarCelda(celda);
    }
}

window.onload = function () {
    let buscaminas1 = new Buscaminas(5, 5, 5);
    console.log(buscaminas1.arrayTablero);
    buscaminas1.dibujarTableroDOM();
}  