import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

"""## Importing the dataset"""
# Added 'r' prefix to fix the path escape warning
dataset = pd.read_csv(r"D:\Semester 5\Machine Learning Lab\Salary_dataset.csv")

# Select only column index 1 (YearsExperience) to keep X as a 2D array with 1 column
X = dataset.iloc[:, 1:2].values
y = dataset.iloc[:, -1].values

"""## Splitting the dataset into the Training set and Test set"""
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=1 / 3, random_state=0
)

print(X_train)
print(" ")
print(y_train)
print(" ")
print(X_test)
print(" ")
print(y_test)
print(" ")

"""## Training the Simple Linear Regression model on the Training set"""
regressor = LinearRegression()
regressor.fit(X_train, y_train)

"""## Predicting the Test set results"""
y_pred = regressor.predict(X_test)

"""## Visualising the Training set results"""
plt.scatter(X_train, y_train, color="r")
plt.plot(X_train, regressor.predict(X_train), color="b")
plt.title("Salary vs Experience (Training set)")
plt.xlabel("Years of Experience")
plt.ylabel("Salary")
plt.show()

"""## Visualising the Test set results"""
plt.scatter(X_test, y_test, color="red")
plt.plot(X_train, regressor.predict(X_train), color="blue")
plt.title("Salary vs Experience (Test set)")
plt.xlabel("Years of Experience")
plt.ylabel("Salary")
plt.show()

"""## Making a single prediction"""
single_prediction = regressor.predict([[12]])
print("Prediction for 12 years:", single_prediction)

coefficient = regressor.coef_
intercept = regressor.intercept_

print("Coefficient is:", coefficient)
print("Slope/Intercept:", intercept)