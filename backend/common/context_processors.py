"""
Module: context_processors

This module defines context processors to include certain variables in the template context for all templates.

Context Processors:
    - sentry_dsn(request): Provides the SENTRY_DSN variable from Django settings.
    - commit_sha(request): Provides the COMMIT_SHA variable from Django settings.
"""

from django.conf import settings


def sentry_dsn(request):
    """
    Adds the SENTRY_DSN variable to the template context.

    Args:
        request: The HTTP request.

    Returns:
        dict: A dictionary containing the SENTRY_DSN variable.
    """
    return {"SENTRY_DSN": settings.SENTRY_DSN}


def commit_sha(request):
    """
    Adds the COMMIT_SHA variable to the template context.

    Args:
        request: The HTTP request.

    Returns:
        dict: A dictionary containing the COMMIT_SHA variable.
    """
    return {"COMMIT_SHA": settings.COMMIT_SHA}
