// ==========================================
// 1. CONTROLO DO CSS (ATIVAR / DESATIVAR)
// ==========================================

// Seleciona o botão de alternância do CSS pelo ID
const btn = document.getElementById("buttonCss");

// Variável de estado para rastrear se o estilo está ativo ou não
let cssAtivo = true;

// Adiciona o evento de clique ao botão
btn.addEventListener("click", () => {
  // Inverte o estado (true vira false, false vira true)
  cssAtivo = !cssAtivo;

  // Seleciona todas as folhas de estilo externas (<link>) e internas (<style>)
  const sheets = document.querySelectorAll('link[rel="stylesheet"], style');

  // Percorre cada elemento de estilo e ativa/desativa a propriedade disabled
  sheets.forEach((sheet) => {
    sheet.disabled = !cssAtivo;
  });

  // Atualiza o texto do botão conforme o estado atual
  btn.textContent = cssAtivo ? "mudar CSS" : "Restaurar CSS";
});

// ==========================================
// 2. EXIBIDOR DE CÓDIGO (LEITOR DE FICHEIROS)
// ==========================================

/**
 * Função assíncrona responsável por carregar e exibir o código-fonte na secção do editor.
 * @param {string} tecnologia - O tipo de ficheiro selecionado ('html', 'css' ou 'js').
 */
async function mostrarCodigo(tecnologia) {
  // Mapeamento entre a tecnologia clicada e o respetivo ficheiro no projeto
  const arquivos = {
    html: "index.html",
    css: "style.css",
    js: "script.js",
  };

  // Obtém o nome do ficheiro correspondente
  const arquivo = arquivos[tecnologia];

  try {
    // Faz a requisição local para ler o conteúdo do ficheiro
    const resposta = await fetch(arquivo);

    // Valida se o ficheiro foi encontrado com sucesso
    if (!resposta.ok) {
      document.getElementById("codigoExibido").textContent =
        "Não foi possível carregar o código.";
      return;
    }

    // Converte a resposta em texto puro
    const codigo = await resposta.text();

    // Insere o código dentro da tag <code> no ecrã
    document.getElementById("codigoExibido").textContent = codigo;

    // Atualiza o cabeçalho do editor com o nome do ficheiro aberto
    document.getElementById("nomeArquivo").textContent = arquivo;
  } catch (erro) {
    // Tratamento de erro caso ocorra alguma falha na requisição
    document.getElementById("codigoExibido").textContent =
      "Erro ao tentar ler o ficheiro: " + erro.message;
  }
}
