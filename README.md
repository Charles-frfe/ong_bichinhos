# ONG dos Bichinhos

Projeto demonstrativo de adoção, voluntariado e apoio financeiro feito com HTML, CSS e JavaScript puro. As fotos e os perfis de Rex, Luna, Thor, Nina e Bento são ilustrativos: **não representam animais reais disponíveis para adoção**.

## Como executar

Na pasta do repositório, rode `python -m http.server 8000` e abra `http://localhost:8000/html/`. O servidor local é necessário para carregar os módulos JavaScript corretamente. Não há instalação de dependências.

## Como funciona

1. Em **Nossos Pets**, escolha um animal e clique em **Quero adotar**.
2. O formulário abre com esse pet selecionado; também é possível escolher outro.
3. Ao salvar, a candidatura aparece em **Candidaturas** no mesmo navegador.
4. Em **Voluntariado**, escolha uma atividade para abrir o modal de inscrição. O formulário salva apenas um exemplo local; é possível apagar as inscrições no próprio modal.
5. Em **Doações**, selecione um valor e experimente o botão de copiar. A chave e o QR Code são simulações **sem pagamento**.

As candidaturas usam `localStorage`: são dados locais de demonstração, não são enviados para uma ONG e não aparecem em outro aparelho. Evite usar dados pessoais reais neste protótipo. Para apagar os testes, abra **Candidaturas** e clique em **Apagar candidaturas deste navegador**.

## Substituir os exemplos

Troque as fotos em `Imagens/` e edite `listaAnimais` em `js/modules/templates.js`. Cada animal precisa de um `id` único e uma foto correspondente. As atividades de voluntariado ficam em `oportunidades`, no mesmo arquivo.

A chave `PIX_DEMO` e `Imagens/qr-pix-exemplo.svg` são exemplos inválidos. Para receber doações reais, obtenha uma chave Pix da ONG e gere um QR Code verdadeiro a partir dos dados oficiais. Antes de receber candidaturas ou inscrições reais, também é necessário criar um serviço de envio, uma área administrativa protegida e uma forma adequada de tratar os dados pessoais.
