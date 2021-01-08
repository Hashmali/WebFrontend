from django.db import models

from api.worker.models import User
from api.project.models import Project


class Schedule(models.Model):
    title = models.CharField(max_length=30,blank=True, null=True)
    worker=models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    description=models.TextField(blank=True, null=True)
    date=models.DateField()
    start_hour=models.TimeField()
    ending_hour=models.TimeField()
    project=models.ForeignKey(Project,on_delete=models.CASCADE,null=True)
    image = models.ImageField(upload_to='images/',blank=True,null=True)

    def __str__(self):
        if not self.title:
            return "no title"
        return self.title

