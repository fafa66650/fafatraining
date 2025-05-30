// conseils.js : filtre et affiche dynamiquement les conseils en fonction du profil

async function chargerConseils() {
  const profil = JSON.parse(localStorage.getItem("profil_fafa"));
  const types = ["publics", "nutrition", "competiteur"];
  const container = document.getElementById("conseils-container");
  container.innerHTML = "";

  for (let type of types) {
    const res = await fetch(\`conseils_\${type}.json\`);
    const data = await res.json();

    const filtres = data.filter(c => {
      if (profil.objectif && c.objectif && c.objectif !== profil.objectif) return false;
      if (profil.genre && c.genre && c.genre !== profil.genre) return false;
      if (profil.age && c.age_min && profil.age < c.age_min) return false;
      if (profil.age && c.age_max && profil.age > c.age_max) return false;
      return true;
    });

    filtres.forEach(c => {
      const card = document.createElement("div");
      card.className = "conseil-card";
      card.innerHTML = `
        <h3>${c.titre || "Conseil"}</h3>
        <p>${c.contenu}</p>
        <small>Type : ${type}</small>
      `;
      container.appendChild(card);
    });
  }
}

document.addEventListener("DOMContentLoaded", chargerConseils);