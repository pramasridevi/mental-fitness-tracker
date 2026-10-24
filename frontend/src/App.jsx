
import { useState } from "react";
import "./App.css";

const initialForm = {
  Age: 21,
  Work_Hours_Per_Week: 40,
  Remote_Work: "No",
  Job_Satisfaction: 3,
  Work_Stress_Level: "Medium",
  Work_Life_Balance: 3,
  Exercise_Per_Week: 3,
  Sleep_Hours_Night: 7,
  Caffeine_Drinks_Day: 2,
  Screen_Time_Hours_Day: 6,
  Social_Media_Hours_Day: 2,
  Hobby_Time_Hours_Week: 3,
  Diet_Quality: "Average",
  Financial_Stress: 3,
  Social_Support: 3,
  Close_Friends_Count: 3,
  Feel_Understood: "Yes",
  Loneliness: 2,
};

const fieldInfo = [
  ["Age", "Age", "number", 1, 120],
  ["Work_Hours_Per_Week", "Work hours per week", "number", 0, 168],
  ["Remote_Work", "Remote work", "select", ["No", "Yes"]],
  ["Job_Satisfaction", "Job satisfaction (1–5)", "number", 1, 5],
  ["Work_Stress_Level", "Work stress level", "select", ["Low", "Medium", "High"]],
  ["Work_Life_Balance", "Work-life balance (1–5)", "number", 1, 5],
  ["Exercise_Per_Week", "Exercise sessions per week", "number", 0, 50],
  ["Sleep_Hours_Night", "Sleep hours per night", "number", 0, 24],
  ["Caffeine_Drinks_Day", "Caffeine drinks per day", "number", 0, 50],
  ["Screen_Time_Hours_Day", "Screen time hours per day", "number", 0, 24],
  ["Social_Media_Hours_Day", "Social media hours per day", "number", 0, 24],
  ["Hobby_Time_Hours_Week", "Hobby hours per week", "number", 0, 168],
  ["Diet_Quality", "Diet quality", "select", ["Poor", "Average", "Good"]],
  ["Financial_Stress", "Financial stress (1–5)", "number", 1, 5],
  ["Social_Support", "Social support (1–5)", "number", 1, 5],
  ["Close_Friends_Count", "Number of close friends", "number", 0, 100],
  ["Feel_Understood", "Do you feel understood?", "select", ["Yes", "No"]],
  ["Loneliness", "Loneliness (1–5)", "number", 1, 5],
];

