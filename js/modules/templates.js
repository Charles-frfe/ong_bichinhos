// js/modules/templates.js
import { obterAdocoesSalvas } from './storage.js';

export const listaAnimais = [
  { id: 'rex', nome: 'Rex', especie: 'Cachorro', idade: '2 anos', porte: 'Médio', sexo: 'Macho', foto: '../Imagens/rex.jpg', descricao: 'Brincalhão, cheio de energia e adora passear no parque!' },
  { id: 'luna', nome: 'Luna', especie: 'Cachorro', idade: '1 ano', porte: 'Pequeno', sexo: 'Fêmea', foto: '../Imagens/luna.jpg', descricao: 'Dócil, calma e excelente companheira para ambientes tranquilos.' },
  { id: 'thor', nome: 'Thor', especie: 'Cachorro', idade: '3 anos', porte: 'Grande', sexo: 'Macho', foto: '../Imagens/thor.jpg', descricao: 'Protetor, muito leal e sociável com outros pets.' },
  { id: 'nina', nome: 'Nina', especie: 'Gata', idade: '1 ano', porte: 'Pequeno', sexo: 'Fêmea', foto: '../Imagens/nina.jpg', descricao: 'Curiosa e carinhosa, adora um cantinho tranquilo para descansar.' },
  { id: 'bento', nome: 'Bento', especie: 'Gato', idade: '2 anos', porte: 'Médio', sexo: 'Macho', foto: '../Imagens/bento.jpg', descricao: 'Sociável e brincalhão, gosta de companhia e de observar tudo.' }
];

export const oportunidades = [
  { id: 'lar-temporario', titulo: 'Lar Temporário', descricao: 'Acolha um animal por um período enquanto ele espera uma família definitiva.' },
  { id: 'resgate-campo', titulo: 'Resgate de Campo', descricao: 'Ajude no transporte e no apoio a resgates organizados pela equipe.' },
  { id: 'eventos-feira', titulo: 'Eventos de Feira', descricao: 'Apoie feiras de adoção na organização, divulgação e recepção do público.' }
];

export const PIX_DEMO = 'PIX-DEMONSTRACAO-SEM-PAGAMENTO';

