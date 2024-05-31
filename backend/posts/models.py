"""
Module: models

This module contains the definition of the Post model, which represents a post in the application.

Classes:
    Post: Model representing a post in the application, containing fields such as title, content, author,
    and draft status.
"""

from django.db import models

from common.models import AbstractBaseModel


class Post(AbstractBaseModel):
    """
    Model representing a post in the application.

    Attributes:
        title (str): The title of the post.
        content (str): The content of the post.
        author (ForeignKey): The author of the post, referencing the User model.
        is_draft (bool): Flag indicating whether the post is a draft or published.
    """

    class Meta:
        ordering = ["-created"]

    title = models.CharField(max_length=255)
    content = models.TextField()
    author = models.ForeignKey("users.User", on_delete=models.CASCADE)
    is_draft = models.BooleanField(default=True)

    def __str__(self):
        """
        Return a string representation of the post.
        """
        return self.title
