// js/main.js
import { listaAnimais, oportunidades, PIX_DEMO, renderHome, renderProjetos, renderCadastro, renderAdocoes, renderVoluntariado, renderDoacoes } from './modules/templates.js';
import { salvarNovaAdocao, limparAdocoesSalvas, salvarInscricaoVoluntario, limparInscricoesVoluntarios } from './modules/storage.js';

const rotas = {
  '#/': renderHome,
  '#/projetos': renderProjetos,
  '#/adocoes': renderAdocoes,
  '#/voluntariado': renderVoluntariado,
  '#/doacoes': renderDoacoes
};

const appContainer = document.getElementById('app');

function navegar() {
  const hashAtual = window.location.hash || '#/';
  if (hashAtual.startsWith('#/cadastro') && (hashAtual === '#/cadastro' || hashAtual.startsWith('#/cadastro?'))) {
    const parametros = new URLSearchParams(hashAtual.split('?')[1] || '');
    const pet = parametros.get('pet');
    appContainer.innerHTML = renderCadastro(listaAnimais.some(animal => animal.id === pet) ? pet : '');
    return;
  }

  const renderView = rotas[hashAtual];

  if (renderView) {
    appContainer.innerHTML = renderView();
  } else {
    appContainer.innerHTML = '<h2>404 - Página não encontrada</h2>';
  }
}

window.addEventListener('hashchange', navegar);
window.addEventListener('DOMContentLoaded', navegar);

// Alternância de Alto Contraste (Acessibilidade)
const btnContraste = document.getElementById('btn-contraste');
if (btnContraste) {
  btnContraste.addEventListener('click', () => {
    document.body.classList.toggle('alto-contraste');
  });
}

// Submissão do Formulário de Adoção
appContainer.addEventListener('submit', (event) => {
  if (event.target && event.target.id === 'FormAdocao') {
    event.preventDefault();

    const campoNome = document.getElementById('nome');
    const campoPet = document.getElementById('pet');
    const campoEmail = document.getElementById('email');
    const campoTelefone = document.getElementById('telefone');

    const erroNome = document.getElementById('erro-nome');
    const erroPet = document.getElementById('erro-pet');
    const erroEmail = document.getElementById('erro-email');
    const erroTelefone = document.getElementById('erro-telefone');

    [campoPet, campoNome, campoEmail, campoTelefone].forEach(campo => campo.classList.remove('campo-invalido', 'campo-valido'));
    [erroPet, erroNome, erroEmail, erroTelefone].forEach(span => span.textContent = '');

    let formularioValido = true;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexTelefone = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

    const animalEscolhido = listaAnimais.find(animal => animal.id === campoPet.value);
    if (!animalEscolhido) {
      campoPet.classList.add('campo-invalido');
      erroPet.textContent = 'Selecione um animal.';
      formularioValido = false;
    } else {
      campoPet.classList.add('campo-valido');
    }

    if (campoNome.value.trim().length < 3) {
      campoNome.classList.add('campo-invalido');
      erroNome.textContent = 'O nome deve ter pelo menos 3 caracteres.';
      formularioValido = false;
    } else {
      campoNome.classList.add('campo-valido');
    }

    if (!regexEmail.test(campoEmail.value.trim())) {
      campoEmail.classList.add('campo-invalido');
      erroEmail.textContent = 'Insira um e-mail válido.';
      formularioValido = false;
    } else {
      campoEmail.classList.add('campo-valido');
    }

    if (!regexTelefone.test(campoTelefone.value.trim())) {
      campoTelefone.classList.add('campo-invalido');
      erroTelefone.textContent = 'Informe um telefone válido.';
      formularioValido = false;
    } else {
      campoTelefone.classList.add('campo-valido');
    }

    if (!formularioValido) return;

    const novaAdocao = {
      id: Date.now(),
      pet: animalEscolhido.id,
      nome: campoNome.value.trim(),
      email: campoEmail.value.trim(),
      telefone: campoTelefone.value.trim(),
      data: new Date().toLocaleDateString('pt-BR')
    };

    salvarNovaAdocao(novaAdocao);

    event.target.innerHTML = `
      <div class="feedback-sucesso">
        <h3>Candidatura de exemplo salva!</h3>
        <p>Obrigado, <strong id="nome-confirmacao"></strong>. Seu interesse em <strong id="pet-confirmacao"></strong> foi salvo neste navegador.</p>
        <p style="margin-top: 16px;"><a href="#/adocoes" class="btn-cta">Ver Candidaturas</a></p>
      </div>
    `;
    document.getElementById('nome-confirmacao').textContent = novaAdocao.nome;
    document.getElementById('pet-confirmacao').textContent = animalEscolhido.nome;
  }

  if (event.target?.id === 'form-voluntario') {
    event.preventDefault();
    const form = event.target;
    const area = document.getElementById('vol-area').value;
    const nome = document.getElementById('vol-nome').value.trim();
    const email = document.getElementById('vol-email').value.trim();
    const retorno = document.getElementById('retorno-voluntario');

    if (!oportunidades.some(opcao => opcao.id === area) || nome.length < 3 || !form.reportValidity()) {
      retorno.textContent = 'Confira a atividade, o nome e o e-mail antes de salvar.';
      return;
    }

    salvarInscricaoVoluntario({ id: Date.now(), area, nome, email, data: new Date().toLocaleDateString('pt-BR') });
    retorno.textContent = `Inscrição de exemplo para ${oportunidades.find(opcao => opcao.id === area).titulo} salva somente neste navegador.`;
    form.reset();
  }
});

appContainer.addEventListener('click', async (event) => {
  if (event.target.id === 'btn-limpar-candidaturas' && window.confirm('Apagar todas as candidaturas salvas neste navegador?')) {
    limparAdocoesSalvas();
    navegar();
  }

  const botaoVoluntario = event.target.closest('[data-voluntariado]');
  if (botaoVoluntario) {
    document.getElementById('vol-area').value = botaoVoluntario.dataset.voluntariado;
    document.getElementById('retorno-voluntario').textContent = '';
    document.getElementById('modal-voluntario').showModal();
  }

  if (event.target.id === 'fechar-voluntario') {
    document.getElementById('modal-voluntario').close();
  }

  if (event.target.id === 'limpar-voluntarios' && window.confirm('Apagar as inscrições de exemplo salvas neste navegador?')) {
    limparInscricoesVoluntarios();
    document.getElementById('retorno-voluntario').textContent = 'Inscrições locais apagadas.';
  }

  const botaoValor = event.target.closest('[data-valor]');
  if (botaoValor) {
    appContainer.querySelectorAll('.valor-doacao').forEach(botao => botao.setAttribute('aria-pressed', String(botao === botaoValor)));
    document.getElementById('valor-escolhido').textContent = `R$ ${botaoValor.dataset.valor} selecionados para demonstração. Nenhum pagamento será feito.`;
  }

  if (event.target.id === 'copiar-pix') {
    const retorno = document.getElementById('retorno-pix');
    try {
      await navigator.clipboard.writeText(PIX_DEMO);
      retorno.textContent = 'Código de exemplo copiado. Ele não permite pagamentos.';
    } catch {
      retorno.textContent = 'Não foi possível copiar automaticamente. O código de exemplo está acima.';
    }
  }
});
