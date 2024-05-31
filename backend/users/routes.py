"""
Module: routes

This module defines the routes for the application, specifying the viewsets to handle different API endpoints.

Routes:
    Each route consists of a regular expression (regex) pattern, the associated viewset, and the basename.
"""

from .views import UserViewSet


routes = [
    {"regex": r"users", "viewset": UserViewSet, "basename": "user"},
    {"regex": r"users/<slug:slug>", "viewset": UserViewSet, "basename": "user_slug"},
]
