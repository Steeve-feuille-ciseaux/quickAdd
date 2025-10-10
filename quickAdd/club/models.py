from django.db import models
from django.utils import timezone

class Etudiant(models.Model):
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)

    NIVEAU_CHOICES = [('6', '6'), ('5', '5'), ('4', '4'), ('3', '3')]
    niveau = models.CharField(max_length=1, choices=NIVEAU_CHOICES, null=True, blank=True)

    CLASSE_CHOICES = [('a', 'A'), ('b', 'B'), ('c', 'C'), ('d', 'D'), ('e', 'E'), ('f', 'F')]
    classe = models.CharField(max_length=1, choices=CLASSE_CHOICES)

    CLUB_CHOICES = [('club1', 'Web'), ('club2', 'Echec'), ('club3', 'Théatre')]
    THEME_CHOICES = [('theme1', 'Créer des sites web'), ('theme2', 'Coder des jeux'), ('theme3', 'Utiliser GPT')]

    theme = models.CharField(max_length=10, choices=THEME_CHOICES)
    club = models.CharField(max_length=10, choices=CLUB_CHOICES)

    objectif = models.TextField(blank=True, null=True)  # ✅ Nouveau champ ajouté ici

    date_inscription = models.DateField(auto_now_add=True)
    date_presence = models.DateField(null=True, blank=True)
    cours_suivi = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.nom} {self.prenom} {self.niveau}{self.classe} - {self.club}"

class Niveau(models.Model):
    NIVEAU_CHOICES = [
        ('1', 'Claviers'),
        ('2', 'Naviguation'),
        ('3', 'Lecture'),
        ('4', 'Programmation'),
        ('5', 'Création'),
    ]
    nom = models.CharField(max_length=1, choices=NIVEAU_CHOICES, unique=True)

    def __str__(self):
        return dict(self.NIVEAU_CHOICES).get(self.nom, self.nom)
