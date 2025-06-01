
function afficherResultats(resultats, type) {
    const conteneur = document.getElementById("resultats");
    conteneur.innerHTML = "";

    if (!resultats || resultats.length === 0) {
        conteneur.innerHTML = `
        <div class="result-card">
            <div class="emoji">😔</div>
            <h1>Aucun ${type} trouvé</h1>
            <p>Il semble qu'aucun ${type} ne corresponde à tes critères. Essaie d'élargir ta sélection.</p>
            <a class="retry" href="interface.html">🔁 Réessayer</a>
        </div>`;
        return;
    }

    resultats.forEach(item => {
        const card = document.createElement("div");
        card.className = "result-card";
        card.innerHTML = `
            <h3>${item.nom || item.titre}</h3>
            <p>${item.description || "Aucune description."}</p>
            <p><strong>Objectif:</strong> ${item.objectif || "Général"}</p>
            ${item.materiel ? `<p><strong>Matériel:</strong> ${item.materiel}</p>` : ""}
            ${item.zone ? `<p><strong>Zone:</strong> ${item.zone}</p>` : ""}
        `;
        conteneur.appendChild(card);
    });
}
