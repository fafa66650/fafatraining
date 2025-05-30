
document.addEventListener("DOMContentLoaded", () => {
  const resultEl = document.getElementById("programme-nutrition");
  const selectObjectif = document.getElementById("objectif-nutrition");

  selectObjectif?.addEventListener("change", () => {
    const objectif = selectObjectif.value;
    fetch("nutrition_programmes.json")
      .then(res => res.json())
      .then(data => {
        const plan = data[objectif];
        if (plan && resultEl) {
          resultEl.innerHTML = `
            <h2>🍽️ Plan Nutrition - ${objectif}</h2>
            <ul>${plan.map(p => `<li>${p}</li>`).join("")}</ul>
          `;
        } else {
          resultEl.innerHTML = "<p>Aucun plan trouvé.</p>";
        }
      });
  });
});
