"""
Module: managers

This module contains the UserManager class for managing user creation.

Classes:
    - UserManager: Custom user manager class extending BaseUserManager.
"""

from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):
    """
    Custom user manager class extending BaseUserManager.

    Methods:
        create_user(email, password=None, **kwargs): Creates a new user.
        create_superuser(**kwargs): Creates a new superuser.
    """

    def create_user(self, email, password=None, **kwargs):
        """
        Creates a new user.

        Args:
            email (str): Email address of the user.
            password (str, optional): Password for the user (default: None).
            **kwargs: Additional keyword arguments to pass to the user model.

        Returns:
            User: Newly created user object.
        """
        email = self.normalize_email(email)
        user = self.model(email=email, **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, **kwargs):
        """
        Creates a new superuser.

        Args:
            **kwargs: Additional keyword arguments to pass to the user model.

        Returns:
            User: Newly created superuser object.
        """
        user = self.create_user(**kwargs)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user
