const API_KEY = process.env.GROQ_API_KEY;
const ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

// --- Utility to fetch and safely parse JSON from Groq ---
async function fetchMatches(prompt) {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`, // <-- fix: template literal
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      console.error("❌ Groq API response not OK:", res.status);
      return [];
    }

    const data = await res.json();

    if (!data.choices || !data.choices[0]?.message?.content) {
      return [];
    }

    let text = data.choices[0].message.content.trim();

    // Extract JSON if wrapped in code block
    const codeBlockMatch = text.match(/```(?:json)?([\s\S]*?)```/i);
    if (codeBlockMatch) {
      text = codeBlockMatch[1].trim();
    }

    return JSON.parse(text);
  } catch (err) {
    console.error("❌ fetchMatches error:", err);
    return [];
  }
}

// --- Prompts ---
const prompts = {
  // October matches
  past: "Give all Basketball matches that already happened in October 2025 in JSON array with: match_name, date, winner, country, flag (ISO code).",
  upcoming: "Give all Basketball matches that will happen in October 2025 in JSON array with: match_name, date, time, country, flag (ISO code).",
  live: "Give 3 current live Basketball matches in October 2025 in JSON array with: match_name, quarter, leader, country, flag (ISO code), status.",

  // International
  pastInternational: "Give all International Basketball matches that already happened in October 2025 in JSON array with: match_name, date, winner, country, flag (ISO code).",
  upcomingInternational: "Give all International Basketball matches that will happen in October 2025 in JSON array with: match_name, date, time, country, flag (ISO code).",
  liveInternational: "Give 3 current live International Basketball matches in October 2025 in JSON array with: match_name, quarter, leader, country, flag (ISO code), status.",

  // League
  pastLeague: "Give all League Basketball matches that already happened in October 2025 in JSON array with: match_name, date, winner, country, flag (ISO code).",
  upcomingLeague: "Give all League Basketball matches that will happen in October 2025 in JSON array with: match_name, date, time, country, flag (ISO code).",
  liveLeague: "Give 3 current live League Basketball matches in October 2025 in JSON array with: match_name, quarter, leader, country, flag (ISO code), status.",
};



// --- Generic Controller Factory ---
function createMatchController(promptKey) {
  return async (req, res) => {
    const data = await fetchMatches(prompts[promptKey]);
    res.json({ success: true, matches: data });
  };
}

// --- Export Controllers ---
module.exports = {
  getPastMatches: createMatchController("past"),
  getUpcomingMatches: createMatchController("upcoming"),
  getLiveMatches: createMatchController("live"),

  getPastInternationalMatches: createMatchController("pastInternational"),
  getUpcomingInternationalMatches: createMatchController("upcomingInternational"),
  getLiveInternationalMatches: createMatchController("liveInternational"),

  getPastLeagueMatches: createMatchController("pastLeague"),
  getUpcomingLeagueMatches: createMatchController("upcomingLeague"),
  getLiveLeagueMatches: createMatchController("liveLeague"),
};
