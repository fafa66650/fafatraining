
// Variables globales
let exercises = [];
let challenges = [];
let translations = {};
const EXPIRATION_DATE = new Date("2025-12-31T23:59:59");
const VALID_CODE = "FAFA2025";

// Détection de langue
const userLang = navigator.language.startsWith("fr") ? "fr" : "en";

// Charger les traductions
fetch(userLang + ".json")
  .then(res => res.json())
  .then(data => {
    translations = data;
    applyTranslations();
  });

// Appliquer les traductions aux éléments HTML ayant l'attribut data-i18n
function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Charger les données exercices et défis
  Promise.all([
    fetch('exercices_fafa.json').then(res => res.json()),
    fetch('defis.json').then(res => res.json())
  ])
    .then(([exData, chData]) => {
      exercises = exData;
      challenges = chData;
      if (localStorage.getItem("fafaUser")) {
        showProgramSection(localStorage.getItem("fafaUser"));
      }
    })
    .catch(() => alert("Erreur de chargement des données."));

  document.getElementById('login-btn').addEventListener('click', loginUser);
  document.getElementById('generate-program').addEventListener('click', generateProgram);
});

function loginUser() {
  const username = document.getElementById('username').value.trim();
  const code = document.getElementById('access-code').value.trim();
  const now = new Date();

  if (!username || !code) {
    alert("Veuillez entrer votre prénom et votre code d'accès.");
    return;
  }

  if (code !== VALID_CODE) {
    alert("Code d'accès invalide.");
    return;
  }

  if (now > EXPIRATION_DATE) {
    alert("⏳ Ce code est expiré.");
    return;
  }

  localStorage.setItem('fafaUser', username);
  showProgramSection(username);
}

function showProgramSection(username) {
  document.getElementById('login-section').style.display = 'none';
  document.getElementById('program-section').style.display = 'block';
  document.getElementById('user-name').textContent = username;
  document.getElementById('challenge-section').style.display = 'block';
  document.getElementById('stats-section').style.display = 'block';

  displayChallenges();
  displayStats();
}

function displayChallenges() {
  const challengeList = document.getElementById('challenge-list');
  challengeList.innerHTML = '';

  challenges.forEach(challenge => {
    const div = document.createElement('div');
    div.classList.add('challenge-card');
    div.innerHTML = `images/
      <h3>${challenge.nom}</h3>
      <p>${challenge.objectif}</p>
      <p><strong>Durée :</strong> ${challenge.duree}</p>
      <img src="images/img/${challenge.image}" alt="${challenge.nom}" />
    `images/;
    challengeList.appendChild(div);
  });
}

function displayStats() {
  const stats = document.getElementById('user-stats');
  stats.innerHTML = "<p>Statistiques à venir...</p>";
}

function generateProgram() {
  const output = document.getElementById('program-output');
  output.innerHTML = "<p>Génération de programme (placeholder)</p>";
  // Tu peux ici ajouter une logique de sélection en fonction des objectifs
}
