"""
Module: serializers

This module contains serializers for the User model.

Classes:
    - UserSerializer: Serializer for the User model.
"""

from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.
    """

    class Meta:
        model = User
        fields = [  # noqa: RUF012
            "id",
            "email",
            "is_active",
            "is_staff",
            "is_superuser",
            "created",
            "modified",
            "last_login",
        ]
