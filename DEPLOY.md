# Deploy no Vercel + Registro.br

## 1. Criar conta na Vercel

- Acesse https://vercel.com e cadastre com GitHub

## 2. Subir o projeto

### Opção A — CLI (terminal)

```bash
cd express-leonidas
npx vercel --prod
```

### Opção B — Git (recomendado)

```bash
# Criar repositório no GitHub
git init
git add .
git commit -m "initial"

# Adicionar remote e push
git remote add origin https://github.com/SEU_USUARIO/express-leonidas.git
git branch -M main
git push -u origin main
```

- Acesse https://vercel.com/new
- Importe o repositório
- Vercel detecta Vite + React automaticamente
- Clique em **Deploy**

## 3. Adicionar domínio na Vercel

- No projeto Vercel, vá em **Settings > Domains**
- Digite `seudominio.com.br` e clique em **Add**

A Vercel vai exibir duas opções de configuração DNS. Escolha uma:

---

## 4. Configurar DNS no registro.br

Acesse https://registro.br > "Meus Domínios" > seu domínio > "Alterar DNS"

### Opção 1 — Nameservers (mais fácil)

Substitua os nameservers atuais por:

```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

> Pronto. A Vercel gerencia todo o DNS automaticamente.

### Opção 2 — Registros manuais (DNS permanece no registro.br)

Adicione estes registros:

| Tipo  | Nome | Valor             |
|-------|------|-------------------|
| A     | @    | 76.76.21.21       |
| CNAME | www  | cname.vercel-dns.com |

> Se precisar de email, mantenha os registros MX existentes.

---

## 5. Aguardar propagação

- Pode levar de 5 minutos a 24 horas
- O SSL (HTTPS) é emitido automático pela Vercel

## 6. Verificar

- Acesse https://seudominio.com.br
- Acesse https://seudominio.com.br/admin (senha: admin123)
- Acesse /admin/seed para gerar os 6 artigos iniciais
