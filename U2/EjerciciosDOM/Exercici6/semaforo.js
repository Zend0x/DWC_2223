function cambiarColor(){
    let rojo=document.getElementById("vermell");
    let ambar=document.getElementById("ambre");
    let verde=document.getElementById("verd");

    let estaRojo=rojo.getAttribute("class")=="ences";
    let estaAmbar=ambar.getAttribute("class")=="ences";
    let estaVerde=verde.getAttribute("class")=="ences";

    if(estaRojo){
        rojo.setAttribute("class","apagat");
        ambar.setAttribute("class","ences");
    }else if(estaAmbar){
        ambar.setAttribute("class","apagat");
        verde.setAttribute("class","ences");
    }else if(estaVerde){
        verde.setAttribute("class","apagat");
        rojo.setAttribute("class","ences");
    }
}