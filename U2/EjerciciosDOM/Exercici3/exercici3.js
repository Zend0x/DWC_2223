
function insertarNuevoParrafo(){
    let nuevoParrafo=prompt("¿Qué debería poner en el nuevo párrafo?");
    let posicionParrafo=prompt("¿Dónde debería estar el nuevo párrafo?");
    
    let parrafosDocumento=document.getElementsByTagName("li");

    parrafosDocumento.splice(posicionParrafo,0,nuevoParrafo);
}

window.addEventListener("load", (event) => {
    insertarNuevoParrafo();
});