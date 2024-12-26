const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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
                button.textContent = prevMonthDate++;
                button.className = "date-button inactive-date";
                button.disabled = true;
            } else if (date > daysInMonth) {
                button.textContent = nextMonthDate++;
                button.className = "date-button inactive-date";
                button.disabled = true;
            } else {
                button.textContent = date;
                button.className = "date-button";
                if (
                    date === currentDate.getDate() &&
                    month === currentDate.getMonth() &&
                    year === currentDate.getFullYear()
                ) {
                    button.classList.add("current-date");
                }
                button.addEventListener("click", () => alert(`You selected: ${date} ${monthNames[month]} ${year}`));
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