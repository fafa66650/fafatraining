// coach.js : gère l'affichage et modification dynamique du profil

document.addEventListener("DOMContentLoaded", () => {
  const profil = JSON.parse(localStorage.getItem("profil_fafa"));

  const container = document.getElementById("profil-details");
  if (!profil || !container) {
    container.innerHTML = "<p>Aucun profil enregistré. Veuillez créer un profil utilisateur.</p>";
    return;
  }

  container.innerHTML = `
    <h2>👋 Bonjour ${profil.prenom}</h2>
    <ul>
      <li><strong>Âge :</strong> ${profil.age}</li>
      <li><strong>Genre :</strong> ${profil.genre}</li>
      <li><strong>Objectif :</strong> ${profil.objectif.replace('_', ' ')}</li>
      <li><strong>Matériel :</strong> ${profil.materiel.join(", ")}</li>
    </ul>
    <button onclick="window.location.href='modifier_profil.html'">✏️ Modifier mon profil</button>
  `;
});