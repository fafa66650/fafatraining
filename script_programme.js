
document.addEventListener('DOMContentLoaded', () => {
  const programmeSport = document.getElementById('programme-sportif');
  const filtreForm = document.getElementById('filtre-form');

  async function chargerJSON(fichier) {
    const res = await fetch(fichier);
    return res.json();
  }

  function obtenirSelections(formulaire) {
    const formData = new FormData(formulaire);
    const data = {};
    for (const [key, value] of formData.entries()) {
      if (!data[key]) data[key] = [];
      data[key].push(value);
    }
    return data;
  }

  async function genererProgramme(event) {
    if (event) event.preventDefault();
    const filtres = obtenirSelections(filtreForm);
    const exos = await chargerJSON('exercices_fafa.json');

    const resultat = exos.filter(ex => {
      return (!filtres.niveau || filtres.niveau.includes(ex.niveau)) &&
             (!filtres.materiel || filtres.materiel.includes(ex.materiel)) &&
             (!filtres.zone || filtres.zone.includes(ex.zone_ciblee)) &&
             (!filtres.categorie || filtres.categorie.includes(ex.categorie)) &&
             (!filtres.sport || filtres.sport.includes(ex.sport_associe)) &&
             (!filtres.public || filtres.public.includes(ex.public_cible));
    });

    programmeSport.innerHTML = resultat.length ?
      resultat.map(e => `<li>${e.nom} (${e.categorie}, ${e.zone_ciblee})</li>`).join('') :
      "<p>Aucun exercice trouvé selon vos critères.</p>";
  }

  filtreForm?.addEventListener('submit', genererProgramme);
});
