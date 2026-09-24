# The accounts stay in this dictionary while the program is running.
# Example account:
# {
#     123456: {
#         "account_number": 123456,
#         "name": "Rahul",
#         "phone": "9876543210",
#         "pin": "1234",
#         "balance": 0.0,
#         "transactions": []
#     }
# i took this example to make sure how should it look if i use it later to store in sql
# }
accounts = {}

def get_account_data(account):
    """Return account details from an account number or account dictionary."""
    if isinstance(account, int):
        return accounts.get(account)
    return account