function App() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    const payload = { ...form };

    fieldInfo.forEach(([name, , type]) => {
      if (type === "number") {
        payload[name] = Number(form[name]);
      }
    });

    try {
      const response = await fetch("https://mental-fitness-tracker-2.onrender.com/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to generate the assessment. Please try again."
        );
      }

      setResult(data);
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Unable to connect to the server. Please make sure your Flask backend is running."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  // Select suggestions based on the user's answers.
  const suggestions = [];

  if (form.Work_Stress_Level === "High") {
    suggestions.push({
      title: "🧘 Manage Work Stress",
      text: "Take short breaks and try 5 minutes of slow breathing.",
      priority: 1,
    });
  } else if (form.Work_Stress_Level === "Medium") {
    suggestions.push({
      title: "🧘 Manage Work Stress",
      text: "Plan regular breaks and divide large tasks into smaller steps.",
      priority: 2,
    });
  }

  if (Number(form.Sleep_Hours_Night) < 7) {
    suggestions.push({
      title: "😴 Improve Sleep",
      text: "Follow a regular bedtime and allow enough time for sleep.",
      priority: 1,
    });
  } else if (Number(form.Sleep_Hours_Night) > 9) {
    suggestions.push({
      title: "😴 Review Your Sleep Routine",
      text: "Keep a consistent sleep schedule and notice whether you feel rested.",
      priority: 2,
    });
  }

  if (Number(form.Exercise_Per_Week) < 3) {
    suggestions.push({
      title: "🚶 Move More",
      text: "Start with a comfortable walk and build a regular activity routine.",
      priority: 1,
    });
  }

  if (Number(form.Screen_Time_Hours_Day) > 6) {
    suggestions.push({
      title: "📱 Manage Screen Time",
      text: "Take screen-free breaks during study or work and before bedtime.",
      priority: 2,
    });
  }

  if (Number(form.Social_Media_Hours_Day) > 3) {
    suggestions.push({
      title: "📵 Balance Social Media",
      text: "Set aside time for offline activities and hobbies.",
      priority: 2,
    });
  }

  if (form.Diet_Quality === "Poor") {
    suggestions.push({
      title: "🥗 Improve Eating Habits",
      text: "Try adding fruit, vegetables, or other nutritious foods to your meals.",
      priority: 2,
    });
  }

  if (Number(form.Caffeine_Drinks_Day) > 3) {
    suggestions.push({
      title: "☕ Review Caffeine Intake",
      text: "Notice its effect on sleep and consider reducing it gradually if needed.",
      priority: 2,
    });
  }

  if (Number(form.Financial_Stress) >= 4) {
    suggestions.push({
      title: "💰 Manage Financial Stress",
      text: "List your priorities and make a manageable plan for expenses.",
      priority: 1,
    });
  }

  if (
    Number(form.Loneliness) >= 4 ||
    form.Feel_Understood === "No" ||
    Number(form.Social_Support) <= 2
  ) {
    suggestions.push({
      title: "🤝 Build Social Support",
      text: "Consider talking with a trusted friend, family member, or supportive person.",
      priority: 1,
    });
  }

  if (Number(form.Work_Life_Balance) <= 2) {
    suggestions.push({
      title: "⚖️ Improve Work-Life Balance",
      text: "Schedule time for rest, hobbies, and personal activities.",
      priority: 1,
    });
  }

  if (Number(form.Job_Satisfaction) <= 2) {
    suggestions.push({
      title: "😊 Improve Work Satisfaction",
      text: "Identify one thing about work or study that you would like to improve.",
      priority: 2,
    });
  }

  if (Number(form.Hobby_Time_Hours_Week) < 2) {
    suggestions.push({
      title: "🎨 Make Time for Hobbies",
      text: "Set aside a little time each week for an activity you enjoy.",
      priority: 2,
    });
  }

  if (Number(form.Close_Friends_Count) === 0) {
    suggestions.push({
      title: "🧑‍🤝‍🧑 Build Connections",
      text: "If you would like more connection, try a group activity or reach out to someone you trust.",
      priority: 2,
    });
  }

  if (Number(form.Work_Hours_Per_Week) > 45) {
    suggestions.push({
      title: "💼 Balance Work & Rest",
      text: "Review your schedule and make space for breaks and personal time.",
      priority: 2,
    });
  }

  if (form.Remote_Work === "Yes") {
    suggestions.push({
      title: "🏡 Remote Work Routine",
      text: "Take movement breaks and keep a clear boundary between work and personal time.",
      priority: 3,
    });
  }

  // Keep only four suggestions, giving higher priority to stronger concerns.
  const displayedSuggestions = [...suggestions]
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 4);

  // Provide useful general suggestions if fewer than four conditions match.
  if (displayedSuggestions.length < 4) {
    const generalSuggestions = [
      {
        title: "🌟 Maintain Healthy Habits",
        text: "Keep a consistent routine for sleep, movement, and relaxation.",
      },
      {
        title: "🎯 Make Time for Yourself",
        text: "Set aside some time for activities you enjoy.",
      },
      {
        title: "💧 Daily Well-being",
        text: "Drink water regularly and take short breaks throughout the day.",
      },
      {
        title: "🤝 Stay Connected",
        text: "Make time to connect with people who support you.",
      },
    ];

    for (const item of generalSuggestions) {
      if (displayedSuggestions.length >= 4) break;

      if (!displayedSuggestions.some((suggestion) => suggestion.title === item.title)) {
        displayedSuggestions.push(item);
      }
    }
  }

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>💜 Mental Fitness Tracker</h1>
        <p>
          Understand your lifestyle and build healthier daily habits.
        </p>
      </header>

      <section className="panel">
        <h2>Enter Your Details</h2>
        <p className="muted">
          Share your lifestyle information to receive helpful suggestions.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {fieldInfo.map(([name, label, type, options, max]) => (
              <div className="form-group" key={name}>
                <label htmlFor={name}>{label}</label>

                {type === "select" ? (
                  <select
                    id={name}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    required
                  >
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={name}
                    name={name}
                    type="number"
                    min={options}
                    max={max}
                    step="1"
                    value={form[name]}
                    onChange={handleChange}
                    required
                  />
                )}
              </div>
            ))}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Generating Results..." : "Generate Assessment"}
          </button>
        </form>
      </section>

      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      {result && (
        <section className="panel result-panel" aria-live="polite">
          <h2>📊 Your Mental Fitness Results</h2>

          <h3>
            {Number(result.prediction) === 1
              ? "💜 Let's Build Healthier Habits!"
              : "🌟 Keep Building Healthy Habits!"}
          </h3>

          <p>
            The model returned prediction{" "}
            <strong>{result.prediction}</strong>
            {result.probability_class_1 !== undefined &&
              ` with a class-1 probability of ${(Number(result.probability_class_1) * 100).toFixed(1)
              }%`}
            .
          </p>

          <p>
            By following these personalized suggestions and making gradual
            improvements to your daily routine, you can develop healthier habits,
            improve your overall well-being, and work toward a healthier lifestyle.
            Remember, small and consistent changes can make a meaningful difference
            over time.
          </p>

          <p className="notice">
            This is an experimental survey-based machine-learning result,
            not a validated mental health assessment or diagnosis.
          </p>
        </section>
      )}

      <section className="panel target-section">
        <h2>🎯 Your Personalized Suggestions</h2>

        <p className="muted">
          Here are up to four short suggestions based on your current answers.
        </p>

        <div className="target-grid">
          {displayedSuggestions.map((item) => (
            <article className="target-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <footer>
        For general wellness information only. This application does not
        diagnose mental health conditions.
      </footer>
    </main>
  );
}

export default App;
