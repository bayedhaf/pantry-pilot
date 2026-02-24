"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Loader2, Download, ChefHat, Flame, Leaf, Timer, Sparkles } from "lucide-react";

export default function RecipePage() {
  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState("Hundaa");
  const [mealType, setMealType] = useState("Dinner");
  const [cookingTime, setCookingTime] = useState(30);
  const [difficulty, setDifficulty] = useState("Easy");
  const [dietary, setDietary] = useState<string[]>([]);
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleDietary = (item: string) => {
    setDietary((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
  };

  const generateRecipe = async () => {
    if (!ingredients) return;
    setLoading(true);
    setRecipe("");
    setError("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients,
          dietaryRestrictions: dietary.join(", "),
          cuisine,
          mealType,
          cookingTime,
          difficulty,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || `Request failed (${res.status})`);
      }
      setRecipe(data.recipe);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Request failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f1e7] text-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),transparent_55%)]" />
      <div className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-amber-200/70 blur-3xl animate-float-slow" />
      <div
        className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-orange-200/70 blur-3xl animate-float-slow"
        style={{ animationDelay: "-2.2s" }}
      />

      <main className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14">
        <header className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6 animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-orange-700 shadow-sm">
              <Sparkles size={14} className="text-orange-500" /> Flavor Lab
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl lg:text-6xl font-display">
              Pantry ingredients, refined into a restaurant-ready recipe.
            </h1>
            <p className="max-w-xl text-base text-slate-600 sm:text-lg">
              Set the mood, time, and dietary needs. The kitchen engine builds a structured recipe card you can follow
              right away.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                "Tailored to your pantry",
                "Balanced nutrition",
                "Step-by-step flow",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div
            className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-amber-200/40 animate-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-orange-100 p-3">
                <ChefHat className="text-orange-500" />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-700">Daily brief</p>
                <p className="text-lg font-semibold text-slate-900 font-display">
                  Build a complete meal plan in minutes.
                </p>
                <p className="text-sm text-slate-500">
                  Save drafts, refine flavors, and export the final card for printing.
                </p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Cook time", value: "10-90" },
                { label: "Servings", value: "2-4" },
                { label: "Style", value: "Global" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-amber-100 bg-white/70 px-3 py-4"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section
            className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-xl shadow-orange-100/60 animate-fade-up"
            style={{ animationDelay: "220ms" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-700">Input</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900 font-display">
                  Shape the recipe
                </h2>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1 text-xs text-orange-700">
                <Timer size={14} /> {cookingTime} min
              </div>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <label className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Ingredients
                </label>
                <textarea
                  className="mt-3 min-h-35 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-200"
                  placeholder="Chicke cooks, Foon lukuu, tomatoes, spinach, garlic, olive oil..."
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Cuisine</label>
                  <select
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-200"
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value)}
                  >
                    <option>Hundaa</option>
                    <option>Italian</option>
                    <option>Oromiyaa</option>
                    <option>Mexican</option>
                    <option>French</option>
                    <option>Middle Eastern</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Meal type</label>
                  <select
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-200"
                    value={mealType}
                    onChange={(e) => setMealType(e.target.value)}
                  >
                    <option>Breakfast</option>
                    <option>Lunch</option>
                    <option>Dinner</option>
                    <option>Dessert</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Difficulty</label>
                  <div className="mt-2 flex gap-2 rounded-2xl border border-slate-200 bg-white/90 p-2">
                    {["Easy", "Medium", "Hard"].map((level) => (
                      <button
                        key={level}
                        onClick={() => setDifficulty(level)}
                        className={`flex-1 rounded-xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                          difficulty === level
                            ? "bg-orange-500 text-white"
                            : "bg-white text-slate-500 hover:bg-orange-50"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Max time
                  </label>
                  <div className="mt-2 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>10 min</span>
                      <span className="text-sm font-semibold text-slate-700">{cookingTime} min</span>
                      <span>120 min</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="120"
                      value={cookingTime}
                      onChange={(e) => setCookingTime(Number(e.target.value))}
                      className="mt-3 w-full accent-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-600">Dietary focus</label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Vegan", "Vegetarian", "Gluten-Free", "Dairy-Free"].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleDietary(tag)}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                        dietary.includes(tag)
                          ? "border-orange-300 bg-orange-50 text-orange-700"
                          : "border-slate-200 bg-white/80 text-slate-500 hover:border-orange-200"
                      }`}
                    >
                      <Leaf size={14} /> {tag}
                    </button>
                  ))}
                </div>
              </div>

              <button
                disabled={loading || !ingredients}
                onClick={generateRecipe}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-orange-500 via-amber-500 to-yellow-400 px-6 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-lg shadow-orange-200 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Flame size={18} />}
                {loading ? "Crafting" : "Generate"}
              </button>

              {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                  {error}
                </div>
              ) : null}
            </div>
          </section>

          <section
            className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-xl shadow-amber-100/60 animate-fade-up"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">Output</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900 font-display">
                  Recipe card
                </h2>
              </div>
              <div className="rounded-full border border-amber-200 bg-white px-3 py-1 text-xs text-amber-700">
                Styled markdown
              </div>
            </div>

            {recipe ? (
              <div className="mt-6 space-y-6">
                <article className="prose prose-amber max-w-none text-slate-700">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{recipe}</ReactMarkdown>
                </article>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 hover:text-orange-600"
                >
                  <Download size={16} /> Save as PDF
                </button>
              </div>
            ) : (
              <div className="mt-8 flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-amber-200 bg-amber-50/60 px-6 text-center text-sm text-slate-500">
                <div className="mb-4 rounded-full bg-white p-4 shadow-sm">
                  <ChefHat size={36} className="text-amber-300" />
                </div>
                <p className="max-w-xs">
                  Add ingredients, set your preferences, and the full recipe card will appear here.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}