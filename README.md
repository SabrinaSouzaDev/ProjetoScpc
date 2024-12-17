<!-- <div align="center">
  <img src="public/static/images/logo/LogoDPECompress.png" alt="Logo DPE" width="200"/>
</div> -->

# SCPC - Front

Sistema criado com minha participação para Defensoria Pública do Estado do Pará com o intuito de realizar o **gerenciamento de folgas, pecúnias e relatórios**. Este projeto utiliza tecnologias modernas de front-end para garantir uma interface eficiente e responsiva.

---

## 📦 Stack utilizada

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Biblioteca UI**: [React](https://react.dev/) com [Shadcn UI](https://ui.shadcn.com/)
- **Estilização**: [TailwindCSS](https://tailwindcss.com/)
- **Validação**: [Zod](https://zod.dev/)
- **Formulários**: [React Hook Form](https://react-hook-form.com/)
- **Gerenciamento de Estado**: [Recoil](https://recoiljs.org/)
- **Ícones**: [Phosphor Icons](https://phosphoricons.com/), [Lucide Icons](https://lucide.dev/)
- **Testes**: [Vitest](https://vitest.dev/)
- **Charts**: [ApexCharts](https://apexcharts.com/)
- **Data Manipulation**: [Date-fns](https://date-fns.org/)

---

## 🚀 Clonando o projeto

Para clonar o repositório, você pode utilizar **SSH** ou **HTTPS**.

### Clonando via SSH

```bash
git clone git@gitlab.defensoria.pa.def.br:folgas/scpc-front.git
```
## 🧹 Outras tarefas disponíveis

### Build do projeto
Para gerar uma versão otimizada do projeto, execute:

```bash
npm run build
```

#### Iniciar em produção
Após a build, inicie o servidor de produção com:
```bash
npm run build
```

### Limpeza eslint
Corrigir problemas de lint

```bash
npm run lint
```

Limpeza e reinstalação

```bash
npm run install:clean
```
#### 🔗 Links úteis
- [Documentação Next.js](https://nextjs.org/docs)
- [Documentação Shadcn UI](https://ui.shadcn.dev/)
- [Documentação TailwindCSS](https://tailwindcss.com/docs)
- [Documentação React Hook Form](https://react-hook-form.com/)

## 📝 Estrutura do projeto

##### Abaixo está um resumo da estrutura principal do projeto:

```plaintext
scpc-front/
├── public/                      # Imagens e assets estáticos
│   └── static/images/logo/      # Logo e imagens
├── src/
│   ├── components/              # Componentes reutilizáveis
│   ├── hooks/                   # Hooks personalizados
│   ├── pages/                   # Páginas do Next.js
│   ├── services/                # Chamadas para API e serviços
│   ├── styles/                  # Estilos Tailwind e globais
│   └── utils/                   # Funções utilitárias
├── .env.development.example     # Exemplo de variáveis de ambiente
├── package.json                 # Configuração de dependências
└── README.md                    # Documentação do projeto