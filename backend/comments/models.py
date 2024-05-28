from django.db import models

# Create your models here.


class Comment(models.Model):
    post = models.ForeignKey("posts.Post", on_delete=models.CASCADE)
    author = models.ForeignKey("users.User", on_delete=models.CASCADE)
    content = models.TextField()
    is_removed = models.BooleanField(default=False)

    def __str__(self):
        return self.content
