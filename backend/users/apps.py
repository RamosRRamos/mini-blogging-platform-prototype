"""
Module: apps

This module contains the UsersConfig class for configuring the users app.

Classes:
    - UsersConfig: AppConfig class for configuring the users app.
"""

from django.apps import AppConfig


class UsersConfig(AppConfig):
    """
    AppConfig class for configuring the users app.

    Attributes:
        name (str): Name of the app.
    """

    name = "users"
