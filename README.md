# DevTHPrado — Portfólio de Sistemas

Portfólio profissional feito com React, TypeScript e Vite para apresentar soluções digitais como catálogos com pedido via WhatsApp, landing pages, dashboards e automações.

## Tecnologias

- React
- TypeScript
- Vite
- Framer Motion
- Lucide React
- XLSX

## Rodando localmente

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
```

O resultado fica na pasta `dist`.

## Deploy na Vercel

Configuração recomendada:

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

O arquivo `vercel.json` já contém rewrite para `index.html`, evitando erro 404 ao abrir diretamente rotas como `/catalogo-whatsapp`, `/personal-trainer`, `/mini-dashboard` e `/automacao-processos`.
