const form = document.querySelector('form');
const resultsDiv = document.getElementById('results'); // Elemento para exibir resultados

//Função que faz a busca o herói na API
async function buscahero(query) {
    const url = `/api/busca-hero?query=${encodeURIComponent(query)}`;

    try {
        const req = await fetch(url);
        const res = await req.json();

        // 2. Mova o console.log para dentro da função
        console.log(res);

        // Extra: Exibe o resultado na tela
        displayResults(res);

    } catch (error) {
        console.error("Erro ao buscar o herói:", error);
        resultsDiv.innerHTML = `<p>Ocorreu um erro na busca.</p>`;
    }
}

//Chamando a função quando o formulário for enviado pelo usuário
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let query = form.querySelector("input").value;

    if (query) { // Só busca se o campo não estiver vazio
        buscahero(query);
    }
});

// Função para exbir os resultados na tela
function displayResults(data) {
    resultsDiv.innerHTML = ''; // Limpa resultados anteriores

    if (data.response === 'error') {
        resultsDiv.innerHTML = `<p>${data.error}</p>`;
        return;
    }

    if (data.results) {
        data.results.forEach(hero => {
            resultsDiv.innerHTML += `
                        <div class="hero-card">
                            <div class="hero-header">    
                                <h2>${hero.name}</h2>
                                <img src="${hero.image.url}" alt="${hero.name}" width="150">
                            </div>
                            <p><span class="cor-info">Identidade:</span> ${hero.biography['full-name']}</p>
                            <p><span class="cor-info">Ocupação:</span> ${hero.work['occupation']}</p>
                            <p><span class="cor-info">Primeira Aparição:</span> ${hero.biography['first-appearance']}</p>
                            <p><span class="cor-info">Editora:</span> ${hero.biography['publisher']}</p>
                        </div>
                    `;
        });
    }
}