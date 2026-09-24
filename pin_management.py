from storage import get_account_data


def change_pin(account):
    """Change the four-digit PIN."""
    account_data = get_account_data(account)
    print("\n============ CHANGE PIN ============")
    old_pin = input("Enter old PIN: ").strip()

    if old_pin != account_data["pin"]:
        print("\nOld PIN does not match.")
        return

    new_pin = input("Enter new PIN: ").strip()
    if not (new_pin.isdigit() and len(new_pin) == 4):
        print("\nNew PIN must have exactly 4 digits.")
        return

    if new_pin == old_pin:
        print("\nNew PIN cannot be the same as the old PIN.")
        return

    confirm_new_pin = input("Confirm new PIN: ").strip()
    if new_pin != confirm_new_pin:
        print("\nPINs do not match.")
        return

    account_data["pin"] = new_pin
    print("\nPIN changed successfully.")
