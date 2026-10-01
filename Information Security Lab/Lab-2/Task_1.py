students = []
programs = []

for index in range(5):
	students.append(input(f"Enter student {index + 1} name: "))

for index in range(5):
	programs.append(input(f"Enter program {index + 1}: "))

merged_list = list(zip(students, programs))

print("\nMerged student-program list:")
for student, program in merged_list:
	print(f"{student} - {program}")
