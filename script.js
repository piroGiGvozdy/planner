let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function generateCalendar() {
    const calendarBody = document.getElementById("calendar-body");
    const currentMonthDisplay = document.getElementById("current-month");
    
    const monthNames = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];
    
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Обновляем название текущего месяца и года
    currentMonthDisplay.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    // Очищаем календарь
    calendarBody.innerHTML = "";

    // Определяем стартовый день недели
    const startDay = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;

    let dayCounter = 1;

    // Создаем строки таблицы
    for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");
        
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement("td");
            const button = document.createElement("button");
            
            if (i === 0 && j < startDay) {
                // Пустые ячейки перед началом месяца
                cell.classList.add("empty");
            } else if (dayCounter > lastDateOfMonth) {
                // Пустые ячейки после конца месяца
                cell.classList.add("empty");
            } else {
                // Заполняем дни
                button.textContent = dayCounter;
                if (
                    dayCounter === new Date().getDate() &&
                    currentMonth === new Date().getMonth() &&
                    currentYear === new Date().getFullYear()
                ) {
                    cell.classList.add("today");
                }
                dayCounter++;
            }
            cell.appendChild(button);
            row.appendChild(cell);
        }

        calendarBody.appendChild(row);

        if (dayCounter > lastDateOfMonth) break;
    }
}

// Обработчики кнопок
document.getElementById("prev-month").addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar();
});

document.getElementById("next-month").addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar();
});

// Генерация календаря при загрузке страницы
document.addEventListener("DOMContentLoaded", generateCalendar);
