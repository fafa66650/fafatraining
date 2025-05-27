
document.addEventListener("DOMContentLoaded", () => {
  const listeDefis = document.getElementById("liste-defis");
  const filtreNiveau = document.getElementById("filtre-niveau");
  const dailyDefi = document.getElementById("daily-defi");

  fetch("defis.json")
    .then(res => res.json())
    .then(defis => {
      // Défi du jour (basé sur le jour du mois)
      const dayIndex = new Date().getDate() % defis.length;
      const defiJour = defis[dayIndex];
      dailyDefi.innerHTML = renderCard(defiJour, true);

      // Affichage liste complète
      const renderAll = (niveau = "") => {
        listeDefis.innerHTML = "";
        defis
          .filter(d => !niveau || d.niveau === niveau)
          .forEach(d => {
            listeDefis.innerHTML += renderCard(d);
          });
      };

      filtreNiveau.addEventListener("change", () => {
        renderAll(filtreNiveau.value);
      });

      renderAll();
    });

  function renderCard(defi, isDaily = false) {
    const key = `images/defi_${defi.nom}`images/;
    const done = localStorage.getItem(key);
    return `images/
      <div class="card ${done ? 'done' : ''}">
        <img src="images/${defi.image}" alt="image défi ${defi.nom}" />
        <h3>${defi.nom}</h3>
        <p><strong>Niveau :</strong> ${defi.niveau}</p>
        <p><strong>Thème :</strong> ${defi.theme}</p>
        <p><strong>Objectif :</strong> ${defi.objectif}</p>
        <button onclick="localStorage.setItem('${key}', true);this.closest('.card').classList.add('done');">✅ Terminé</button>
      </div>
    `images/;
  }
});
