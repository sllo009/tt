// الحروف المستخدمة داخل الأشكال السداسية
const letters = [
    'ج', 'ط', 'خ', 'ف', 'ض',
    'ح', 'ك', 'ر', 'غ', 'ق',
    'ب', 'س', 'ظ', 'ذ', 'ز',
    'ت', 'ص', 'ع', 'م', 'ل'
];

const hexGrid = document.querySelector('.hex-grid');
const resetButton = document.getElementById('reset-button');
const undoButton = document.getElementById('undo-button');

let history = [];

// إنشاء الأشكال السداسية
const createHex = (letter) => {
    const hex = document.createElement('div');
    hex.className = 'hex';
    hex.textContent = letter;
    hex.setAttribute('data-color', 'white');
    hex.style.backgroundColor = 'white';

    hex.addEventListener('click', () => {
        const currentColor = hex.getAttribute('data-color');
        let newColor;

        // تغيير الألوان بالتسلسل
        if (currentColor === 'white') {
            newColor = 'red';
        } else if (currentColor === 'red') {
            newColor = 'green';
        } else {
            newColor = 'white';
        }

        hex.setAttribute('data-color', newColor);
        hex.style.backgroundColor = newColor;

        // إضافة الإجراء إلى التاريخ للتراجع
        history.push(() => {
            hex.setAttribute('data-color', currentColor);
            hex.style.backgroundColor = currentColor;
        });
    });

    return hex;
};

// إنشاء الشبكة السداسية
letters.forEach(letter => {
    hexGrid.appendChild(createHex(letter));
});

// زر إعادة
resetButton.addEventListener('click', () => {
    document.querySelectorAll('.hex').forEach(hex => {
        hex.setAttribute('data-color', 'white');
        hex.style.backgroundColor = 'white';
    });
    history = [];
});

// زر التراجع
undoButton.addEventListener('click', () => {
    const lastAction = history.pop();
    if (lastAction) {
        lastAction();
    }
});
