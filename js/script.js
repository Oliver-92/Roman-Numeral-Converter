const userInput = document.getElementById('number');
const checkButton = document.getElementById('convert-btn');
const result = document.getElementById('output');

function isValid(str) {
    const int = parseInt(str, 10);
    let errorText = '';

    if (!str || str.match(/[e.]/g)) {
        errorText = 'Please enter a valid number.';
    } else if (isNaN(int)) {
        errorText = 'Invalid number. Please input a number.';
    } else if (int < 1) {
        errorText = 'Please enter a number greater than or equal to 1.';
    } else if (int > 3999) {
        errorText = 'Please enter a number less than or equal to 3999.';
    } else {
        return { isValid: true, int }; // Devuelve un objeto con el número convertido
    }

    result.innerText = errorText;
    return { isValid: false };
}

function convertToRoman(num) {
    const romanNumerals = [
        ["M", 1000],
        ["CM", 900],
        ["D", 500],
        ["CD", 400],
        ["C", 100],
        ["XC", 90],
        ["L", 50],
        ["XL", 40],
        ["X", 10],
        ["IX", 9],
        ["V", 5],
        ["IV", 4],
        ["I", 1]
    ];

    let romanNum = "";
    let remaining = num;

    for (const [roman, value] of romanNumerals) {
        while (remaining >= value) {
            romanNum += roman;
            remaining -= value;
        }
    }

    return romanNum;
}

function update() {
    const numStr = userInput.value;
    const validation = isValid(numStr);

    if (validation.isValid) {
        const int = validation.int; // Número validado
        result.innerText = convertToRoman(int);
        userInput.value = ''; // Limpia el input solo si el número es válido
    }
}

// Escucha el evento de tecla "Enter" en el input
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') update();
});

// Asociar el evento al botón
checkButton.addEventListener('click', update);