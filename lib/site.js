$(document).ready(function () {
    loadGraph();
    const form = document.getElementById('multipage-form');
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('change', function () {
            localStorage.setItem(input.id, input.value);
        });
        const savedValue = localStorage.getItem(input.id);
        if (savedValue) {
            input.value = savedValue;
        }
    });
});

//a function to clear data from the local storage
function clearData() {
    localStorage.clear();
}

let scores = [10];

function calculateScore() {
    let score1 = 0;
    let score2 = 0;
    let score3 = 0;
    let score4 = 0;
    let score5 = 0;
    let score6 = 0;
    let score7 = 0;
    let score8 = 0;
    let score9 = 0;
    let score10 = 0;
    const questions = document.querySelectorAll('select');
    questions.forEach(question => {
        const selectedOption = question.options[question.selectedIndex];
        const categorienumber = selectedOption.getAttribute('categorienumber');
        const score = parseInt(selectedOption.getAttribute('data-score'));
        if (categorienumber === '1') {
            score1 += score;
        } else if (categorienumber === '2') {
            score2 += score;
        } else if (categorienumber === '3') {
            score3 += score;
        } else if (categorienumber === '4') {
            score4 += score;
        } else if (categorienumber === '5') {
            score5 += score;
        } else if (categorienumber === '6') {
            score6 += score;
        } else if (categorienumber === '7') {
            score7 += score;
        } else if (categorienumber === '8') {
            score8 += score;
        } else if (categorienumber === '9') {
            score9 += score;
        } else if (categorienumber === '10') {
            score10 += score;
        }
    });
    //add all scores to the scores array
    scores.push(score1, score2, score3, score4, score5, score6, score7, score8, score9, score10);
    console.log(scores);
    document.getElementById('yourResult').style.display = 'block';
}


//make this function showPage('page1')
function showPage(pageId) {
    const pages = document.getElementsByClassName('page');
    for (let i = 0; i < pages.length; i++) {
        if (pages[i].id === pageId) {
            pages[i].style.display = 'block';
        } else {
            pages[i].style.display = 'none';
        }
    }
    document.getElementById('lblQuestion').style.display = 'none';
    document.getElementById('bntTest').style.display = 'none';
}
document.getElementById('submitBtn').addEventListener('click', function () {
    // Check if required fields are filled
    const name = document.getElementById('name').value;
    const prenom = document.getElementById('prenom').value;
    const email = document.getElementById('email').value;

    if (name.trim() === '' || prenom.trim() === '' || email.trim() === '') {
        alert('Veuillez remplir tous les champs obligatoires.');
        if (name.trim() === '') {
            document.getElementById('name').classList.add('error');
        }
        if (prenom.trim() === '') {
            document.getElementById('prenom').classList.add('error');
        }
        if (email.trim() === '') {
            document.getElementById('email').classList.add('error');
        }
        return;
    }
    calculateScore();
    newGraph();
    hideModal();
    document.getElementById('yourResult').style.display = 'block';
    document.getElementById('multipage-form').style.display = 'none';
    clearData();
    //document.getElementById('multipage-form').submit();
});
function hideModal() {
    $('#myModal').modal('hide');
}
function showModal() {
    setTimeout(function () {
        $('#myModal').modal('show');
    }, 500);
}


function showErrorModal() {
    setTimeout(function () {
        $('#errorModal').modal('show');
    }, 500);
}

let currentPage = 1;
const form = document.getElementById('multipage-form');
const pages = form.getElementsByClassName('page');

function nextPage() {
    if (currentPage < pages.length) {
        // Validate fields before changing page
        if (!validateFields()) {
            return;
        }
        pages[currentPage - 1].style.display = 'none';
        pages[currentPage].style.display = 'block';
        currentPage++;
    }
}

function validateFields() {
    const currentPageFields = pages[currentPage - 1].querySelectorAll('select[required]');
    let isValid = true;

    currentPageFields.forEach(field => {
        if (field.value.trim() === '') {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });

    if (!isValid) {
        showErrorModal();
    }

    return isValid;
}

function previousPage() {
    if (currentPage > 1) {
        pages[currentPage - 1].style.display = 'none';
        pages[currentPage - 2].style.display = 'block';
        currentPage--;
    }
}

// Données du graphique
const xValues = [
    "CONFIDENCE EN SOI",
    "MOTIVATION/ATTITUDE",
    "MÉTHODE DE TRAVAIL",
    "OBJECTION",
    "PROSPECTION",
    "ACCUEIL",
    "QUALIFICATION",
    "DÉMONSTRATION",
    "CLOSING",
    "FIDÉLISATION"
];

const yValues = [75, 60, 80, 40, 70, 55, 65, 90, 50, 85];

// Vérifier et remplacer les valeurs "undefined" dans xValues
for (let i = 0; i < xValues.length; i++) {
    if (typeof xValues[i] === 'undefined') {
        xValues[i] = "Label par défaut"; // Remplacer par un label par défaut
    }
}
function loadGraph(){
    new Chart("monGraphique", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                label: "Performances",
                backgroundColor: "#ad1510", // Couleur des barres
                data: yValues // Valeurs des barres
            }]
        },
        options: {
            responsive: true, // Rendre le graphique réactif
            maintainAspectRatio: false, // Empêcher l'ajustement automatique de la taille
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: 10, // Intervalles de l'axe Y
                        max: 100,
                        callback: function (value, index, values) {
                            return value + "%";
                        }
                    }
                }]
            }
        }
    });
}

function newGraph() {
    new Chart("resultGraphique", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                label: "Performances",
                backgroundColor: "#ad1510", // Couleur des barres
                data: scores // Valeurs des barres
            }]
        },
        options: {
            responsive: true, // Rendre le graphique réactif
            maintainAspectRatio: false, // Empêcher l'ajustement automatique de la taille
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: 10, // Intervalles de l'axe Y
                        max: 100,
                        callback: function (value, index, values) {
                            return value + "%";
                        }
                    }
                }]
            }
        }
    });
}