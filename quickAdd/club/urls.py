from django.urls import path
from . import views

urlpatterns = [
    path('', views.ajouter_etudiant, name='ajouter_etudiant'),
    path('liste/', views.liste_etudiants, name='liste_etudiants'),
]
