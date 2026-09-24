from storage import accounts
"""Log a user in with an account number and PIN."""
def login():
    
    print("\n============== LOGIN ==============")
    account_input = input("Enter account number: ").strip()
    if not account_input.isdigit():
        print("\nAccount number must contain only numbers.")
        return

    account_number = int(account_input)
    if account_number not in accounts:
        print("\nAccount not found.")
        return

    pin = input("Enter PIN: ").strip()
    account = accounts[account_number]

    if account["pin"] != pin:
        print("\nIncorrect PIN.")
        return

    print("\nLogin successful!")
    print(f"Welcome, {account['name']}.")
    
    from menus import account_menu
    account_menu(account)
