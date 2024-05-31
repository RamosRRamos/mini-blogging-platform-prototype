"""
Module: models

This module contains the User model for managing user data.

Classes:
    - User: Custom user model extending AbstractBaseUser and PermissionsMixin.
"""

import random

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _

from common.models import IndexedTimeStampedModel
from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin, IndexedTimeStampedModel):
    """
    Custom user model extending AbstractBaseUser and PermissionsMixin.

    Attributes:
        email (EmailField): Email address of the user (unique).
        is_staff (BooleanField): Whether the user is a staff member (default: False).
        is_active (BooleanField): Whether the user is active (default: True).

    Methods:
        get_full_name(): Returns the full name of the user.
        get_short_name(): Returns the short name of the user.
    """

    name = models.CharField(max_length=255, blank=True, null=True)
    slug = models.SlugField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    is_staff = models.BooleanField(
        default=False,
        help_text=_("Designates whether the user can log into this admin site."),
    )
    is_active = models.BooleanField(
        default=True,
        help_text=_(
            "Designates whether this user should be treated as "
            "active. Unselect this instead of deleting accounts."
        ),
    )

    objects = UserManager()

    USERNAME_FIELD = "email"

    def get_full_name(self):
        """
        Returns the full name of the user.
        """
        return self.name

    def get_short_name(self):
        """
        Returns the short name of the user.
        """
        if self.name:
            return self.name.split()[0]

        return None

    def __str__(self):
        """
        Returns the string representation of the user.
        """
        return self.email

    def get_slug(self):
        return self.slug

    def set_slug(self, slug=None):
        if slug:
            self.slug = slug
        elif not self.slug:
            email = self.email.split("@")[0]
            random_number = [random.randint(10, 99) for x in range(5)]
            self.slug = f"{email}-{''.join(map(str, random_number))}"

    def save(self, *args, **kwargs):
        self.set_slug()
        super().save(*args, **kwargs)
