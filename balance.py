from storage import get_account_data

def check_balance(account):
    """Print the current balance."""
    account_data = get_account_data(account)
    print("\n" + "-" * 40)
    print(f"Current balance: Rs. {account_data['balance']}")
    print("-" * 40)
