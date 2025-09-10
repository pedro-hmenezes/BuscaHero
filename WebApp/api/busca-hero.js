// /api/busca-hero.js

// Importamos o 'fetch' se estiver usando uma versão do Node < 18, ou podemos usar o nativo.
// Para simplicidade, vamos assumir um ambiente que tem 'fetch'. Vercel já fornece isso.

export default async function handler(request, response) {
  // Pegamos o nome do herói que o front-end enviou (ex: /api/busca-hero?query=batman)
  const { query } = request.query;

  // O seu Access Token agora é uma "Variável de Ambiente", muito mais seguro!
  const accessToken = process.env.SUPERHERO_ACCESS_TOKEN;
  
  // Verificamos se tudo o que precisamos está aqui
  if (!accessToken) {
    return response.status(500).json({ error: 'Access token não configurado no servidor.' });
  }
  if (!query) {
    return response.status(400).json({ error: 'Parâmetro "query" é necessário.' });
  }

  const url = `https://www.superheroapi.com/api.php/${accessToken}/search/${query}`;

  try {
    const apiReq = await fetch(url);
    const apiRes = await apiReq.json();
    
    // Retornamos os dados da API para o front-end
    response.status(200).json(apiRes);

  } catch (error) {
    console.error("Erro ao chamar a API do Super-Herói:", error);
    response.status(500).json({ error: 'Erro interno ao buscar dados.' });
  }
}