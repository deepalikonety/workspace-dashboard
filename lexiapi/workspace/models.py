
from django.db import models

class Workspace(models.Model):
    name = models.CharField(max_length=100)
    client = models.CharField(max_length=100)
    opponent = models.CharField(max_length=100)
    case_type = models.CharField(max_length=50)
    accused = models.CharField(max_length=100)
    victim = models.CharField(max_length=100)
    allegations = models.TextField()
    facts_summary = models.TextField()
    date_of_incident = models.DateField()
    representatives = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    last_active_at = models.DateTimeField(auto_now=True) 
    def __str__(self):
        return self.name
