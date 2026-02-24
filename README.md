


# 🍳 Flavor Lab AI

**Flavor Lab AI** is a sophisticated, full-stack web application that transforms your available ingredients into gourmet, chef-quality recipes. Powered by the **Google Gemini 2.5 Flash** model and built with the latest **Next.js 16** architecture, it bridges the gap between AI reasoning and kitchen utility.

## ✨ Features

* **Intelligent Ingredient Mapping**: Uses Gemini's advanced reasoning to suggest recipes based on what you *actually* have.
* **Dietary Precision**: Built-in filters for Vegan, Vegetarian, and Gluten-Free requirements.
* **Customizable Parameters**: Tailor recipes by cuisine type, difficulty level, and maximum preparation time.
* **Markdown Recipe Cards**: Beautifully rendered output including nutritional facts, chef tips, and wine pairings.
* **Responsive Design**: A premium UI built with Tailwind CSS, featuring glassmorphism and smooth animations.

## 🛠️ Tech Stack

| Technology | Purpose |
| --- | --- |
| **Next.js 16** | Full-stack Framework (App Router) |
| **Google Gemini API** | Large Language Model (LLM) for recipe generation |
| **Tailwind CSS** | Styling and Responsive Design |
| **Lucide React** | Iconography |
| **React Markdown** | Rendering AI output into readable content |

---

## 🚀 Getting Started

Follow these steps to set up Flavor Lab on your local machine.

### 1. Prerequisites

* Node.js 18.x or higher
* A Google AI Studio API Key ([Get it here](https://aistudio.google.com/))

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/your-username/flavor-lab.git

# Navigate into the project
cd flavor-lab

# Install dependencies
npm install

```

### 3. Environment Setup

Create a file named `.env.local` in the root directory and add your Gemini API key:

```env
GEMINI_API_KEY=your_actual_api_key_here

```

### 4. Run the Application

```bash
npm run dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result.

---

## 🏗️ Project Structure

```text
├── app/
│   ├── api/generate/     # Backend: Gemini API integration
│   ├── globals.css       # Styling: Tailwind & custom fonts
│   ├── layout.tsx        # Root layout with font optimization
│   └── page.tsx          # Frontend: User interface & state
├── components/           # (Optional) Reusable UI components
├── .env.local            # Environment variables (Private)
└── package.json          # Project dependencies

```

## 🛡️ Best Practices Implemented

* **Server-Side Security**: API keys are kept on the server and never exposed to the client.
* **Input Validation**: Ensures the AI doesn't receive empty or malicious prompts.
* **Type Safety**: Built with TypeScript for a robust development experience.
* **Accessibility**: Semantic HTML and keyboard-navigable controls.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
<img width="1366" height="768" alt="Screenshot From 2026-02-24 20-36-31" src="https://github.com/user-attachments/assets/7d77db2c-fcaa-4abc-bee1-fe1dd6369a24" />
<img width="1366" height="768" alt="Screenshot From 2026-02-24 20-37-06" src="https://github.com/user-attachments/assets/f571b269-726b-4abf-9b7d-99541c16f451" />


<img width="1366" height="768" alt="Screenshot From 2026-02-24 20-37-53" src="https://github.com/user-attachments/assets/a8fc0efc-b070-479d-a9cd-09009f86ff13" />

## For on Mobile

<img width="454" height="516" alt="Screenshot From 2026-02-24 20-39-18" src="https://github.com/user-attachments/assets/72bda132-5d2f-4ba3-9e2b-4da18e019f47" />
<img width="454" height="516" alt="Screenshot From 2026-02-24 20-39-33" src="https://github.com/user-attachments/assets/3c27033b-3437-470a-9756-53b6dc087e06" />
<img width="454" height="516" alt="Screenshot From 2026-02-24 20-39-58" src="https://github.com/user-attachments/assets/cb7fa959-27ee-4df6-b64f-6613993410f7" />



**Is there a specific section you’d like me to expand on, such as a "Future Roadmap" or "Contribution Guidelines"?**

