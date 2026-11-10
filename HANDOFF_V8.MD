# 🦊 A Bíblia do Ventu & Biblioteca (v8.0)
**Data:** 10/11/2026
**Status:** Evolução do design, regras de código v2, tópicos da vida real para níveis avançados e monetização inteligente.

---

## 📚 PARTE 1: A Filosofia e o Tom (O Diferencial)

O Ventu não é o Duolingo. Não ensinamos palavras soltas; ensinamos **sobrevivência linguística**. O foco é **Registro** (formal vs. casual), **Subtexto** (ironia, indiretas) e **Tom**. 
*   **Idioma das Instruções:** O diálogo é sempre 100% em inglês. As instruções (explicações, feedbacks) usam a rampa de imersão:
    *   **A1:** 80% PT / 20% EN (Instruções em PT, ptHelp nos diálogos).
    *   **A2:** 50% PT / 50% EN.
    *   **B1:** 25% PT (Só dicas de armadilhas e gramática complexa).
    *   **B2:** 5% PT (Apenas em momentos de "Socorro!").
    *   **C1 e C2:** 100% EN.
*   **Tópicos da Vida Real (Crucial):** A partir do B1, o material abandona o "textbook English". A partir do B2, entram temas densos da vida adulta: **namoro e relacionamentos, discussões e brigas, entrevistas de emprego agressivas, política, humor negro/ácido, ironia e negociação de alto risco**.
*   **O Uso do Palavrão e Gíria:** Do C1 em diante, palavrões e expressões pesadas aparecem, mas com a etiqueta **"Uso e Risco"** (ex: *"Você vai ouvir isto numa discussão acalorada, mas cuidado ao usar no trabalho"*).

---

## 🏗️ PARTE 2: Estrutura Técnica e Regras de Código (v2)

Para garantir que a IA nunca quebre o JSON ou entregue capítulos rasos, todo prompt de geração de conteúdo deve seguir estas **Regras Técnicas Obrigatórias**:

1. **Saída:** Um único bloco `window.VENTU_CHAPTER = {...}`, sem comentários.
2. **Tradução (ptHelp):** Todo texto em inglês (diálogos, exemplos) DEVE ter um `ptHelp` correspondente (tradução natural, não literal).
3. **Brasileirização:** Sílaba tônica em MAIÚSCULAS e hífen entre sílabas. Ex: *thirteen* → `THÖR-tiin`; *thirty* → `THÖR-ri`. (Nota: o "r" caipira, o "h" aspirado e o "th" entre os dentes devem ser explicados).
4. **Limites de Tamanho:** Nenhum diálogo passa de 8 falas. Nenhuma fala passa de 12 palavras (no A1/A2).
5. **Reciclagem (Spaced Repetition):** Cada capítulo deve reusar 5 a 8 palavras dos capítulos anteriores. Elas devem ser marcadas como `"recycled": true` no JSON.
6. **Eficiência de Tempo (20 min):** O capítulo deve ser dividido em blocos cronometrados (Warm-up 2' · Input 4' · Vocab 3' · Gramática 4' · Pronúncia 2' · Atividades 3' · Roleplay 2').
7. **Lore Hook:** Todo capítulo tem uma "isca" para o próximo, conectando o jogador ao universo do jogo (O Burger Palace, O Porto Hotel, O Reality Show).
8. **Checkpoint (Cap. 10):** Boss Level com `bossHook`. O roleplay é a prova final do nível.

### O Novo Esquema JSON (`window.VENTU_CHAPTER`)

```javascript
window.VENTU_CHAPTER = {
  "meta": { "level":"A1", "volume":1, "chapter":1, "title":"", "canDo":["",""], "estimatedMinutes":20, "xp":100, "characters":["Emma","Lucas"], "loreHook":"" },
  "warmup": { 
    "recall":[{"q":"","a":""}], // 3 perguntas do capítulo anterior
    "hook":"", "ptHelp":"" 
  },
  "input": { 
    "scene":"", "tone":"", 
    "lines":[ {"speaker":"","en":"","ptHelp":"","register":"casual|neutral|formal"} ],
    "listeningMission":"" // ex: "Anote o preço final do café"
  },
  "vocab": [ {"en":"","ipa":"","br":"","ptHelp":"","register":"","example":"","recycled":false} ],
  "grammar": { "rule":"", "pattern":"", "traps":[{"wrong":"","right":"","why":""}] },
  "pronunciation": { "focus":"", "mouthTip":"", "minimalPairs":[["",""]] },
  "activities": [ {"type":"fill|order|match|listen|speak","prompt":"","items":[],"answerKey":[],"feedbackPt":""} ],
  "roleplay": { 
    "setup":"", "npcPersona":"", 
    "complications":["",""], // O que dá errado (ex: o quarto está sujo)
    "successCriteria":["",""], 
    "starterPrompt":"" 
  },
  "culturalPass": { "work":"", "type":"film|series|song|youtube", "year":"", "whyA1":"", "listeningMission":"" },
  "bossHook": "" // Apenas para capítulos 10
}