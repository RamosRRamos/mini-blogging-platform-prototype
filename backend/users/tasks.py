"""
Module: tasks

This module contains Celery tasks for the mini_blog application.

Functions:
    - clearsessions: Celery task to clear expired sessions.
"""

from django.core import management
from mini_blog import celery_app

@celery_app.task
def clearsessions():
    """
    Celery task to clear expired sessions.
    """
    management.call_command("clearsessions")
