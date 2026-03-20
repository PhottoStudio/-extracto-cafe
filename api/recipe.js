export default async function handler(req, res) {
  // Solo acepta POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers (para que el frontend pueda llamarlo)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Falta el prompt' });
  }

  // La API key vive en las variables de entorno de Vercel — nunca en el código
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key no configurada en el servidor' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'Error de API' });
    }

    const text = data.content.map(b => b.text || '').join('');
    return res.status(200).json({ result: text });

  } catch (err) {
    console.error('Error llamando a Anthropic:', err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
