import fetch from "node-fetch";

const API_URL = "https://api-inference.huggingface.co/models/facebook/mbart-large-50-many-to-many-mmt";
const API_TOKEN = "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"; 
async function translate(text, sourceLang, targetLang) {
  const headers = {
    "Authorization": `Bearer ${API_TOKEN}`
  };

  const payload = {
    inputs: text,
    parameters: {
      source_lang: sourceLang,
      target_lang: targetLang,
    },
    options: {
      wait_for_model: true
    }
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      return result[0].generated_text;
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error making API call:", error);
  }
}

translate("संयुक्त राष्ट्र के प्रमुख का कहना है कि सीरिया में कोई सैन्य समाधान नहीं है", "hi_IN", "fr_XX")
  .then(translation => console.log("Translation:", translation));

translate("الأمين العام للأمم المتحدة يقول إنه لا يوجد حل عسكري في سوريا.", "ar_AR", "en_XX")
  .then(translation => console.log("Translation:", translation));