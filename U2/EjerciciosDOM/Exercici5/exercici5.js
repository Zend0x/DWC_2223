function invertirParrafos(){
    let parrafosDocumento=document.getElementsByTagName("p");
    let parrafosBorrar=document.getElementsByTagName("p");
    parrafosDocumento.reverse;
    console.log(parrafosDocumento);
    for(let i=0;i<parrafosDocumento.length;i++){
        document.body.appendChild(parrafosDocumento[i]);
    }
}