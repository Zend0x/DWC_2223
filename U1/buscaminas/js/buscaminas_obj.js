class Tablero {
    constructor(filas, columnas) {
        this.filas = filas;
        this.columnas = columnas;
        
        this.crearTablero();
    }

    crearTablero() {
        this.arrayTablero = [];

        for (let fila = 0; fila < this.filas; fila++) {
            this.arrayTablero[fila] = new Array(this.columnas);

            for (let columna = 0; columna < this.columnas; columna++) {
                this.arrayTablero[fila][columna] = '';
            }
        }
    }

    pintarTablero(){
        document.write('<table>');

        for(let j=0;j<this.columnas;j++){
            for(let i=0;i<this.filas;i++){
                if(arrayTablero[i][j]==0){
                    document.write('<td>'+arrayTablero[i][j]+'</td>');
                }else{
                    document.write('<td>','</td>');
                }
            }
        }
    }
}

const buscaminas = new Tablero(4, 3);
buscaminas.crearTablero();
console.log(buscaminas.arrayTablero);