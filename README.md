# Refund

Uma aplicação React para gerenciamento de solicitações de reembolso, permitindo aos usuários criar, visualizar e gerenciar pedidos de reembolso com upload de recibos.

## Funcionalidades

- **Página Inicial**: Visão geral dos reembolsos.
- **Criar Solicitação**: Formulário para submeter novos pedidos de reembolso com upload de recibos.
- **Visualizar Solicitação**: Detalhes de uma solicitação específica.
- **Página de Sucesso**: Confirmação após submissão bem-sucedida.
- **Gerenciamento de Recibos**: Upload, visualização e exclusão de recibos associados aos reembolsos.
- **Categorização**: Suporte a diferentes categorias de reembolso.
- **Paginação**: Navegação eficiente através de listas de reembolsos.

## Tecnologias Utilizadas

- **React 19**: Biblioteca para construção da interface do usuário.
- **TypeScript**: Tipagem estática para JavaScript.
- **Vite**: Ferramenta de build rápida para desenvolvimento.
- **Tailwind CSS**: Framework CSS utilitário para estilização.
- **React Query**: Gerenciamento de estado e cache para requisições HTTP.
- **Axios**: Cliente HTTP para comunicação com APIs.
- **React Router**: Roteamento para navegação entre páginas.
- **React Hook Form**: Gerenciamento de formulários com validação.

## Pré-requisitos

- Node.js (versão 18 ou superior)
- pnpm (gerenciador de pacotes)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/caiofsena/refund.git
   cd refund
   ```

2. Instale as dependências:
   ```bash
   pnpm install
   ```

## Executando a Aplicação

Para iniciar o servidor de desenvolvimento:
```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:5173`.

## Build para Produção

Para construir a aplicação para produção:
```bash
pnpm build
```

Para visualizar a build localmente:
```bash
pnpm preview
```

## Scripts Disponíveis

- `pnpm dev`: Inicia o servidor de desenvolvimento.
- `pnpm build`: Constrói a aplicação para produção.
- `pnpm lint`: Executa o linter ESLint.
- `pnpm preview`: Visualiza a build de produção localmente.

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis (botões, inputs, etc.)
├── core/                # Componentes principais (header, main content, etc.)
├── models/              # Tipos e interfaces TypeScript
├── pages/               # Páginas da aplicação
├── services/            # Serviços para comunicação com APIs
└── assets/              # Ícones e imagens
```

## Licença

Este projeto está sob a licença MIT.
