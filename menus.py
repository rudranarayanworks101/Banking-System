"""Menu navigation and interactive loops for the banking application."""

from storage import get_account_data
from balance import check_balance
from deposit import deposit
from withdraw import withdraw
from transfer import transfer
from history import transaction_history
from pin_management import change_pin
from create_account import create_account
from auth import login


def account_menu(account):
    """Display the Account Menu and handle user actions while logged in."""
    acc = get_account_data(account)
    while True:
        print("           ACCOUNT MENU")
        print("=" * 40)
        print("1. Check Balance")
        print("2. Deposit")
        print("3. Withdraw")
        print("4. Transfer")
        print("5. Transaction History")
        print("6. Change PIN")
        print("7. Logout")

        choice = input("\nEnter your choice: ").strip()

        if choice == "1":
            check_balance(acc)
        elif choice == "2":
            deposit(acc)
        elif choice == "3":
            withdraw(acc)
        elif choice == "4":
            transfer(acc)
        elif choice == "5":
            transaction_history(acc)
        elif choice == "6":
            change_pin(acc)
        elif choice == "7":
            print("\nYou have been logged out successfully.")
            break
        else:
            print("\nError: Invalid choice. Please enter a number between 1 and 7.")


def main_menu():
    """Main program loop displaying the primary menu."""
    while True:
        print("\n" + "=" * 40)
        print("          BANKING SYSTEM")
        print("=" * 40)
        print("1. Create Account")
        print("2. Login")
        print("3. Exit")

        choice = input("\nEnter your choice: ").strip()

        if choice == "1":
            create_account()
        elif choice == "2":
            login()
        elif choice == "3":
            print("\nThank you for using the Banking System. Goodbye!")
            break
        else:
            print("\nError: Invalid choice. Please enter 1, 2, or 3.")
