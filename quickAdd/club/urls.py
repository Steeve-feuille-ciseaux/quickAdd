from django.urls import path
from .views import annuler_presence
from . import views

urlpatterns = [
    path('', views.liste_etudiants, name='liste_etudiants'),
    path('ajout/', views.ajouter_etudiant, name='ajouter_etudiant'),
    path('modifier/<int:etudiant_id>/', views.modifier_etudiant, name='modifier_etudiant'),
    path('annuler-presence/<int:etudiant_id>/', annuler_presence, name='annuler_presence'),
    path('export-word/', views.export_word, name='export_word'),
    path('appel/', views.appel, name='appel'),
    path('valider-presence/<int:etudiant_id>/', views.valider_presence, name='valider_presence'),
]
