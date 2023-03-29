Teste prático - React
Utilizar:
Mysql(Criar estrutura conforme desejar) - IDE opcional mysqlfront
Usar Sequelize-Typescrypt

Criar tela de login com usuário e senha.
As senhas devem ser criptografadas e verificadas com Bcrypt
A autenticação das requisições deve ser via Bearer token (JWT)

Entrar em tela com menu lateral recolhível com 3 itens sendo eles:

*Dashboard
*Colégio
*Salas

Colégio:
Cadastro de colégios podendo inserir: 
Nome, 
Estado,Cidade 
Símbolo(Imagem, upload de imagem e salvar em diretório local)

Salas:
Cadastro de salas de aulas com itens:
Nome
Capacidade de mesas
Bloqueada 
Lista de 5 professores para serem escolhidos mais de 1
colégio(relacionamento com os colégios criados)
Grade de aulas: Imagem salva no banco em Base64
Protocolo: upload de Arquivo em docx.

Criar 'cards' com cada sala criada podendo nesses cards excluir, editar,bloquear-desbloquear.

Extra:
Vite
Bootstrap
Styled components
Dashboard - Gráficos livres sobre colegios e salas com indicadores que desejar.
Gerar PDF com dados de salas.