// Os dados e as fotos são fictícios; troque-os pelos animais reais antes de publicar como ONG.
function escaparHtml(valor) {
  return String(valor ?? '').replace(/[&<>"']/g, caractere => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[caractere]);
}

export function renderHome() {
  return `
    <section class="home-banner">
      <div class="home-texto">
        <h1>Todo bichinho merece uma família.</h1>
        <p>Conheça os animais e veja como funciona uma candidatura de adoção.</p>
        <a href="#/projetos" class="btn-cta">Conhecer os pets</a>
      </div>
      <img src="../Imagens/imagemcatdog.jpg" alt="Cachorro e gato juntos" class="home-imagem">
    </section>
    <p class="aviso-demo">Projeto demonstrativo: animais, fotos e candidaturas são exemplos. Os dados digitados ficam somente neste navegador.</p>
    <section class="home-ajuda" aria-labelledby="home-ajuda-titulo">
      <h2 id="home-ajuda-titulo" class="secao-titulo">Outras formas de ajudar</h2>
      <div class="grid-cards">
        <a class="atalho-ajuda" href="#/voluntariado"><strong>Seja voluntário</strong><span>Conheça três formas de participar</span></a>
        <a class="atalho-ajuda" href="#/doacoes"><strong>Ajude com doações</strong><span>Veja como uma página de apoio pode funcionar</span></a>
      </div>
    </section>
  `;
}

export function renderProjetos() {
  const cardsHtml = listaAnimais.map(animal => `
    <article class="card-pet">
      <img class="card-pet-foto" src="${animal.foto}" alt="Foto ilustrativa de ${animal.nome}, ${animal.especie.toLowerCase()} de porte ${animal.porte.toLowerCase()}" loading="lazy" width="400" height="400">
      <div class="card-pet-conteudo">
        <h3>${animal.nome}</h3>
        <p class="pet-detalhes">${animal.especie} · ${animal.idade} · ${animal.sexo} · Porte ${animal.porte.toLowerCase()}</p>
        <p>${animal.descricao}</p>
        <a class="btn-adotar" href="#/cadastro?pet=${animal.id}">Quero adotar ${animal.nome}</a>
      </div>
    </article>
  `).join('');

  return `
    <section class="projetos">
      <h2 class="secao-titulo">Nossos Amigos para Adoção</h2>
      <p class="aviso-demo">Pets e fotos ilustrativos para apresentar o projeto.</p>
      <div class="grid-cards">
        ${cardsHtml}
      </div>
    </section>
  `;
}

export function renderVoluntariado() {
  const cards = oportunidades.map(opcao => `
    <article class="card-apoio">
      <h3>${opcao.titulo}</h3>
      <p>${opcao.descricao}</p>
      <button class="btn-adotar" type="button" data-voluntariado="${opcao.id}">Quero ser voluntário</button>
    </article>
  `).join('');

  return `
    <section aria-labelledby="titulo-voluntariado">
      <h2 id="titulo-voluntariado" class="secao-titulo">Voluntariado de Resgate</h2>
      <p class="aviso-demo">Escolha uma forma de ajudar. A inscrição abaixo é apenas uma demonstração e não é enviada à ONG.</p>
      <div class="grid-cards">${cards}</div>
    </section>
    <dialog id="modal-voluntario" class="modal-voluntario" aria-labelledby="titulo-modal">
      <div class="modal-topo">
        <h2 id="titulo-modal">Inscrição de voluntariado</h2>
        <button type="button" id="fechar-voluntario" class="btn-fechar" aria-label="Fechar inscrição">×</button>
      </div>
      <p class="aviso-demo">Dados de exemplo salvos somente neste navegador. Nenhuma inscrição será enviada.</p>
      <form id="form-voluntario">
        <div class="grupo-campo">
          <label for="vol-area">Como gostaria de ajudar?</label>
          <select id="vol-area" required>
            <option value="">Selecione uma opção</option>
            ${oportunidades.map(opcao => `<option value="${opcao.id}">${opcao.titulo}</option>`).join('')}
          </select>
        </div>
        <div class="grupo-campo">
          <label for="vol-nome">Seu nome</label>
          <input id="vol-nome" type="text" autocomplete="name" minlength="3" required>
        </div>
        <div class="grupo-campo">
          <label for="vol-email">Seu e-mail</label>
          <input id="vol-email" type="email" autocomplete="email" required>
        </div>
        <button class="btn-enviar" type="submit">Salvar inscrição de exemplo</button>
      </form>
      <p id="retorno-voluntario" class="retorno-acao" role="status" aria-live="polite"></p>
      <button type="button" id="limpar-voluntarios" class="btn-limpar">Apagar inscrições locais</button>
    </dialog>
  `;
}

export function renderDoacoes() {
  return `
    <section aria-labelledby="titulo-doacoes">
      <h2 id="titulo-doacoes" class="secao-titulo">Ajuda Financeira</h2>
      <p class="aviso-demo">Protótipo: não há chave Pix válida nem recebimento de doações nesta página.</p>
      <div class="doacao-painel">
        <div>
          <h3>Apoie os cuidados veterinários</h3>
          <p>Consultas, exames, medicamentos e alimentação fazem parte da rotina de resgate. Veja como a área de doação pode apresentar essas necessidades.</p>
          <h4>Escolha um valor sugerido</h4>
          <div class="valores-doacao" role="group" aria-label="Valores sugeridos para demonstração">
            ${[20, 50, 100].map(valor => `<button class="valor-doacao" type="button" data-valor="${valor}" aria-pressed="false">R$ ${valor}</button>`).join('')}
          </div>
          <p id="valor-escolhido" class="retorno-acao" role="status" aria-live="polite">Nenhum valor selecionado.</p>
          <h4>Pix Copia e Cola (simulado)</h4>
          <div class="pix-copia">
            <code id="chave-pix">${PIX_DEMO}</code>
            <button type="button" id="copiar-pix" class="btn-adotar">Copiar exemplo</button>
          </div>
          <p id="retorno-pix" class="retorno-acao" role="status" aria-live="polite">Este código não permite pagamentos.</p>
        </div>
        <div class="qr-exemplo">
          <img src="../Imagens/qr-pix-exemplo.svg" alt="Ilustração de QR Code com a palavra DEMO; não pode ser escaneado" width="220" height="220">
          <p>QR Code ilustrativo · não escaneável</p>
        </div>
      </div>
    </section>
  `;
}

export function renderCadastro(petSelecionado = '') {
  const opcoes = listaAnimais.map(animal => `
    <option value="${animal.id}" ${animal.id === petSelecionado ? 'selected' : ''}>${animal.nome}</option>
  `).join('');
  return `
    <section class="cadastro">
      <div class="card-form">
        <h2>Formulário de Adoção</h2>
        <p class="aviso-demo">Demonstração: o cadastro fica salvo apenas neste navegador e não é enviado a nenhuma ONG.</p>
        <form id="FormAdocao" novalidate>
          <div class="grupo-campo">
            <label for="pet">Animal de interesse:</label>
            <select id="pet" required>
              <option value="">Selecione um animal</option>
              ${opcoes}
            </select>
            <span class="msg-erro" id="erro-pet" role="alert"></span>
          </div>
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

          <button type="submit" class="btn-enviar">Salvar candidatura de exemplo</button>
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
        <p class="aviso-demo">Nenhuma candidatura de exemplo salva neste navegador.</p>
      </section>
    `;
  }

  const linhas = adocoes.map(item => `
    <tr>
      <td><strong>${escaparHtml(item.nome)}</strong></td>
      <td>${escaparHtml(listaAnimais.find(animal => animal.id === item.pet)?.nome || 'Não informado')}</td>
      <td>${escaparHtml(item.email)}</td>
      <td>${escaparHtml(item.telefone)}</td>
      <td>${escaparHtml(item.data)}</td>
    </tr>
  `).join('');

  return `
    <section class="adocoes">
      <h2 class="secao-titulo">Candidaturas Registradas</h2>
      <p class="aviso-demo">Estes dados ficam apenas neste navegador. Não foram enviados à ONG.</p>
      <button type="button" id="btn-limpar-candidaturas" class="btn-limpar">Apagar candidaturas deste navegador</button>
      <table class="tabela-adocoes">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Pet</th>
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
