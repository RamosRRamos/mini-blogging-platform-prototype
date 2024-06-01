"""
Module: routes

This module defines the routes for the application, specifying the viewsets to handle different API endpoints.

Routes:
    Each route consists of a regular expression (regex) pattern, the associated viewset, and the basename.
"""

from .views import PostViewSet


routes = [
    {"regex": r"posts", "viewset": PostViewSet, "basename": "post"},
    {"regex": r"posts_by_slug/(?P<slug>.+)", "viewset": PostViewSet, "basename": "post_slug"},

]
