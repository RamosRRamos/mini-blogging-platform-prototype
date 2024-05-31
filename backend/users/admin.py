"""
Module: admin

This module contains the CustomUserAdmin class for customizing the user administration in the Django admin interface.

Classes:
    - CustomUserAdmin: Custom UserAdmin class for user administration customization.
"""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    """
    Custom UserAdmin class for user administration customization.

    Attributes:
        list_display (tuple): Fields to display in the list view.
        list_filter (tuple): Fields to filter the list by.
        search_fields (tuple): Fields to search by.
        ordering (tuple): Fields to order the list by.
        filter_horizontal (tuple): Fields to display in a horizontal filter.
        fieldsets (tuple): Fieldsets to group fields in the detail view.
        add_fieldsets (tuple): Fieldsets to group fields in the add view.
    """

    list_display = ("id", "email", "slug", "name", "created", "modified")
    list_filter = ("is_active", "is_staff", "groups")
    search_fields = ("email",)
    ordering = ("email",)
    filter_horizontal = (
        "groups",
        "user_permissions",
    )

    fieldsets = (
        (None, {"fields": ("name", "slug", "email", "password")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
    )
    add_fieldsets = (
        (None, {"classes": ("wide",), "fields": ("email", "password1", "password2")}),
    )
