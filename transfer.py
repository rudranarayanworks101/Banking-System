from storage import accounts, get_account_data
from utils import get_current_timestamp


def transfer(account):
    """Send money from one account to another."""
    sender = get_account_data(account)
    print("\n============= TRANSFER =============")
    receiver_input = input("Enter receiver account number: ").strip()

    if not receiver_input.isdigit():
        print("\nAccount number must contain only numbers.")
        return

    receiver_account_number = int(receiver_input)

    if receiver_account_number not in accounts:
        print("\nError: Receiver account not found.")
        return

    if receiver_account_number == sender["account_number"]:
        print("\nYou cannot transfer money to your own account.")
        return

    amount_input = input("Enter amount to transfer: ").strip()
    try:
        amount = float(amount_input)
    except ValueError:
        print("\nEnter a valid number.")
        return

    if amount <= 0:
        print("\nAmount must be greater than zero.")
        return

    if amount > sender["balance"]:
        print("\nInsufficient balance.")
        print(f"Available balance: Rs. {sender['balance']}")
        return

    receiver = accounts[receiver_account_number]
    sender["balance"] -= amount
    receiver["balance"] += amount

    timestamp = get_current_timestamp()#it was told to use date time zone.
    sender["transactions"].append(
        f"{timestamp} - Transferred Rs. {amount} to Account {receiver_account_number}"
    )
    receiver["transactions"].append(
        f"{timestamp} - Received Rs. {amount} from Account {sender['account_number']}"
    )

    print("\nTransfer successful!")
    print(f"\nTransferred: Rs. {amount}")
    print(f"To Account: {receiver_account_number}")
    print(f"Remaining balance: Rs. {sender['balance']}")
