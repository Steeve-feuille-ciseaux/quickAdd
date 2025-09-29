document.addEventListener('DOMContentLoaded', () => {
  const table = document.querySelector('table:nth-of-type(2)'); // 2ème table = détails étudiants
  const headers = table.querySelectorAll('th');
  let sortDirection = Array(headers.length).fill(null); // null = pas trié, true=asc, false=desc

  headers.forEach((header, index) => {
    header.style.cursor = 'pointer';

    header.addEventListener('click', () => {
      const tbody = table.querySelector('tbody');
      const rows = Array.from(tbody.querySelectorAll('tr'));

      // Déterminer type de donnée (texte, nombre, date)
      const isDateCol = ['Date d\'inscription', 'Dernière présence'].includes(header.textContent.trim());
      const isNumCol = ['Cours suivi', 'Total inscrits'].includes(header.textContent.trim());

      // Alterner direction de tri
      sortDirection[index] = !sortDirection[index]; // true = asc, false = desc

      rows.sort((a, b) => {
        const cellA = a.cells[index].textContent.trim();
        const cellB = b.cells[index].textContent.trim();

        if(isDateCol){
          // Convertir dates jj/mm/aaaa en objet Date
          const dateA = cellA === '-' ? new Date(0) : parseDate(cellA);
          const dateB = cellB === '-' ? new Date(0) : parseDate(cellB);
          return sortDirection[index] ? dateA - dateB : dateB - dateA;
        }
        else if(isNumCol){
          const numA = parseInt(cellA) || 0;
          const numB = parseInt(cellB) || 0;
          return sortDirection[index] ? numA - numB : numB - numA;
        }
        else {
          // Tri alphabétique, insensible à la casse
          if(cellA.toLowerCase() < cellB.toLowerCase()) return sortDirection[index] ? -1 : 1;
          if(cellA.toLowerCase() > cellB.toLowerCase()) return sortDirection[index] ? 1 : -1;
          return 0;
        }
      });

      // Supprimer les lignes existantes
      while(tbody.firstChild){
        tbody.removeChild(tbody.firstChild);
      }
      // Réinsérer dans l'ordre trié
      rows.forEach(row => tbody.appendChild(row));

      // Mettre à jour flèches dans les headers
      headers.forEach((h, i) => {
        h.textContent = h.textContent.replace(/ ↑| ↓/g, '');
        if(i === index){
          h.textContent += sortDirection[index] ? ' ↑' : ' ↓';
        }
      });
    });

  });

  function parseDate(str) {
    // format attendu : jj/mm/aaaa
    const parts = str.split('/');
    if(parts.length !== 3) return new Date(0);
    return new Date(parts[2], parts[1] - 1, parts[0]);
  }
});
