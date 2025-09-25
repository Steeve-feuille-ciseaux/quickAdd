from django.shortcuts import render, redirect
from .forms import EtudiantForm
from .models import Etudiant
from collections import Counter

def ajouter_etudiant(request):
    if request.method == 'POST':
        form = EtudiantForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('liste_etudiants')
    else:
        form = EtudiantForm()
    return render(request, 'club/ajouter_etudiant.html', {'form': form})

def liste_etudiants(request):
    etudiants = Etudiant.objects.all()

    total_inscrits = etudiants.count()

    # Compter le nombre d'étudiants par niveau
    niveaux = etudiants.values_list('niveau', flat=True)
    inscrits_par_niveau = dict(Counter(niveaux))

    context = {
        'etudiants': etudiants,
        'total_inscrits': total_inscrits,
        'inscrits_par_niveau': inscrits_par_niveau,
    }
    return render(request, 'club/liste_etudiants.html', context)
