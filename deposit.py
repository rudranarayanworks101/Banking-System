from storage import get_account_data
from utils import get_current_timestamp


def deposit(account):
    """Add money to an account."""
    account_data = get_account_data(account)
    print("\n============== DEPOSIT ==============")
    amount_input = input("Enter amount to deposit: ").strip()

    try:
        amount = float(amount_input)
    except ValueError:
        print("\nEnter a valid number.")
        return

    if amount <= 0:
        print("\nAmount must be greater than zero.")
        return

    account_data["balance"] += amount
    timestamp = get_current_timestamp()
    account_data["transactions"].append(f"{timestamp} - Deposited Rs. {amount}")

    print("\nDeposit successful!")
    print(f"Amount deposited: Rs. {amount}")
    print(f"New balance: Rs. {account_data['balance']}")
