
import pandas as pd

# Load the dataset
df = pd.read_csv("data/mental_health.csv")

# Select lifestyle-related input features
features = [
    "Age",
    "Work_Hours_Per_Week",
    "Remote_Work",
    "Job_Satisfaction",
    "Work_Stress_Level",
    "Work_Life_Balance",
    "Exercise_Per_Week",
    "Sleep_Hours_Night",
    "Caffeine_Drinks_Day",
    "Screen_Time_Hours_Day",
    "Social_Media_Hours_Day",
    "Hobby_Time_Hours_Week",
    "Diet_Quality",
    "Financial_Stress",
    "Social_Support",
    "Close_Friends_Count",
    "Feel_Understood",
    "Loneliness"
]

# Store the selected inputs in X
X = df[features]

# Store the target label in y
y = df["Has_Mental_Health_Issue"]

# Display the results
print("Input features shape:", X.shape)
print("Target shape:", y.shape)

print("\nSelected features:")
print(X.head())

print("\nTarget labels:")
print(y.head())

# Check the data types of our input features
print("\nData types before encoding:")
print(X.dtypes)

# Convert categorical text columns into numerical columns
X = pd.get_dummies(X, drop_first=True, dtype=int)

# Check the result
print("\nData types after encoding:")
print(X.dtypes)

print("\nShape after encoding:", X.shape)
print("\nFirst 5 rows after encoding:")
print(X.head())

from sklearn.model_selection import train_test_split

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# Display the sizes of the datasets
print("\nTraining input size:", X_train.shape)
print("Testing input size:", X_test.shape)

print("Training target size:", y_train.shape)
print("Testing target size:", y_test.shape)

