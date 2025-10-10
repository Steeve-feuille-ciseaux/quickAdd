document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('infoModal');
    const modalMessage = document.getElementById('modalMessage');
    const modalClasse = document.getElementById('modalClasse');
    const modalSkill = document.getElementById('modalSkill');
    const modalTheme = document.getElementById('modalTheme');
    const modalObjectif = document.getElementById('modalObjectif');
    const modifierBtn = document.getElementById('modifierBtn');
    const closeModalBtn = document.getElementById('closeModal');

    document.querySelectorAll('.clickable-row').forEach(row => {
        row.addEventListener('click', () => {
            const id = row.getAttribute('data-id');
            const prenom = row.getAttribute('data-prenom');
            const nom = row.getAttribute('data-nom');
            const classe = row.getAttribute('data-classe');
            const skill = row.getAttribute('data-skill');
            const theme = row.getAttribute('data-theme');
            const objectif = row.getAttribute('data-objectif');

            modalMessage.innerHTML = `<strong>Élève :</strong> ${prenom} ${nom}`;
            modalClasse.innerHTML = `<strong>Classe :</strong> ${classe}`;
            modalSkill.innerHTML = `<strong>Compétence :</strong> ${skill}`;
            modalTheme.innerHTML = `<strong>Thème :</strong> ${theme}`;
            modalObjectif.innerHTML = `<strong>Objectif :</strong> ${objectif}`;

            modifierBtn.href = `/admin/club/etudiant/${id}/change/`;
            modal.style.display = 'flex';
        });
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
