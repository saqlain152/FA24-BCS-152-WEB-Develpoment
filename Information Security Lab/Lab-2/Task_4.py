phone_directory = {}

print("Enter  contacts")
while len(phone_directory) < 3:
	print(f"\nContact {len(phone_directory) + 1}")
	first_name = input("Enter first name: ").strip()
	last_name = input("Enter last name: ").strip()
	name = (first_name, last_name)

	if name in phone_directory:
		print("This contact already exists. Enter a different name.")
		continue

	phone_number = input("Enter phone number: ").strip()
	phone_directory[name] = phone_number

print(phone_directory)

print("\nSearch for a contact")
print("1. Search by first name")
print("2. Search by last name")
choice = input("Choose an option: ").strip()
search_text = input("Enter the name: ").strip()
found = False

for name, phone_number in phone_directory.items():
	if (choice == "1" and name[0] == search_text) or (choice == "2" and name[1] == search_text):
		print(name[0], name[1], "-", phone_number)
		found = True

if not found:
	print("Wrong data: contact not found.")
