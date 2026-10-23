
import pandas as pd

# Read the CSV file
df = pd.read_csv("data/mental_health.csv")

# Show the first 5 rows
print(df.head())

# Show all column names
print(df.columns.tolist())

# Show the dataset size
print("Dataset shape:", df.shape)

# Check missing values in each column
print(df.isnull().sum())

# Count the values in our target column
print("\nTarget column distribution:")
print(df["Has_Mental_Health_Issue"].value_counts())

# Show the percentage of each label
print("\nTarget column percentages:")
print(
    df["Has_Mental_Health_Issue"]
    .value_counts(normalize=True)
    .mul(100)
    .round(2)
)


# Display information about each column
print("\nDataset information:")
df.info()

# Display statistical summary of numerical columns
print("\nStatistical summary:")
print(df.describe())

# Check the target column distribution
print("\nTarget distribution:")
print(df["Has_Mental_Health_Issue"].value_counts())
