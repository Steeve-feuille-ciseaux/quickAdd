document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-confirm').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.classList.contains('confirmed')) return;

            const etudiantId = this.dataset.id;

            fetch(`/valider-presence/${etudiantId}/`, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({})
            })
            .then(resp => {
                if (resp.ok) {
                    this.classList.add('confirmed');
                    this.textContent = '✅ Confirmé';

                    // Créer le bouton Annuler
                    const annulerBtn = document.createElement('a');
                    annulerBtn.textContent = 'Annuler';
                    annulerBtn.className = 'btn-annuler';
                    annulerBtn.dataset.id = etudiantId;
                    annulerBtn.href = '#';
                    this.parentElement.appendChild(annulerBtn);
                    attachAnnulerEvent(annulerBtn);

                    this.style.pointerEvents = 'none';
                } else {
                    alert('Erreur lors de la confirmation.');
                }
            })
            .catch(() => alert('Erreur réseau.'));
        });
    });

    document.querySelectorAll('.btn-annuler').forEach(btn => {
        attachAnnulerEvent(btn);
    });
});

function attachAnnulerEvent(btn) {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const etudiantId = this.dataset.id;

        fetch(`/annuler-presence/${etudiantId}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        })
        .then(resp => {
            if (resp.ok) {
                const confirmBtn = this.parentElement.querySelector('.btn-confirm');
                confirmBtn.classList.remove('confirmed');
                confirmBtn.textContent = 'En attente';
                confirmBtn.style.pointerEvents = 'auto';
                this.remove();
            } else {
                alert('Erreur lors de l\'annulation.');
            }
        })
        .catch(() => alert('Erreur réseau.'));
    });
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let c of cookies) {
            c = c.trim();
            if (c.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(c.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
