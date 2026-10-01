def get_matrix(name):
	print(f"Enter {name} matrix:")
	return [list(map(int, input().split())) for _ in range(3)]


matrix_a = get_matrix("first 3x3")
matrix_b = get_matrix("second 3x3")

result_matrix = [
	[
		sum(matrix_a[row][position] * matrix_b[position][column] for position in range(3))
		for column in range(3)
	]
	for row in range(3)
]

print("Result of matrix multiplication:")
for row in result_matrix:
	print(row)
