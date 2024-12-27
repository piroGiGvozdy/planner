const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const monthNamesGenitive = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function generateCalendar(month, year) {
    const calendarBody = document.getElementById("calendar-body");
    const currentMonthDisplay = document.getElementById("current-month");
    calendarBody.innerHTML = "";

    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7; // Adjust for Monday start
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    currentMonthDisplay.textContent = `${monthNames[month]} ${year}`;

    let date = 1;
    let prevMonthDate = daysInPrevMonth - firstDay + 1;
    let nextMonthDate = 1;

    for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement("td");
            const button = document.createElement("button");

            if (i === 0 && j < firstDay) {
                button.className = "date-button inactive-date";
                button.disabled = true;
            } else if (date > daysInMonth) {
                button.className = "date-button inactive-date";
                button.disabled = true;
            } else {
                button.textContent = date;
                button.className = "date-button";
                button.id = `date-${date}-${month + 1}-${year}`;
                if (
                    date === currentDate.getDate() &&
                    month === currentDate.getMonth() &&
                    year === currentDate.getFullYear()
                ) {
                    button.classList.add("current-date");
                }
                date++;
            }
            cell.appendChild(button);
            row.appendChild(cell);
        }

        calendarBody.appendChild(row);

        if (date > daysInMonth) break;
    }
}

document.getElementById("prev-month").addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
});

document.getElementById("next-month").addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
});

generateCalendar(currentMonth, currentYear);

document.getElementById("calendar-body").addEventListener("click", function(event) {
    if (event.target && event.target.classList.contains("date-button")) {
        IdParts = event.target.id.split('-').slice(1);
        const selectedDate = `${IdParts[0]} ${monthNamesGenitive[parseInt(IdParts[1])-1]} ${IdParts[2]}`
        const selectedDateDisplay = document.getElementById("selected-date");
        document.getElementById("calendar").style.display = "none";
        document.getElementById("planner-page").style.display = "inline-block";
        selectedDateDisplay.textContent = selectedDate;
    }
});

document.getElementById("back-button").addEventListener("click", () => {
    document.getElementById("calendar").style.display = "inline-block";
    document.getElementById("planner-page").style.display = "none";
});

function GeneratePlanner() {
    // const firstColumnWidth = "50px";
    const plannerBody = document.getElementById("planner-body");
    
    for (let i = 0; i < 24; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < 2; j++) {
            const cell = document.createElement("td");
            // if (j === 0) {
            //     cell.style.width = firstColumnWidth;
            // }

            if (i < 10 && j === 0) {
                cell.textContent = (i === 9) ? `0${i}:00-${i+1}:00` : `0${i}:00-0${i+1}:00`;
            }
            else if (i >= 10 && j === 0){
                cell.textContent = `${i}:00-${i+1}:00`;
            }
            row.appendChild(cell);
        }
        plannerBody.appendChild(row);
    }
}

GeneratePlanner();

let tg = window.Telegram.WebApp;
tg.expand();

let openModalBtn = document.querySelector(".add-plan");
let closeModalBtn = document.getElementById("close-modal-btn");
let modal = document.getElementById("modal");
let modalOverlay = document.getElementById("modal-overlay");
let submit = document.getElementById("order");

// Открыть модальное окно
openModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
    modalOverlay.style.display = "block";
});

// Закрыть модальное окно
closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
    modalOverlay.style.display = "none";
});

// Закрыть модальное окно при клике на фон
modalOverlay.addEventListener("click", () => {
    modal.style.display = "none";
    modalOverlay.style.display = "none";
});

submit.addEventListener("click", () => {
    // modal.style.display = "none";
    // modalOverlay.style.display = "none";

    let start_time = document.getElementById("start_time").value;
    let end_time = document.getElementById("end_time").value;
    let plan_name = document.getElementById("plan_name").value;

    let data = {
        day: IdParts[0],
        month: monthNamesGenitive[parseInt(IdParts[1])-1],
        year: IdParts[2],
        start_time: start_time,
        end_time: end_time,
        plan_name: plan_name
    }

    tg.sendData(JSON.stringify(data));

    tg.close();
});


