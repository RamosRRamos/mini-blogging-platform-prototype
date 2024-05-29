"""
Module: apps

This module defines the configuration for the core Django app.

Classes:
    - CoreConfig: AppConfig subclass for configuring the core app.
"""

from django.apps import AppConfig


class CoreConfig(AppConfig):
    """
    AppConfig subclass for configuring the core app.

    Attributes:
        default_auto_field (str): Default auto field for model primary keys.
        name (str): Name of the app.
    """

    default_auto_field = "django.db.models.BigAutoField"
    name = "core"
