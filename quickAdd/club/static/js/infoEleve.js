document.addEventListener('DOMContentLoaded', () => {
const modal = document.getElementById('infoModal');
const modalMessage = document.getElementById('modalMessage');
const closeModalBtn = document.getElementById('closeModal');

// Ouvre la modale avec le message stocké dans l'attribut data-info de la ligne
document.querySelectorAll('.clickable-row').forEach(row => {
    row.addEventListener('click', () => {
        const info = row.getAttribute('data-info');
        modalMessage.textContent = info;
        modal.style.display = 'flex';
    });
});

// Ferme la modale
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fermer la modale si clic en dehors de la boite
modal.addEventListener('click', (e) => {
    if(e.target === modal) {
        modal.style.display = 'none';
    }
});
});