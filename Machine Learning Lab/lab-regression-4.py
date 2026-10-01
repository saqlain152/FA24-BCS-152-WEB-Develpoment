import matplotlib.pyplot as plt
from sklearn.datasets import load_digits
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix
from sklearn.model_selection import train_test_split

digits = load_digits()

plt.gray()
for i in range(5):
    plt.matshow(digits.images[i])
    plt.show()

print(dir(digits))
print(digits.data[0])

# Create and train logistic regression model
model = LogisticRegression(max_iter=10000)  # max_iter added to prevent convergence warnings

X_train, X_test, y_train, y_test = train_test_split(
    digits.data, digits.target, test_size=0.2
)

model.fit(X_train, y_train)

# Measure accuracy of our model
print("Accuracy Score:", model.score(X_test, y_test))
print("Predictions for first 5 samples:", model.predict(digits.data[0:5]))

# Confusion Matrix
y_predicted = model.predict(X_test)

cm = confusion_matrix(y_test, y_predicted)
print("Confusion Matrix:\n", cm)

import seaborn as sn

plt.figure(figsize=(10, 7))
sn.heatmap(cm, annot=True)
plt.xlabel('Predicted')
plt.ylabel('Truth')
plt.show()