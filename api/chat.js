export default async function handler(req, res) {
  // Permite apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, context, validIntents } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY não configurada na Vercel' });
  }

  const prompt = `
    You are the intent classifier for an English learning RPG game.
    The current NPC context: "${context}".
    The player just said: "${message}".
    Classify the player's intent into EXACTLY ONE of these valid IDs: ${validIntents.join(', ')}.
    If it's a casual greeting or none of the above match, use "irrelevant".
    Respond with a valid JSON object ONLY, without markdown, like this: {"intent": "chosen_id"}.
  `;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    let aiText = data.candidates[0].content.parts[0].text;
    
    // Limpa possíveis formatações markdown que a IA possa enviar
    aiText = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(aiText);
    
    return res.status(200).json(parsed);
  } catch (error) {
    console.error('Erro na IA:', error);
    return res.status(500).json({ error: 'Falha ao processar IA', details: error.message });
  }
}