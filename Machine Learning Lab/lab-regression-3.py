import math
import pandas as pd
from matplotlib import pyplot as plt
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

# Load dataset
df = pd.read_csv(r"D:\Semester 5\Machine Learning Lab\insurance_data-2.csv")
print(df.head())

# Plotting age vs insurance status
plt.scatter(df.age, df.insurance, marker='+', color='red')
plt.xlabel('Age')
plt.ylabel('Insurance')
plt.show()

# Features (X) and Target (y)
X = df[['age', 'affordability']]
y = df['insurance']

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y, train_size=0.8, random_state=42
)

# Train model
model = LogisticRegression()
model.fit(X_train, y_train)

# Predict & Score
y_predicted = model.predict(X_test)
print("Predictions:", y_predicted)
print("Accuracy Score:", model.score(X_test, y_test))

# Coefficients and Intercept
print("Coefficients (m1, m2):", model.coef_)
print("Intercept (b):", model.intercept_)


# Custom Sigmoid Prediction Function
def sigmoid(x):
  return 1 / (1 + math.exp(-x))


def prediction_function(age, affordability):
  # z = m1 * age + m2 * affordability + b
  z = (
      model.coef_[0][0] * age
      + model.coef_[0][1] * affordability
      + model.intercept_[0]
  )
  return sigmoid(z)


# Example test prediction (age = 47, affordability = 1)
print(
    "Prediction probability for age 47 with affordability 1:",
    prediction_function(47, 1),
)