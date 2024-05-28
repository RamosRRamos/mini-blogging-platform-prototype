from django.db import models

from common.models import IndexedTimeStampedModel


# Create your models here.


class Post(IndexedTimeStampedModel):
    title = models.CharField(max_length=255)
    content = models.TextField()
    author = models.ForeignKey("users.User", on_delete=models.CASCADE)
    is_draft = models.BooleanField(default=True)

    def __str__(self):
        return self.title
