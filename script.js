// Элементы DOM
const coinContainer = document.getElementById('coinContainer');
const flipBtn = document.getElementById('flipBtn');
const result = document.getElementById('result');
const headsSide = document.getElementById('headsSide');
const tailsSide = document.getElementById('tailsSide');

// Состояние монетки
let isFlipping = false;
let currentSide = 'heads'; // Начинаем с орла

// Функция для подбрасывания монетки
function flipCoin() {
    // Если монетка уже в процессе броска, выходим
    if (isFlipping) return;
    
    // Устанавливаем флаг броска
    isFlipping = true;
    
    // Генерируем случайный результат (50/50)
    const randomResult = Math.random() < 0.5 ? 'heads' : 'tails';
    
    // Добавляем класс анимации
    coinContainer.classList.add('flipping');
    
    // Блокируем кнопку
    flipBtn.disabled = true;
    flipBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> FLIPPING';
    
    // Очищаем предыдущий результат
    result.textContent = '';
    
    // Ждем завершения анимации (1.2 секунды)
    setTimeout(() => {
        // Убираем класс анимации
        coinContainer.classList.remove('flipping');
        
        // Скрываем текущую сторону
        if (currentSide === 'heads') {
            headsSide.classList.remove('active');
        } else {
            tailsSide.classList.remove('active');
        }
        
        // Показываем новую сторону
        if (randomResult === 'heads') {
            headsSide.classList.add('active');
        } else {
            tailsSide.classList.add('active');
        }
        
        // Обновляем текущую сторону
        currentSide = randomResult;
        
        // Показываем результат
        result.textContent = `It's ${randomResult.toUpperCase()}!`;
        
        // Разблокируем кнопку
        flipBtn.disabled = false;
        flipBtn.innerHTML = '<i class="fas fa-sync-alt"></i> FLIP';
        
        // Сбрасываем флаг броска
        isFlipping = false;
    }, 1200);
}

// Обработчик клика по кнопке
flipBtn.addEventListener('click', flipCoin);

// Обработчик клика по монетке
coinContainer.addEventListener('click', flipCoin);

// Обработчик нажатия клавиши пробела или Enter
document.addEventListener('keydown', (event) => {
    if ((event.code === 'Space' || event.code === 'Enter') && !isFlipping) {
        event.preventDefault();
        flipCoin();
    }
});

// Инициализация - показываем сторону heads
headsSide.classList.add('active');
tailsSide.classList.remove('active');