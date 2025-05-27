
document.addEventListener("DOMContentLoaded", () => {
  fetch("defis.json")
    .then(res => res.json())
    .then(defis => {
      const total = defis.length;
      let done = 0;
      defis.forEach(d => {
        if (localStorage.getItem("defi_" + d.nom)) {
          done++;
        }
      });

      const pct = Math.round((done / total) * 100);
      document.getElementById("defis-comptes").textContent = `✅ ${done} défi(s) sur ${total} complétés (${pct}%)`;

      document.getElementById("reset-btn").addEventListener("click", () => {
        defis.forEach(d => {
          localStorage.removeItem("defi_" + d.nom);
        });
        location.reload();
      });
    });
});
