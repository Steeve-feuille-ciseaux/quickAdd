document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('infoModal');
    const modalMessage = document.getElementById('modalMessage');
    const modalTheme = document.getElementById('modalTheme');
    const modalObjectif = document.getElementById('modalObjectif');
    const modalSkill = document.getElementById('modalSkill');
    const modifierBtn = document.getElementById('modifierBtn');
    const closeModalBtn = document.getElementById('closeModal');

    // Quand on clique sur une ligne d'étudiant
    document.querySelectorAll('.clickable-row').forEach(row => {
        row.addEventListener('click', () => {
            const info = row.getAttribute('data-info');
            const theme = row.getAttribute('data-theme') || 'Non renseigné';
            const objectif = row.getAttribute('data-objectif') || 'Non renseigné';
            const skill = row.getAttribute('data-skill') || 'Non renseigné';
            const id = row.getAttribute('data-id');

            modalMessage.textContent = info;
            modalTheme.innerHTML = `<strong>Thème :</strong> ${theme}`;
            modalObjectif.innerHTML = `<strong>Objectif :</strong> ${objectif}`;
            modalSkill.innerHTML = `<strong>Compétence :</strong> ${skill}`;
            modifierBtn.href = `/modifier/${id}/`;

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
