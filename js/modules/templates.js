// js/modules/templates.js
import { obterAdocoesSalvas } from './storage.js';

export const listaAnimais = [
  { nome: 'Rex', porte: 'Médio', descricao: 'Brincalhão, cheio de energia e adora passear no parque!' },
  { nome: 'Luna', porte: 'Pequeno', descricao: 'Dócil, calma e excelente companheira para ambientes tranquilos.' },
  { nome: 'Thor', porte: 'Grande', descricao: 'Protetor, muito leal e sociável com outros pets.' }
];

export function renderHome() {
  return `
    <section class="home-banner">
      <h1>Bem-vindo à ONG dos Bichinhos!</h1>
      <p>Conectamos corações cheios de amor a animais resgatados que só precisam de um novo lar.</p>
      <a href="#/projetos" class="btn-cta">Conheça Nossos Amigos</a>
    </section>
  `;
}

export function renderProjetos() {
  const cardsHtml = listaAnimais.map(animal => `
    <article class="card-pet">
      <div>
        <h3>${animal.nome}</h3>
        <span class="tag-porte">Porte ${animal.porte}</span>
        <p>${animal.descricao}</p>
      </div>
      <button type="button" class="btn-adotar">Quero Adotar</button>
    </article>
  `).join('');

  return `
    <section class="projetos">
      <h2 class="secao-titulo">Nossos Amigos para Adoção</h2>
      <div class="grid-cards">
        ${cardsHtml}
      </div>
    </section>
  `;
}

export function renderCadastro() {
  return `
    <section class="cadastro">
      <div class="card-form">
        <h2>Formulário de Adoção</h2>
        <form id="FormAdocao" novalidate>
          <div class="grupo-campo">
            <label for="nome">Seu Nome Completo:</label>
            <input type="text" id="nome" placeholder="Ex: Maria Silva" required>
            <span class="msg-erro" id="erro-nome"></span>
          </div>

          <div class="grupo-campo">
            <label for="email">Seu E-mail:</label>
            <input type="email" id="email" placeholder="exemplo@email.com" required>
            <span class="msg-erro" id="erro-email"></span>
          </div>

          <div class="grupo-campo">
            <label for="telefone">Seu WhatsApp / Telefone:</label>
            <input type="tel" id="telefone" placeholder="(11) 98765-4321" required>
            <span class="msg-erro" id="erro-telefone"></span>
          </div>

          <button type="submit" class="btn-enviar">Confirmar Cadastro</button>
        </form>
      </div>
    </section>
  `;
}

export function renderAdocoes() {
  const adocoes = obterAdocoesSalvas();
  
  if (adocoes.length === 0) {
    return `
      <section class="adocoes">
        <h2 class="secao-titulo">Candidaturas Registradas</h2>
        <p style="text-align: center;">Nenhuma candidatura enviada até o momento. Seja o primeiro a adotar!</p>
      </section>
    `;
  }

  const linhas = adocoes.map(item => `
    <tr>
      <td><strong>${item.nome}</strong></td>
      <td>${item.email}</td>
      <td>${item.telefone}</td>
      <td>${item.data}</td>
    </tr>
  `).join('');

  return `
    <section class="adocoes">
      <h2 class="secao-titulo">Candidaturas Registradas</h2>
      <table class="tabela-adocoes">
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          ${linhas}
        </tbody>
      </table>
    </section>
  `;
}