"""
Module: apps

This module contains the configuration for the Comments app.

Classes:
    - CommentsConfig: Configuration class for the Comments app.
"""

from django.apps import AppConfig


class CommentsConfig(AppConfig):
    """
    Configuration class for the Comments app.
    """
    default_auto_field = "django.db.models.BigAutoField"
    name = "comments"
