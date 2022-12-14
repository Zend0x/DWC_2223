let totalColores=20;
let anchoTabla=4;
let arrayTabla;

function crearTabla(anchoTabla,totalColores){
    //Creación del array
        arrayTabla=[];
        for (let i = 0; i < totalColores; i++) {
            arrayTabla[fila] = [];
        
            for (let j = 0; j < anchoTabla; j++) {
                arrayTabla[totalColores][anchoTabla] = " ";
            }
        }
        return arrayTabla;
}

function rellenarTabla(arrayTabla){
    for(let i=0;i<arrayTabla.length;i++){
        for(let j=0;j<arrayTabla[i].length;j++){
            while(j<3){
                let colorAleatorio=Math.floor(Math.random()*255);
                arrayTabla[i][j]=colorAleatorio;
            }
            arrayTabla[i][j]="color=rgb()";
        }
    }
}
crearTabla();
tabla=rellenarTabla();
console.log(tabla);

