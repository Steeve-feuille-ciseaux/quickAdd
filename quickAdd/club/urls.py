from django.urls import path
from . import views

urlpatterns = [
    path('ajout/', views.ajouter_etudiant, name='ajouter_etudiant'),  
    path('', views.liste_etudiants, name='liste_etudiants'),          
    path('export-word/', views.export_word, name='export_word'),
]
