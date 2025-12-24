import { GoogleGenerativeAI } from "@google/generative-ai";
export const summarizeText = async (text) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  // const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  // const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `Summarize:${text}`;
    
  try {
    // const response = await fetch(url, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ contents: `Summarize:${text}` }),
    // });
    const result = await model.generateContent(prompt);

    // const data = await response.json();
  
    return result.response.text() || "Summary unavailable";
  } catch (error) {
    console.error("Error summarizing:", error);
    return "Error generating summary.";
  }
};

// Example usage of summarizeText function
// const exampleText = "This is an example text to summarize.";
// summarizeText(exampleText).then(summary => console.log(summary));