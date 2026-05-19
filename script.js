document.getElementById('btnCalcular').addEventListener('click', function() {

    const cliente = document.getElementById('cliente').value.trim();
    const sucursal = document.getElementById('sucursal').value.trim();
    const nombresAspectos = document.querySelectorAll('.aspect-name');
    const ratings = document.querySelectorAll('.aspect-rating');
    const weights = document.querySelectorAll('.aspect-weight');
    const errorArea = document.getElementById('errorArea');
    const resultadoArea = document.getElementById('resultadoArea');


    errorArea.classList.add('hidden');
    resultadoArea.classList.add('hidden');
    let errores = [];


    if (!cliente) errores.push("El nombre del cliente es obligatorio.");
    if (!sucursal) errores.push("La sucursal es obligatoria.");

    let sumaPesos = 0;
    let satisfaccionTotal = 0;

    for (let i = 0; i < 5; i++) {
        const nombre = nombresAspectos[i].value.trim();
        const calif = parseFloat(ratings[i].value);
        const peso = parseFloat(weights[i].value);


        if (!nombre) errores.push(`El aspecto ${i + 1} debe tener un nombre.`);


        if (isNaN(calif) || calif < 1 || calif > 5) {
            errores.push(`La calificación del aspecto ${i + 1} debe estar entre 1 y 5.`);
        }


        if (isNaN(peso) || peso < 0 || peso > 100) {
            errores.push(`El peso del aspecto ${i + 1} debe estar entre 0 y 100.`);
        } else {
            sumaPesos += peso;
        }


        if (!isNaN(calif) && !isNaN(peso)) {
            satisfaccionTotal += (calif * peso / 100);
        }
    }


    if (sumaPesos !== 100) {
        errores.push(`Los pesos deben sumar 100% (actual: ${sumaPesos}%).`);
    }


    if (errores.length > 0) {
        errorArea.innerHTML = "<strong>Corrija los siguientes errores:</strong><ul>" + 
                              errores.map(e => `<li>${e}</li>`).join('') + "</ul>";
        errorArea.classList.remove('hidden');
    } else {
        mostrarResultado(satisfaccionTotal);
    }
});


function mostrarResultado(puntaje) {
    const res = document.getElementById('resultadoArea');
    let categoria = "";
    let claseCSS = "";


    if (puntaje >= 4.5) {
        categoria = "Cliente Promotor";
        claseCSS = "promotor";
    } else if (puntaje >= 3.5) {
        categoria = "Cliente Satisfecho";
        claseCSS = "satisfecho";
    } else if (puntaje >= 2.5) {
        categoria = "Cliente Neutral";
        claseCSS = "neutral";
    } else {
        categoria = "Cliente Detractor";
        claseCSS = "detractor";
    }

    res.className = claseCSS;
    res.innerHTML = `<strong>Resultado:</strong> ${puntaje.toFixed(2)} - ${categoria}`;
    res.classList.remove('hidden');
}