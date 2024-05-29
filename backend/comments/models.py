"""
Module: models

This module contains the definition of the Comment model.

Classes:
    - Comment: Model representing a comment on a post.
"""

from django.db import models

from common.models import AbstractBaseModel


class Comment(AbstractBaseModel):
    """
    Model representing a comment on a post.
    """
    post = models.ForeignKey("posts.Post", on_delete=models.CASCADE)
    author = models.ForeignKey("users.User", on_delete=models.CASCADE)
    content = models.TextField()
    is_removed = models.BooleanField(default=False)

    def __str__(self):
        return self.content
