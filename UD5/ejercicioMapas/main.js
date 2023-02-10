const registroPacientes = new Map([
    [`AAA024`, `Fernández M. (321790059) -> C/Recoletos, 50`],  
    [`BCD827`, `Ruíz P. (100973253) -> C/Esquerdo izquierdo, 103`],
    [`YUN835`,`Benítez E. (154811767) -> Av.Argentina, 5`]
]);

const nuevoMapa=new Map([]);

let i=0;
registroPacientes.forEach((value,key)=>{
    i++;
    let nombrePaciente=value.split(". ",1);
    let numeroSS=value.split(" ",3)
    let direccion=value.split(") -> ");
    console.log("dir:"+direccion);
    let texto="\nnumeroRegistro: "+key+", \nnombreCompleto: "+nombrePaciente+". \nnumeroSS: "+numeroSS[2]+" \ndirección: "+direccion[1];
    nuevoMapa.set(`Paciente ${i}`,texto);
})

console.log(nuevoMapa);