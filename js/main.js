// js/main.js
import { renderHome, renderProjetos, renderCadastro, renderAdocoes } from './modules/templates.js';
import { salvarNovaAdocao } from './modules/storage.js';

const rotas = {
  '#/': renderHome,
  '#/projetos': renderProjetos,
  '#/cadastro': renderCadastro,
  '#/adocoes': renderAdocoes
};

const appContainer = document.getElementById('app');

function navegar() {
  const hashAtual = window.location.hash || '#/';
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
    const campoEmail = document.getElementById('email');
    const campoTelefone = document.getElementById('telefone');

    const erroNome = document.getElementById('erro-nome');
    const erroEmail = document.getElementById('erro-email');
    const erroTelefone = document.getElementById('erro-telefone');

    [campoNome, campoEmail, campoTelefone].forEach(campo => campo.classList.remove('campo-invalido', 'campo-valido'));
    [erroNome, erroEmail, erroTelefone].forEach(span => span.textContent = '');

    let formularioValido = true;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexTelefone = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

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
      nome: campoNome.value.trim(),
      email: campoEmail.value.trim(),
      telefone: campoTelefone.value.trim(),
      data: new Date().toLocaleDateString('pt-BR')
    };

    salvarNovaAdocao(novaAdocao);

    event.target.innerHTML = `
      <div class="feedback-sucesso">
        <h3>Candidatura Enviada com Sucesso!</h3>
        <p>Obrigado, <strong>${novaAdocao.nome}</strong>. Os seus dados foram registrados no sistema.</p>
        <p style="margin-top: 16px;"><a href="#/adocoes" class="btn-cta">Ver Candidaturas</a></p>
      </div>
    `;
  }
});

// Clique nos cartões com SweetAlert2
appContainer.addEventListener('click', (event) => {
  if (event.target && event.target.tagName === 'BUTTON' && event.target.textContent === 'Quero Adotar') {
    const card = event.target.closest('.card-pet');
    const nomePet = card ? card.querySelector('h3').textContent : 'o animalzinho';

    event.target.textContent = 'Interesse Registrado';
    event.target.style.backgroundColor = '#28a745';
    event.target.disabled = true;

    Swal.fire({
      title: 'Interesse Registrado!',
      text: `Recebemos a sua intenção de adotar o pet: ${nomePet}.`,
      icon: 'success',
      confirmButtonText: 'Excelente!',
      confirmButtonColor: '#28a745'
    });
  }
});