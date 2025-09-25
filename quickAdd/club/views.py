from django.shortcuts import render, redirect
from .forms import EtudiantForm
from .models import Etudiant
from collections import Counter
from django.http import HttpResponse
from docx import Document
from io import BytesIO

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

def export_word(request):
    etudiants = Etudiant.objects.all()

    document = Document()
    document.add_heading('Liste des étudiants inscrits', 0)

    # Ajouter tableau résumé
    total_inscrits = etudiants.count()
    niveaux = etudiants.values_list('niveau', flat=True)
    from collections import Counter
    inscrits_par_niveau = dict(Counter(niveaux))

    # Résumé
    table_resume = document.add_table(rows=2, cols=1 + len(inscrits_par_niveau))
    hdr_cells = table_resume.rows[0].cells
    hdr_cells[0].text = 'Total inscrits'
    for i, niveau in enumerate(inscrits_par_niveau.keys(), start=1):
        hdr_cells[i].text = f'Niveau {niveau}'

    row_cells = table_resume.rows[1].cells
    row_cells[0].text = str(total_inscrits)
    for i, count in enumerate(inscrits_par_niveau.values(), start=1):
        row_cells[i].text = str(count)

    document.add_paragraph()  # saut de ligne

    # Tableau détails
    table = document.add_table(rows=1, cols=5)
    hdr_cells = table.rows[0].cells
    hdr_cells[0].text = 'Prénom'
    hdr_cells[1].text = 'Nom'
    hdr_cells[2].text = 'Niveau'
    hdr_cells[3].text = 'Classe'
    hdr_cells[4].text = 'Thème'

    for etudiant in etudiants:
        row_cells = table.add_row().cells
        row_cells[0].text = etudiant.prenom
        row_cells[1].text = etudiant.nom
        row_cells[2].text = str(etudiant.niveau)
        row_cells[3].text = etudiant.classe
        row_cells[4].text = etudiant.get_theme_display()

    # Préparer le document à retourner en téléchargement
    f = BytesIO()
    document.save(f)
    f.seek(0)

    response = HttpResponse(
        f.read(),
        content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )
    response['Content-Disposition'] = 'attachment; filename=liste_etudiants.docx'
    return response

