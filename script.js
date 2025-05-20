const display = document.querySelector('.calculadora-display');
const botones = document.querySelectorAll('.calculadora-botones button');

let operando1 = '';
let operando2 = '';
let operacion = '';
let resultadoMostrado = false;

function actualizarDisplay(valor) {
    display.textContent = valor;
}

botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const valor = boton.textContent;

        if (boton.classList.contains('boton')) {
            if (resultadoMostrado) {
                operando1 = valor;
                resultadoMostrado = false;
            } else {
                operando1 += valor;
            }
            actualizarDisplay(operando1);
        } else if (boton.classList.contains('punto')) {
            if (!operando1.includes('.')) {
                operando1 += '.';
                actualizarDisplay(operando1);
            }
        } else if (
            boton.classList.contains('sumar') ||
            boton.classList.contains('restar') ||
            boton.classList.contains('multiplicar') ||
            boton.classList.contains('dividir')
        ) {
            if (operando1 === '') return;
            operacion = valor;
            operando2 = operando1;
            operando1 = '';
            actualizarDisplay('');
        } else if (boton.id === 'resetear') {
            operando1 = '';
            operando2 = '';
            operacion = '';
            actualizarDisplay('');
        } else if (boton.classList.contains('igual')) {
            if (operando2 === '' || operando1 === '' || operacion === '') return;
            let resultado = 0;
            const a = parseFloat(operando2);
            const b = parseFloat(operando1);
            switch (operacion) {
                case '+': resultado = a + b; break;
                case '-': resultado = a - b; break;
                case 'x': resultado = a * b; break;
                case '/': resultado = b !== 0 ? a / b : 'Error'; break;
            }
            actualizarDisplay(resultado);
            operando1 = resultado.toString();
            operando2 = '';
            operacion = '';
            resultadoMostrado = true;
        }
    });
});