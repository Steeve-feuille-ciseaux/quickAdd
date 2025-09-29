document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-confirm').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if(this.classList.contains('confirmed')) return; // déjà confirmé

            const etudiantId = this.dataset.id;

            fetch(`/valider-presence/${etudiantId}/`, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}) // tu peux envoyer des données si besoin
            })
            .then(resp => {
                if (resp.ok) {
                    this.classList.add('confirmed');
                    this.textContent = '✅ Confirmé';
                    this.style.pointerEvents = 'none';
                } else {
                    alert('Erreur lors de la confirmation.');
                }
            })
            .catch(() => alert('Erreur réseau.'));
        });
    });
});

// Fonction pour récupérer le cookie CSRF (nécessaire pour POST en Django)
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