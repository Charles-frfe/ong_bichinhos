const CHAVE_STORAGE = 'adocoes_ong';
const CHAVE_VOLUNTARIOS = 'voluntarios_ong_demo';

export function obterAdocoesSalvas() {
    const dados = localStorage.getItem(CHAVE_STORAGE);
    //Se existir algo salvo, converte de texto para array; senão, retorna um array vazio
    return dados ? JSON.parse(dados) : [];
}

export function salvarNovaAdocao(adocao) {
    const listaAtual = obterAdocoesSalvas();
    listaAtual.push(adocao);
    // Converte o array de objetos em texto string e grava no localStorage
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(listaAtual));
}

export function limparAdocoesSalvas() {
    localStorage.removeItem(CHAVE_STORAGE);
}

export function salvarInscricaoVoluntario(inscricao) {
    const inscricoes = JSON.parse(localStorage.getItem(CHAVE_VOLUNTARIOS) || '[]');
    inscricoes.push(inscricao);
    localStorage.setItem(CHAVE_VOLUNTARIOS, JSON.stringify(inscricoes));
}

export function limparInscricoesVoluntarios() {
    localStorage.removeItem(CHAVE_VOLUNTARIOS);
}
