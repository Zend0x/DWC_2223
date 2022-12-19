function numeroEnlaces(){
    let parrafosDocumento=document.getElementsByTagName("p");

    let numeroEnlaces=document.getElementsByTagName("a").length;
    console.log('Enlaces en la página:',numeroEnlaces);

    for(let i=1;i<=parrafosDocumento.length;i++){
        let parrafoActual=parrafosDocumento[i-1];
        let enlacesDelParrafo=parrafoActual.getElementsByTagName("a").length;
        console.log(`Enlaces del párrafo ${i}: ${enlacesDelParrafo}`);
    }
}

document.addEventListener("DOMContentLoaded", function(e) {
    numeroEnlaces();
});
