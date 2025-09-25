from django.shortcuts import render, redirect
from .forms import EtudiantForm
from .models import Etudiant

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
    return render(request, 'club/liste_etudiants.html', {'etudiants': etudiants})
