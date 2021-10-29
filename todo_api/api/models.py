from django.db import models

# Create your models here.
class Task(models.Model):
    content = models.CharField(max_length=200)
    completed = models.BooleanField(default=False, null=False, blank=False)

    def __str__(self):
        return self.content[:30]