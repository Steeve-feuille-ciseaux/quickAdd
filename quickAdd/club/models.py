from django.db import models
from django.utils import timezone

class Etudiant(models.Model):
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)

    NIVEAU_CHOICES = [
        ('6', '6'),
        ('5', '5'),
        ('4', '4'),
        ('3', '3'),
    ]
    niveau = models.CharField(max_length=1, choices=NIVEAU_CHOICES, null=True, blank=True)

    CLASSE_CHOICES = [
        ('a', 'A'),
        ('b', 'B'),
        ('c', 'C'),
        ('d', 'D'),
        ('e', 'E'),
        ('f', 'F'),
    ]
    classe = models.CharField(max_length=1, choices=CLASSE_CHOICES)

    CLUB_CHOICES = [
        ('club1', 'Web'),
        ('club2', 'Echec'),
        ('club3', 'Théatre'),
    ]

    THEME_CHOICES = [
        ('theme1', 'Créer des sites web'),
        ('theme2', 'Coder des jeux'),
        ('theme3', 'Utiliser GPT'),
    ]
    theme = models.CharField(max_length=10, choices=THEME_CHOICES)
    club = models.CharField(max_length=10, choices=CLUB_CHOICES)
    date_inscription = models.DateField(default=timezone.now)

    def __str__(self):
        return f"{self.nom} {self.prenom} {self.niveau}{self.classe} - {self.club}"
