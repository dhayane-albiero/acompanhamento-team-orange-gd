# Documentação Completa — Sistema de Acompanhamento Orange Viagens

> Última atualização: 29/04/2026  
> Responsável: Dhayane Albiero

---

## 1. VISÃO GERAL DO PROJETO

Sistema de acompanhamento de plano de desenvolvimento de 18 meses para 4 coordenadoras da Diretoria de Operações da Orange Viagens. Permite que cada coordenadora registre anotações, conclua tarefas e envie para aprovação da Dhayane. A Dhayane acompanha tudo via dashboard centralizado.

---

## 2. INFRAESTRUTURA ATUAL (funcionando)

### Hospedagem
- **GitHub Pages** (gratuito, sem limite de banda)
- Repositório: `github.com/dhayane-albiero/acompanhamento-team-orange-gd` (público)
- URL base: `dhayane-albiero.github.io/acompanhamento-team-orange-gd/`

### Banco de Dados
- **Supabase** (plano gratuito)
- Projeto: `plano-desenvolvimento-orange`
- Project ID: `xyxjcbxmedkonyxafurf`
- URL: `https://xyxjcbxmedkonyxafurf.supabase.co`
- Anon Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5eGpjYnhtZWRrb255eGFmdXJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MTc0NzksImV4cCI6MjA5MTM5MzQ3OX0.7EDny-taTst3q4_iJP7frMyacmlpuZmqwoBrE0gRsRM`

### Por que GitHub Pages funciona (e os outros não)
- **Netlify**: pausado por exceder limite do plano gratuito
- **Cloudflare Workers**: bloqueava chamadas diretas ao Supabase (CORS)
- **GitHub Pages**: serve arquivos estáticos sem restrição de CORS — o browser faz as chamadas direto ao Supabase, que aceita chamadas de `github.io`

---

## 3. URLS DO SISTEMA

| Página | URL |
|--------|-----|
| Dashboard (Dhayane) | `dhayane-albiero.github.io/acompanhamento-team-orange-gd/dashboard.html` |
| Katharine | `dhayane-albiero.github.io/acompanhamento-team-orange-gd/katharine.html` |
| Roberta | `dhayane-albiero.github.io/acompanhamento-team-orange-gd/roberta.html` |
| Rafaella | `dhayane-albiero.github.io/acompanhamento-team-orange-gd/rafaella.html` |
| Laura | `dhayane-albiero.github.io/acompanhamento-team-orange-gd/laura.html` |

---

## 4. ARQUIVOS NO REPOSITÓRIO

| Arquivo | Descrição |
|---------|-----------|
| `dashboard.html` | Dashboard da Dhayane — visão geral, datas, observações, aprovações, histórico |
| `katharine.html` | Página da Katharine Casteluci — Coordenadora de Operações |
| `roberta.html` | Página da Roberta — Coordenadora de Treinamento & Qualidade |
| `rafaella.html` | Página da Rafaella Reis — Coordenadora de Produtos Hoteleiros & Vacation Home |
| `laura.html` | Página da Laura — Coordenadora de Produtos Cruzeiros |
| `_redirects` | Arquivo de roteamento (legado do Netlify, não tem efeito no GitHub Pages) |
| `_worker.js` | Proxy para Cloudflare Workers (legado, não tem efeito no GitHub Pages) |
| `dashboard-fix.html` | Arquivo legado — pode ser deletado |
| `katharine (2).html` | Arquivo duplicado legado — pode ser deletado |

---

## 5. BANCO DE DADOS — TABELAS

### `task_states` — Status das tarefas
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid | Chave primária |
| task_id | text | ID da tarefa (ex: k1, r3, p7) — UNIQUE |
| team_key | text | Chave da coordenadora (katharine, roberta, rafaella, laura) |
| status | text | aberta, aguardando, aprovada, devolvida, parcial |
| how_done | text | Descrição de como a tarefa foi executada |
| execution | text | Alias de how_done (legado) |
| submitted_at | timestamptz | Quando foi enviada para aprovação |
| reviewed_at | timestamptz | Quando foi revisada pela Dhayane |
| review_comment | text | Comentário da Dhayane ao devolver |

### `task_notes` — Anotações das coordenadoras
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | bigint | Chave primária |
| task_id | text | ID da tarefa — UNIQUE |
| team_key | text | Chave da coordenadora |
| note | text | Texto da anotação |
| note_text | text | Alias de note (legado) |
| updated_at | timestamptz | Última atualização |

### `task_manager_comments` — Observações da Dhayane por tarefa
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid | Chave primária |
| task_id | text | ID da tarefa — UNIQUE |
| team_key | text | Chave da coordenadora |
| comment | text | Observação da Dhayane visível na tarefa |
| updated_at | timestamptz | Última atualização |

### `plan_dates` — Datas dos marcos
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | bigint | Chave primária |
| team_key | text | Chave da coordenadora |
| marco_id | text | ID do marco (ex: m1k, m2r) — UNIQUE com team_key |
| start_date | date | Data de início do marco |
| end_date | date | Data de conclusão do marco |

---

## 6. IDs DAS TAREFAS

### Katharine (k1–k25) — Coordenadora de Operações
- M1 Fundação: k1–k9
- M2 Estruturação: k10–k15
- M3 Aceleração: k16–k20
- M4 Escala: k21–k25

### Roberta (r1–r27) — Coordenadora de Treinamento & Qualidade
- M1 Fundação: r1–r9
- M2 Estruturação: r10–r16
- M3 Aceleração: r17–r22
- M4 Escala: r23–r27

### Rafaella (p1–p28) — Coordenadora de Produtos Hoteleiros & Vacation Home
- M1 Fundação: p1–p9
- M2 Estruturação: p10–p15
- M3 Aceleração: p16–p22
- M4 Escala: p23–p28

### Laura (l1–l24) — Coordenadora de Produtos Cruzeiros
- M1 Estruturação: l1–l9
- M2 Consolidação: l10–l18
- M3 Maturidade: l19–l24

---

## 7. IDs DOS MARCOS

| Marco ID | Coordenadora | Fase |
|----------|-------------|------|
| m1k | katharine | M1 — Fundação |
| m2k | katharine | M2 — Estruturação |
| m3k | katharine | M3 — Aceleração |
| m4k | katharine | M4 — Escala |
| m1r | roberta | M1 — Fundação |
| m2r | roberta | M2 — Estruturação |
| m3r | roberta | M3 — Aceleração |
| m4r | roberta | M4 — Escala |
| m1p | rafaella | M1 — Fundação |
| m2p | rafaella | M2 — Estruturação |
| m3p | rafaella | M3 — Aceleração |
| m4p | rafaella | M4 — Escala |
| m1l | laura | M1 — Estruturação |
| m2l | laura | M2 — Consolidação |
| m3l | laura | M3 — Maturidade Estratégica |

---

## 8. ESTADO ATUAL DOS DADOS (29/04/2026)

### Tarefas com status registrado
| task_id | team_key | status |
|---------|----------|--------|
| k1 | katharine | aprovada |

### Observações da Dhayane registradas
- **k1 (Katharine)**: Análise de vulnerabilidades operacionais — dependências na Gisele (voos) e Michelle (emissões), ausência de SLA no pós-travel. Proposta de 7 ações em 2 fases. Link: planilha de mapeamento operacional.

### Datas dos marcos configuradas
- **m1k (Katharine)**: Início 21/04/2026 · Conclusão 21/09/2026

---

## 9. FUNCIONALIDADES DO SISTEMA

### Página de cada coordenadora
- Visualiza tarefas organizadas por marco com progresso
- Adiciona anotações livres por tarefa (salvas no banco)
- Vê observações da Dhayane diretamente na tarefa
- Clica em "Concluir" → preenche "como foi feito" → envia para aprovação
- Vê status atualizado: Aberta / Aguardando / Aprovada / Devolvida
- Vê datas de início e conclusão de cada marco

### Dashboard da Dhayane
- **Visão geral**: cards de cada coordenadora com progresso
- **Datas dos marcos**: configura início/fim de cada marco para todas
- **Observações por tarefa**: escreve observações vinculadas a tarefas específicas, visíveis para a coordenadora
- **Aprovações**: vê tarefas enviadas, pode aprovar ou devolver com comentário
- **Histórico**: filtra por coordenadora ou status

---

## 10. COMO FAZER ATUALIZAÇÕES

### Para atualizar os arquivos HTML
1. Gere os novos arquivos (com o Claude)
2. Acesse `github.com/dhayane-albiero/acompanhamento-team-orange-gd`
3. Clique em **Add file → Upload files**
4. Arraste os arquivos com os nomes exatos
5. Clique em **Commit changes**
6. GitHub Pages publica automaticamente em ~1 minuto

### Para inserir dados diretamente no banco
Use o Supabase Dashboard ou peça ao Claude para executar SQL no projeto `xyxjcbxmedkonyxafurf`.

### Para adicionar uma nova tarefa manualmente
```sql
INSERT INTO task_states (task_id, team_key, status, how_done, submitted_at)
VALUES ('k2', 'katharine', 'aguardando', 'Descrição aqui', now())
ON CONFLICT (task_id) DO UPDATE SET status = EXCLUDED.status, how_done = EXCLUDED.how_done;
```

### Para aprovar uma tarefa manualmente
```sql
UPDATE task_states 
SET status = 'aprovada', reviewed_at = now(), review_comment = ''
WHERE task_id = 'k1';
```

---

## 11. CONTEXTO DO PROJETO — ESCOPO DA DIRETORIA DE OPERAÇÕES

### Objetivo
Estruturar, implementar e consolidar a Diretoria de Operações com foco em eficiência, escalabilidade, rentabilidade e excelência na experiência do cliente.

### Frentes contempladas
- Coordenação de Produtos Hoteleiros & Vacation Homes (Rafaella)
- Coordenação de Produtos Cruzeiros (Laura)
- Coordenação de Operações (Katharine)
- Coordenação de Treinamento & Qualidade (Roberta)

### Resultado esperado
- Operação estruturada, padronizada e escalável
- Clareza de papéis e autonomia das lideranças
- Processos eficientes com baixa incidência de falhas
- Portfólio competitivo e rentável
- Experiência do cliente consistente e de alta qualidade
- Cultura de performance sustentada por dados

---

## 12. HISTÓRICO TÉCNICO — LIÇÕES APRENDIDAS

| Plataforma | Situação | Motivo |
|-----------|----------|--------|
| Netlify | ❌ Pausado | Excedeu limite do plano gratuito |
| Cloudflare Workers | ❌ Descartado | CORS bloqueava chamadas ao Supabase do browser |
| Cloudflare Pages | ❌ Não tentado com sucesso | Configuração complexa com Workers |
| **GitHub Pages** | ✅ Funcionando | Sem restrições de CORS, gratuito e ilimitado |
| Supabase Edge Functions | ❌ Descartado | Plano gratuito bloqueia chamadas externas |

### Causa raiz do problema de CORS
O browser bloqueia chamadas JavaScript para domínios externos quando o servidor de origem não retorna os headers `Access-Control-Allow-Origin` corretos. O Supabase aceita chamadas de `github.io` mas bloqueava as de `workers.dev` (Cloudflare). A solução definitiva foi usar GitHub Pages.

---

## 13. PRÓXIMAS EVOLUÇÕES SUGERIDAS

- [ ] Testar o botão "Concluir" para Roberta, Rafaella e Laura
- [ ] Verificar se anotações salvam corretamente para todas
- [ ] Adicionar observações da Dhayane por tarefa para outras coordenadoras
- [ ] Configurar datas dos marcos para Roberta, Rafaella e Laura
- [ ] Deletar arquivos legados do repositório: `dashboard-fix.html`, `katharine (2).html`, `_worker.js`
- [ ] Considerar upgrade do Supabase se o banco atingir limite do plano gratuito
