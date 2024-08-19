document.addEventListener("DOMContentLoaded", function() {
    const rows = Array.from(document.querySelectorAll("tbody tr"));
    const delay = 20; 

    function updateScores() {
        let completed = 0;
        rows.forEach((row, index) => {
            const scoreCell = row.querySelector("td:last-child .animate-score");
            const finalScore = parseInt(scoreCell.dataset.score);
            let currentScore = 0;

            const interval = setInterval(() => {
                if (currentScore < finalScore) {
                    currentScore += Math.ceil(finalScore / 100); 
                    if (currentScore > finalScore) currentScore = finalScore;
                    scoreCell.textContent = currentScore;
                } else {
                    clearInterval(interval);
                    completed++;
                    if (completed === rows.length) {
                        updateTable();
                    }
                }
            }, delay);
        });
    }

    function updateTable() {
        const tbody = document.querySelector("tbody");
        const sortedRows = rows.sort((a, b) => {
            const scoreA = parseInt(a.querySelector("td:last-child .animate-score").textContent);
            const scoreB = parseInt(b.querySelector("td:last-child .animate-score").textContent);
            return scoreB - scoreA;
        });

        tbody.innerHTML = "";
        sortedRows.forEach(row => tbody.appendChild(row));

        rows.forEach(row => row.classList.remove("highlight"));
        if (sortedRows.length > 0) {
            sortedRows[0].classList.add("highlight");
        }
    }

    updateScores();
});