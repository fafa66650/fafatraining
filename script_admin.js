// Gestion des exercices
const formExo = document.getElementById("formExercice");
const listExo = document.getElementById("listeExercices");

formExo.addEventListener("submit", e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(formExo));
  const exos = JSON.parse(localStorage.getItem("exercices") || "[]");
  exos.push(data);
  localStorage.setItem("exercices", JSON.stringify(exos));
  afficherExercices();
  formExo.reset();
});

function afficherExercices() {
  const exos = JSON.parse(localStorage.getItem("exercices") || "[]");
  listExo.innerHTML = exos.map(e => `<div>✔ ${e.nom} (${e.zone}, ${e.objectif})</div>`).join("");
}

// Gestion nutrition
const formNutri = document.getElementById("formNutrition");
const listNutri = document.getElementById("listeNutrition");

formNutri.addEventListener("submit", e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(formNutri));
  const nutris = JSON.parse(localStorage.getItem("nutrition") || "[]");
  nutris.push(data);
  localStorage.setItem("nutrition", JSON.stringify(nutris));
  afficherNutritions();
  formNutri.reset();
});

function afficherNutritions() {
  const nutris = JSON.parse(localStorage.getItem("nutrition") || "[]");
  listNutri.innerHTML = nutris.map(n => `<div>🍽 ${n.objectif} (${n.sport})</div>`).join("");
}

// Chargement initial
afficherExercices();
afficherNutritions();
