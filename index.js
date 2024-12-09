const images = ['bầu', 'cua', 'cá', 'gà', 'nai', 'tôm'];  
const maxBet = 3;  
let bets = {
    'bầu': 0,
    'cua': 0,
    'cá': 0,
    'gà': 0,
    'nai': 0,
    'tôm': 0
};
let isSpinning = false;
let spinResult = [];


const quayBtn = document.getElementById('quay-btn');
const resetBtn = document.getElementById('reset-btn');
const imageBoxes = document.querySelectorAll('.image-box');
const spinImages = [document.getElementById('spin1'), document.getElementById('spin2'), document.getElementById('spin3')];


imageBoxes.forEach(box => {
    box.addEventListener('click', function () {
        if (isSpinning) return; 
        const id = box.id;
        if (bets[id] < maxBet) {
            bets[id]++;
            box.style.border = '3px solid red';  
            console.log(`Đặt cược vào ${id}: ${bets[id]}`);
        }
    });
});

quayBtn.addEventListener('click', function () {
    if (isSpinning) return;

    isSpinning = true;
    spinResult = [];
    console.clear();  

    
    let spinCount = 0;
    const interval = setInterval(() => {
        spinCount++;
        spinImages.forEach(img => {
            const randomImage = images[Math.floor(Math.random() * images.length)];
            img.style.backgroundImage = `url(${randomImage}.png)`;
        });

        if (spinCount === 100) {
            clearInterval(interval);
            
            spinImages.forEach(img => {
                const randomImage = images[Math.floor(Math.random() * images.length)];
                spinResult.push(randomImage);
                img.style.backgroundImage = `url(${randomImage}.png)`;
            });

            console.log(`Kết quả quay: ${spinResult.join(', ')}`);
            isSpinning = false;
            checkResult();  
        }
    }, 50);
});


resetBtn.addEventListener('click', function () {
    bets = {
        'bầu': 0,
        'cua': 0,
        'cá': 0,
        'gà': 0,
        'nai': 0,
        'tôm': 0
    };
    imageBoxes.forEach(box => box.style.border = '1px solid #000');
    console.log("Đặt lại cược.");
});


function checkResult() {
    const betTotal = Object.values(bets).reduce((a, b) => a + b, 0);
    const resultCount = spinResult.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
    }, {});

    let correct = true;

    Object.keys(bets).forEach(id => {
        if (bets[id] !== (resultCount[id] || 0)) {
            correct = false;
        }
    });

    if (correct) {
        console.log(`Bạn đã đoán đúng với kết quả: ${spinResult.join(', ')}`);
    } else {
        console.log(`Bạn đã đoán sai với kết quả: ${spinResult.join(', ')}`);
    }
}
