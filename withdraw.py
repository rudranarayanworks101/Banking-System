from storage import get_account_data
from utils import get_current_timestamp


def withdraw(account):
    """Take money out of an account."""
    account_data = get_account_data(account)
    print("\n============= WITHDRAW =============")
    amount_input = input("Enter amount to withdraw: ").strip()

    try:
        amount = float(amount_input)
    except ValueError:
        print("\nEnter a valid number.")
        return

    if amount <= 0:
        print("\nAmount must be greater than zero.")
        return

    if amount > account_data["balance"]:
        print("\nInsufficient balance.")
        print(f"Available balance: Rs. {account_data['balance']}")
        return

    account_data["balance"] -= amount
    timestamp = get_current_timestamp()
    account_data["transactions"].append(f"{timestamp} - Withdrawn Rs. {amount}")

    print("\nWithdrawal successful!")
    print(f"Amount withdrawn: Rs. {amount}")
    print(f"Remaining balance: Rs. {account_data['balance']}")
