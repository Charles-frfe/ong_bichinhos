const CHAVE_STORAGE = 'adocoes_ong';

export function obterAdocoesSalvas() {
    const dados = localStorage.getItem('adocoes_ong');
    //Se existir algo salvo, converte de texto para array; senão, retorna um array vazio
    return dados ? JSON.parse(dados) : [];
}

export function salvarNovaAdocao(adocao) {
    const listaAtual = obterAdocoesSalvas();
    listaAtual.push(adocao);
    // Converte o array de objetos em texto string e grava no localStorage
    localStorage.setItem('adocoes_ong', JSON.stringify(listaAtual));
}
