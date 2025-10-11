document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('infoModal');
    const modalMessage = document.getElementById('modalMessage');
    const modifierBtn = document.getElementById('modifierBtn');
    const closeModalBtn = document.getElementById('closeModal');
    const supprimerBtn = document.getElementById('supprimerBtn');

    // Quand on clique sur une ligne d'étudiant
    document.querySelectorAll('.clickable-row').forEach(row => {
        row.addEventListener('click', () => {
            const info = row.getAttribute('data-info');
            const theme = row.getAttribute('data-theme') || 'Non renseigné';
            const objectif = row.getAttribute('data-objectif') || 'Non renseigné';
            const skill = row.getAttribute('data-skill') || 'Non renseigné';
            const id = row.getAttribute('data-id');

            modalMessage.textContent = info;
            document.getElementById('themeText').textContent = theme;
            document.getElementById('objectifText').textContent = objectif;
            document.getElementById('skillText').textContent = skill;

            modifierBtn.href = `/modifier/${id}/`;
            supprimerBtn.href = `/supprimer/${id}/`;
            modal.style.display = 'flex';
        });
    });

    // Fermer la modale
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Fermer si on clique en dehors du contenu
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
