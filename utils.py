from datetime import datetime
import random
from storage import accounts


def get_current_timestamp():
    """Return the current date and time."""
    return datetime.now().strftime("%d-%m-%Y %H:%M")


def generate_unique_account_number():
    """Make a new six-digit account number."""
    while True:
        account_number = random.randint(100000, 999999)
        if account_number not in accounts:
            return account_number
