import random
import string

from django.contrib.auth.hashers import make_password


def generate_insecure_password(length=12):
    """
    Generate an insecure random password with the specified length.

    Parameters:
        length (int): Length of the password (default is 12).

    Returns:
        str: Randomly generated password.
    """
    characters = string.ascii_letters + string.digits + string.punctuation
    return ''.join(random.choice(characters) for _ in range(length))


def generate_secure_password(insecure_password):
    """
    Generate a secure random password using Django's make_password.

    Returns:
        str: Securely hashed password.
    """

    return make_password(insecure_password)
