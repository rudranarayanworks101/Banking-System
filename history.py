from storage import get_account_data

def transaction_history(account):
    """Show all transactions for an account."""
    account_data = get_account_data(account)
    print("\n" + "=" * 40)
    print("        TRANSACTION HISTORY")
    print("=" * 40)

    if not account_data["transactions"]:
        print("No transactions recorded yet.")
    else:
        for transaction in account_data["transactions"]:
            print(transaction)

    print("=" * 40)
