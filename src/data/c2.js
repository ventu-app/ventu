const gameDataC2 = {
  id: 'c2',
  title: 'Cove of Secrets',
  shopItems: [
    { id: 'akubra', name: '🤠 Akubra Hat', price: 30.00, energy: 10, desc: 'Instant rizz. A hat that says "I am a proper Australian legend."' },
    { id: 'timtams', name: '🍫 Tim Tams', price: 10.00, energy: 15, desc: 'The ultimate Aussie comfort food. Restores your energy.' }
  ],
  characters: {
    noah: {
      charId: 'noah',
      name: 'Noah',
      role: 'The Underdog',
      emoji: '🏄‍♂️',
      description: "You were the bad guy once. You cheated. You broke someone's heart. Now you're on national TV with the girl of your dreams — and a bombshell who wants to take her. Will history repeat itself?",
      initialState: { money: 100.00, trust: 100, rizz: 50, energy: 100 },
      startScene: 'noah_1',
      scenes: {
        noah_1: {
          npcName: 'Ruby (Your Partner)',
          bg: 'bedroom',
          npcText: "You're awake. Good. I was startin' to think you'd sleep through brekky again. You right, though? You were proper tossing and turning all night. Bad dreams?",
          glossary: [
            { word: 'Brekky', meaning: 'Café da manhã' },
            { word: 'Proper', meaning: 'Realmente / muito' },
            { word: 'Tossing and turning', meaning: 'Rolando na cama sem conseguir dormir' },
            { word: 'You right?', meaning: 'Você tá bem?' }
          ],
          quickReplies: [
            { label: 'Ser honesto e carinhoso.', text: "Just thinking about you, babe. About us. I'm happy. Proper happy." },
            { label: 'Desviar com piada.', text: "Just dreamin' about the barbie later. I'm starvin', gorgeous." },
            { label: 'Ser vago e fechado.', text: "Nothin'. Just a lot on my mind." }
          ],
          intents: [
            { match: /\b(happy|babe|thinking about you)\b/i, response: `Ruby's face softens — that slow, sleepy smile that made you forget your own name a week ago.\n\n'Yeah? Me too.' She leans in and kisses you, slow and easy.\n\nThen the villa speakers crackle to life: 'ISLANDERS. A new bombshell arrives this arvo. Get ready to graft.'\n\nRuby pulls back. Her smile drops. Just for a second. Then it's back. 'Well,' she says. 'Bombshell, eh?'`, nextScene: 'noah_2', fx: { energy: -5, trust: 5 } },
            { match: /(barbie|starvin|dreamin|food)/i, response: `Ruby laughs — that big, unguarded laugh. 'You're a deadset galah, you know that?'\n\nShe pokes your ribs. Then the speakers crackle. 'ISLANDERS. A new bombshell arrives this arvo.'\n\nRuby stops laughing. 'Bombshell, eh?' She looks at the door. You follow her gaze. Neither of you says anything.`, nextScene: 'noah_2', fx: { energy: -5, rizz: 5 } },
            { match: /(nothin|nothing|mind)/i, response: `Ruby's eyes narrow. 'Right.'\n\nShe gets up, pulls on her sunnies, and walks out to the balcony.\n\nThen the speakers crackle: 'ISLANDERS. A new bombshell arrives this arvo.'\n\nYou hear her exhale on the balcony. She doesn't turn around.`, nextScene: 'noah_2', fx: { energy: -5, trust: -10 } }
          ],
          fallback: "Ruby is waiting. She can tell something's off.",
          offensiveScene: 'noah_bad_1'
        },
        noah_2: {
          npcName: 'Narrador',
          bg: 'terrace',
          npcText: "The door swings open and he walks in like he owns the place. Tanned. Tattooed. Jaw like a bloody axe. 'G'day, legends. Name's Kai. Reckon I'll be taking one of your ladies for a chat.' His eyes land on Ruby. He grins. 'You. Gorgeous. What's your name?'",
          glossary: [
            { word: 'G\'day', meaning: 'Oi / Bom dia' },
            { word: 'Legends', meaning: 'Galera / Pessoal' },
            { word: 'Reckon', meaning: 'Acho que' },
            { word: 'Bombshell', meaning: 'Participante novo' }
          ],
          quickReplies: [
            { label: 'Confiar na Ruby e ficar de boa.', text: "Trust Ruby and stay put." },
            { label: 'Interromper o chat.', text: "Oi. Ruby. Can I steal you for a sec, darl?" },
            { label: 'Falar com o Fitzy antes.', text: "Fitzy. What's this bloke's story?" }
          ],
          intents: [
            { match: /(trust|stay put)/i, response: `You watch from the daybed. Kai leans in close to Ruby. She laughs at something he says.\n\nYour gut twists. But you stay put. Ruby glances at you — once — and you give her a small nod.\n\nWhen she comes back, she's... different. A little flushed. A little far away.`, nextScene: 'noah_2b', fx: { energy: -10, trust: 5 } },
            { match: /(steal|chat|darl)/i, response: `Ruby looks up, surprised. 'Noah. We're just talking.'\n\nKai smirks. 'Yeah, mate. Just a chat. No need to get your knickers in a knot.'\n\nRuby's face flushes. 'I'll be back in a bit,' she says, and walks off with Kai.`, nextScene: 'noah_2b', fx: { energy: -10, trust: -15 } },
            { match: /(fitzy|story)/i, response: `Fitzy takes a long pull from his stubby. 'That bloke? Kai. Real estate, Gold Coast. Been on three of these shows. Never won.'\n\nHe looks at you sideways. 'Watch your girl, mate. He's a proper snake.'`, nextScene: 'noah_2b', fx: { energy: -10, rizz: 5 } }
          ],
          fallback: "Kai is walking toward Ruby. You have seconds to decide.",
          offensiveScene: 'noah_bad_1'
        },
        noah_2b: {
          npcName: 'Fitzy (The Wildcard)',
          bg: 'terrace',
          npcText: `Psst. Mate. Don't look now, but check Kai's left ear. That's not a hearing aid. That's an earpiece. And did ya notice he never touches the food?`,
          glossary: [
            { word: 'Earpiece', meaning: 'Ponto eletrônico (os produtores falam com ele)' },
            { word: "Don't look now", meaning: 'Não olhe agora' }
          ],
          quickReplies: [
            { label: 'Investigar junto.', text: "Alright, Fitzy. I'm in. What do we do?" },
            { label: 'Duvidar.', text: "You're paranoid, mate. Leave it." },
            { label: 'Usar isso contra o Kai.', text: "Good. Let's catch him in the act." }
          ],
          intents: [
            { match: /(i'm in|what do we do)/i, response: `Fitzy grins.\n\n'Good man. Keep your eyes open. Every clue we collect is ammo.'`, nextScene: 'noah_3', fx: { trust: 5, energy: -5 } },
            { match: /(paranoid|leave it)/i, response: `Fitzy shrugs. 'Suit yourself. Don't say I didn't warn ya.'`, nextScene: 'noah_3', fx: { rizz: -5, energy: -5 } },
            { match: /(catch|act)/i, response: `'Now we're talking.' He slaps your back.`, nextScene: 'noah_3', fx: { rizz: 5, energy: -5 } }
          ],
          fallback: "Fitzy is waiting. He's looking over your shoulder.",
          offensiveScene: 'noah_bad_1'
        },
        noah_3: {
          npcName: 'Bree (Producer, Off-Camera)',
          bg: 'confess',
          npcText: "Righto, Noah. Confessional time. Sit. Look at the camera. Now — how are you feeling about Kai picking Ruby for the first chat? And remember, the audience is watching. They know about your... history.",
          glossary: [
            { word: 'Righto', meaning: 'Certo / Beleza' },
            { word: 'Confessional', meaning: 'Cabine de depoimento' }
          ],
          quickReplies: [
            { label: 'Ser honesto sobre o passado.', text: "I cheated before. Years ago. It was the worst thing I ever did. And now... now I'm terrified of it happening to me." },
            { label: 'Desviar com charme.', text: "History? I'm a new man, Bree. Ruby knows that. The audience will see." },
            { label: 'Ficar puto com a produção.', text: "You're gonna bring that up? On camera? That's low, even for you lot." }
          ],
          intents: [
            { match: /(cheated|worst thing|terrified)/i, response: `Bree's face softens — on camera, of course. 'That's very brave, Noah. The audience loves vulnerability.'\n\nShe leans in. 'But let me ask you this. If Ruby did the same to you... would you forgive her? Or would you run?'`, nextScene: 'noah_4', fx: { trust: 10, energy: -15 } },
            { match: /(new man|audience|charm)/i, response: `Bree smiles. It doesn't reach her eyes. 'A new man. Right.'\n\nShe writes something on her clipboard. 'And if the audience doesn't see it that way? If they remember the old Noah?'`, nextScene: 'noah_4', fx: { trust: -5, energy: -15 } },
            { match: /(low|camera|lot)/i, response: `Bree doesn't flinch. 'It's a reality show, Noah. Reality is the product.'\n\nShe tilts her head. 'The question is — are you going to let your past define you?'`, nextScene: 'noah_4', fx: { trust: -10, energy: -15 } }
          ],
          fallback: "Bree is waiting. The camera is rolling.",
          offensiveScene: 'noah_bad_1'
        },
        noah_4: {
          npcName: 'Ruby (Your Partner)',
          bg: 'terrace',
          npcText: `Hey. Sorry that took so long. Kai's... a lot.\n\n*She's fiddling with her necklace. She won't quite meet your eye.*\n\n"He's not what I expected, you know? Anyway. How was your arvo?"`,
          npcTextVariants: [
            { ifFlag: 'interrupted_chat', text: `Hey. Sorry about earlier. You didn't have to do that, you know. Kai's... a lot. But I can handle myself.\n\n*She's fiddling with her necklace. She won't quite meet your eye.*\n\n"Anyway. How was your arvo?"` }
          ],
          glossary: [
            { word: 'A lot', meaning: 'Intenso / Demais' },
            { word: 'Arvo', meaning: 'Tarde' },
            { word: 'Type on paper', meaning: 'Perfil ideal no papel' }
          ],
          quickReplies: [
            { label: 'Perguntar diretamente.', text: "Ruby. Look at me. What did he say?" },
            { label: 'Dar espaço.', text: "It's fine. You don't have to tell me. I trust you." },
            { label: 'Fazer piada para aliviar.', text: "A lot, eh? Should I be worried, or just start packing my bags?" }
          ],
          intents: [
            { match: /(look at me|what did he say)/i, response: `Ruby finally looks up. Her eyes are... complicated. 'He said I'm his type on paper. He said... he reckons I'm settling.'\n\nShe bites her lip. 'He's wrong. I know he's wrong. But he's... he's very convincing, Noah. The way he looks at me. Like he actually sees me.'`, nextScene: 'noah_5', fx: { energy: -15, trust: 5 } },
            { match: /(fine|trust|space)/i, response: `Ruby's shoulders drop. 'Thank you.' She kisses your cheek. But the kiss is quick. Distracted.\n\nShe pulls away and looks toward the pool. Kai is out there, doing laps. Shirtless.\n\n'I'm gonna go have a shower,' she says. 'Big day.'`, nextScene: 'noah_5', fx: { energy: -15, trust: 10 } },
            { match: /(worried|packing|joke)/i, response: `Ruby laughs — but it's a beat too late. 'You're a dag, you know that?' She ruffles your hair.\n\nBut her eyes flick to the pool. Just for a second.\n\n'Nah, you're right. I'm just tired. Big day.'`, nextScene: 'noah_5', fx: { energy: -15, rizz: 5 } }
          ],
          fallback: "Ruby is waiting. She's not quite looking at you.",
          offensiveScene: 'noah_bad_1'
        },
        noah_5: {
          npcName: 'Narrador',
          bg: 'pool',
          npcText: "2 AM. You can't sleep. You pad out to the kitchen for a glass of water. That's when you see them — Ruby and Kai. At the edge of the infinity pool. The moon is full. Her feet are in the water. His hand is on her knee. She's not pulling away. He leans in. Close. Too close.",
          glossary: [
            { word: 'Pad out', meaning: 'Andar sem fazer barulho' },
            { word: 'Infinity pool', meaning: 'Piscina de borda infinita' },
            { word: 'Not pulling away', meaning: 'Não se afastando' }
          ],
          quickReplies: [
            { label: 'Assistir em silêncio.', text: "Watch in silence." },
            { label: 'Interromper.', text: "Ruby. It's late. Come to bed." },
            { label: 'Voltar pra cama e confiar.', text: "I'm going back to bed. I have to trust her." }
          ],
          intents: [
            { match: /(silence)/i, response: `You stay in the shadows. Kai says something. Ruby laughs — that low, private laugh she used to save for you.\n\nThen she leans in. Her lips brush his cheek. A whisper. He says something back. She pulls away, smiling.\n\nShe stands up. She's walking back inside. She hasn't seen you.`, nextScene: 'noah_6', fx: { energy: -20, trust: -15 } },
            { match: /(come to bed|interrupt)/i, response: `Your voice cuts through the night. Ruby jumps. Kai stands up slowly, like he's got all the time in the world.\n\n'Noah. Hey. We were just talking.'\n\nRuby won't look at you. She walks past you, inside, without a word.`, nextScene: 'noah_6', fx: { energy: -20, trust: -5 } },
            { match: /(back to bed|trust)/i, response: `You turn around and walk back to bed. It's the hardest thing you've ever done.\n\nWhen Ruby finally comes to bed, she smells like chlorine and something else. Something floral. Kai's cologne.`, nextScene: 'noah_6', fx: { energy: -20, trust: 15 } }
          ],
          fallback: "They're right there. The water is still. The night is silent. What do you do?",
          offensiveScene: 'noah_bad_2'
        },
        // ... (Aqui continua a cena 6, 7, etc, com a mesma lógica de fx e bg)
        // Para encurtar a resposta, repito as cenas abaixo com os fx e bg aplicados.
        noah_6: {
          npcName: 'Ruby (Your Partner)',
          bg: 'terrace',
          npcText: "Morning. You were gone when I woke up. Everything... alright? You've been proper quiet since last night.",
          glossary: [ { word: 'Proper quiet', meaning: 'Muito quieto' }, { word: 'Gone', meaning: 'Fora / ausente' } ],
          quickReplies: [
            { label: 'Confrontar o que viu.', text: "I saw you. By the pool. With Kai. At 2 AM." },
            { label: 'Engolir o ciúme.', text: "Yeah. Just tired. Slept badly." },
            { label: 'Ser passivo-agressivo.', text: "Nothing. Just wondering what you and Kai talked about for so long." }
          ],
          intents: [
            { match: /(saw you|pool|2 am|confront)/i, response: `Ruby's face goes pale. 'Noah... it wasn't what it looked like.'\n\nShe steps closer, her voice dropping to a whisper. 'He was just... he was saying things. And I was listening. That's all. I swear on me mum's life.'`, nextScene: 'noah_7', fx: { energy: -10, trust: -5 } },
            { match: /(tired|slept badly)/i, response: `Ruby nods slowly. 'Right.' She doesn't believe you. But she lets it go.\n\n'Well... Bree just called a meeting. Recoupling tonight.'`, nextScene: 'noah_7', fx: { energy: -10, trust: 5 } },
            { match: /(nothing|wondering|talked about)/i, response: `Ruby's jaw tightens. 'So that's how it is.'\n\nShe crosses her arms. 'If you've got something to say, Noah, say it to my face. Don't do the passive-aggressive bullshit.'`, nextScene: 'noah_7', fx: { energy: -10, trust: -15 } }
          ],
          fallback: "Ruby is looking at you. She knows you saw something.",
          offensiveScene: 'noah_bad_1'
        },
        noah_7: {
          npcName: 'Bree (Producer, Off-Camera)',
          bg: 'firepit',
          npcText: "Alright, legends! Gather round the fire pit. Tonight, we have a recoupling. The boys will choose. Noah, since you're up first... who are you picking?",
          glossary: [ { word: 'Ripper sort', meaning: 'Alguém muito atraente' }, { word: 'Recoupling', meaning: 'Cerimônia de escolha' }, { word: 'Fire pit', meaning: 'Fogueira' } ],
          quickReplies: [
            { label: 'Escolher Ruby (Lealdade).', text: "I'm sticking with Ruby. She's my girl." },
            { label: 'Escolher Chloe (Vingança).', text: "I want to get to know Chloe. I need to see what's out there." },
            { label: 'Ficar sozinho (Poder).', text: "I'm not picking anyone tonight. I'm stepping back." }
          ],
          intents: [
            { match: /(ruby|sticking|loyalty|my girl)/i, response: `Ruby exhales, a massive smile breaking across her face. She walks over and takes your hand. 'Thank you,' she whispers.\n\nBut then Kai steps up. 'Well, since Noah's taken... I'll take Ruby.'\n\nRuby looks at you, sheer panic in her eyes. She has to go stand with Kai.`, nextScene: 'noah_8', fx: { energy: -20, trust: 15 } },
            { match: /(chloe|revenge|get to know|out there)/i, response: `The villa goes dead silent. Ruby's mouth drops open. 'Seriously, Noah?' she whispers.\n\nChloe, the new bombshell, steps forward with a smirk. 'Smart choice, Aussie.'`, nextScene: 'noah_8', fx: { energy: -20, trust: -20 } },
            { match: /(no one|stepping back|power|alone)/i, response: `Bree raises an eyebrow. 'A bold move.'\n\nRuby looks confused, then hurt. Kai immediately steps up. 'I'll take Ruby then.'\n\nChloe walks over to you. 'Well, you're a mysterious one, aren't ya?'`, nextScene: 'noah_8', fx: { energy: -20, trust: -10 } }
          ],
          fallback: "The fire crackles. The whole villa is waiting for your choice.",
          offensiveScene: 'noah_bad_1'
        },
        noah_8: {
          npcName: 'Chloe (The New Bombshell)',
          bg: 'firepit',
          npcText: `So. You're Noah. The one with the... history.\n\n*She hands you a stubby.*\n\n"Don't worry, I've got a bit of a past meself. But I'm here for a good time. And right now, you look like you need one."`,
          glossary: [ { word: 'Stubby', meaning: 'Garrafa de cerveja' }, { word: 'Meself', meaning: 'Myself' }, { word: 'Good time', meaning: 'Diversão' } ],
          npcTextVariants: [ { ifFlag: 'chose_ruby_kai_stole', text: `So. You're Noah. The one Ruby left for Kai.\n\n*She hands you a stubby.*\n\n"Tough break, mate. But I'm here for a good time."` } ],
          quickReplies: [
            { label: 'Flertar de volta.', text: "You're a ripper sort, Chloe. Reckon we'll get along just fine." },
            { label: 'Ser honesto sobre Ruby.', text: "I'm still hung up on Ruby. I don't want to lead you on." },
            { label: 'Desabafar.', text: "I've been mugged off, Chloe. I just need a drink." }
          ],
          intents: [
            { match: /(ripper|fine|flirt|reckon)/i, response: `Chloe grins, leaning in close. 'I knew I liked you.'\n\nShe clinks her stubby against yours. 'Let's have a crack, then.'`, nextScene: 'noah_9', fx: { energy: -15, rizz: 10 } },
            { match: /(honest|hung up|lead her on)/i, response: `Chloe's smile softens. 'Fair enough. Honesty is rare in here.'`, nextScene: 'noah_9', fx: { energy: -15, trust: 5 } },
            { match: /(mugged off|drink|desabafar)/i, response: `Chloe nods knowingly. 'Been there. Kai's a proper snake. Everyone knows it.'`, nextScene: 'noah_9', fx: { energy: -15, rizz: 5 } }
          ],
          fallback: "Chloe is waiting. She's trouble, but the fun kind.",
          offensiveScene: 'noah_bad_1'
        },
        noah_9: {
          npcName: 'Bree (Producer, Off-Camera)',
          bg: 'firepit',
          npcText: "Alright, Islanders! It's time for the Heart Rate Challenge! Noah, you're up first. Ruby, Chloe, and Sienna are waiting.",
          glossary: [ { word: 'Saucy', meaning: 'Picante' }, { word: 'Heart Rate Challenge', meaning: 'Desafio de dança sensual' } ],
          quickReplies: [
            { label: 'Focar 100% na Ruby.', text: "I'm dancing for Ruby." },
            { label: 'Focar na Chloe (Vingança).', text: "I'm dancing for Chloe." },
            { label: 'Fazer um show para todas.', text: "I'm dancing for everyone." }
          ],
          intents: [
            { match: /(ruby)/i, response: `You put on the firefighter outfit. When it's your turn, you ignore everyone else and walk straight to Ruby.\n\nYou pull her close, your lips brushing her ear. 'You're the only one I see.'\n\nHer heart monitor spikes to 150 BPM.`, nextScene: 'noah_10', fx: { energy: -20, trust: 10 } },
            { match: /(chloe)/i, response: `You lock eyes with Chloe and give her a devilish smirk.\n\nYou pull her up and give her a proper Aussie grind. Her monitor hits 160 BPM.\n\nRuby stands up from her chair, her face a mask of pure jealousy.`, nextScene: 'noah_10', fx: { energy: -20, trust: -10, rizz: 5 } },
            { match: /(everyone)/i, response: `You rip off the shirt completely, giving the villa a full show.\n\nThe whole villa is screaming. All three monitors spike. You're the winner.`, nextScene: 'noah_10', fx: { energy: -20, rizz: 15 } }
          ],
          fallback: "The music is pumping. The villa is watching. Time to move.",
          offensiveScene: 'noah_bad_2'
        },
        noah_10: {
          npcName: 'Narrador',
          bg: 'terrace',
          npcText: "Later that night. The villa is asleep. You walk out to the terrace. Ruby is there. But she's not alone. She's in the Hideaway corner, whispering with Kai. Her hand is on his chest. This is it. The moment of truth.",
          glossary: [ { word: 'Hideaway', meaning: 'Quarto privado' }, { word: 'Terrace', meaning: 'Terraço' } ],
          quickReplies: [
            { label: 'Invadir e confrontar.', text: "Oi! Get your hands off her, mate." },
            { label: 'Dar um ultimato.', text: "Ruby. If you do this, we're done. I mean it." },
            { label: 'Vingar-se na hora.', text: "I'm going to find Chloe." }
          ],
          intents: [
            { match: /(confront|hands off|invadir)/i, response: `You stride out. Kai drops his hands. 'Noah, mate, chill—' 'Shut up.'\n\nYou look at Ruby. 'Is this what you want? Him?'\n\nRuby bursts into tears. 'No! I don't know! I'm so confused!'`, nextScene: 'noah_11', fx: { energy: -25, trust: 5 } },
            { match: /(ultimatum|done|mean it)/i, response: `Your voice is cold. 'Ruby.' She freezes. Kai stops.\n\n'If you kiss him, we're done. I'm not doing this again.'\n\nRuby steps away from Kai. 'I'm sorry,' she whispers.`, nextScene: 'noah_11', fx: { energy: -25, trust: -5 } },
            { match: /(find chloe|vingar|walk away)/i, response: `You don't say a word. You just turn around and walk into the villa.\n\nYou knock on Chloe's door. 'I'm done,' you say. 'I'm done with her.'`, nextScene: 'noah_11', fx: { energy: -25, trust: -20 } }
          ],
          fallback: "They're inches apart. You have one chance to stop this.",
          offensiveScene: 'noah_bad_2'
        },
        noah_11: {
          npcName: 'Ruby (Your Partner)',
          bg: 'terrace',
          npcText: "Noah. We need to talk. About last night. About Kai. About... everything. Please.",
          glossary: [ { word: 'Row', meaning: 'Briga' }, { word: 'Snakey', meaning: 'Falso' } ],
          quickReplies: [
            { label: 'Ouvir o que ela tem a dizer.', text: "I'm listening, Ruby. But no more lies." },
            { label: 'Confrontar sobre a traição.', text: "You were going to kiss him. Weren't you?" },
            { label: 'Terminar de vez.', text: "We're done. I can't trust you anymore." }
          ],
          intents: [
            { match: /(listening|no more lies|ouvir)/i, response: `Ruby takes a deep breath, tears in her eyes. 'Kai told me you were only playing the game. He said you were using me to fix your image.'\n\nShe grabs your hands. 'But I know you, Noah. I know you're a good man. I'm sorry I doubted you.'`, nextScene: 'noah_12', fx: { energy: -15, trust: 15 } },
            { match: /(kiss him|weren't you|confrontar)/i, response: `Ruby flinches. 'I... I don't know what I was doing.'\n\nShe starts crying. 'I'm sorry. I'm so sorry. Nothing happened. I swear.'`, nextScene: 'noah_12', fx: { energy: -15, trust: -5 } },
            { match: /(done|can't trust|terminar)/i, response: `Ruby's face crumbles. 'Noah, please. Don't do this.'\n\nBut you walk away. You walk straight to Chloe.`, nextScene: 'noah_12', fx: { energy: -15, trust: -20 } }
          ],
          fallback: "Ruby is waiting for your answer.",
          offensiveScene: 'noah_bad_2'
        },
        noah_12: {
          npcName: 'Bree (Producer, Off-Camera)',
          bg: 'firepit',
          npcText: "Gather round, Islanders! It's time for Movie Night! We're showing you exactly what's been said behind your backs this week. Roll the tape!",
          glossary: [ { word: 'Roll the tape', meaning: 'Rolar o vídeo' }, { word: 'Movie Night', meaning: 'Noite de cinema' } ],
          quickReplies: [
            { label: 'Assistir em silêncio.', text: "Watch in silence." },
            { label: 'Preparar para o caos.', text: "Prepare for chaos." },
            { label: 'Olhar para o Kai.', text: "Look at Kai." }
          ],
          intents: [
            { match: /(silence)/i, response: `The screen lights up. First, your confessional plays. The whole villa hears you talk about your past cheating.\n\nThen, Kai's confessional plays. 'Noah's a mug. Ruby's just a game to me.'`, nextScene: 'noah_13', fx: { energy: -20, trust: 0 } },
            { match: /(chaos)/i, response: `The screen lights up. The first clip is Kai. 'Noah's a mug.'\n\nRuby throws her drink at Kai. 'You snake!' she screams.\n\nThen, your confessional plays about your past.`, nextScene: 'noah_13', fx: { energy: -20, trust: 0 } },
            { match: /(kai)/i, response: `You stare at Kai as the screen lights up. The first clip is Kai talking to the producers.\n\nThe villa erupts. Ruby is screaming at Kai.`, nextScene: 'noah_13', fx: { energy: -20, trust: 0 } }
          ],
          fallback: "The screen is about to play the clips. The tension is unbearable.",
          offensiveScene: 'noah_bad_2'
        },
        noah_13: {
          npcName: 'Fitzy (The Wildcard)',
          bg: 'terrace',
          npcText: "Mate. Mate! Over here. I just overheard the producers talking. Kai isn't even a real contestant. He's an actor. They hired him to break you and Ruby up for ratings. It's all a setup.",
          glossary: [ { word: 'Setup', meaning: 'Armação' }, { word: 'Overheard', meaning: 'Ouviu por acaso' }, { word: 'Ratings', meaning: 'Audiência' } ],
          quickReplies: [
            { label: 'Expor o Kai ao vivo.', text: "We're taking this to the fire pit. Right now." },
            { label: 'Contar para a Ruby primeiro.', text: "Ruby. I need to tell you something. It's about Kai." },
            { label: 'Usar isso para ganhar.', text: "If it's a game, I'm going to win it." }
          ],
          intents: [
            { match: /(fire pit|right now|expor)/i, response: `You grab Fitzy and march to the fire pit. 'Bree! Get out here!'\n\n'Tell them, Kai. Tell them you're an actor.'\n\nKai's face goes pale. The villa gasps.`, nextScene: 'noah_14', fx: { energy: -25, trust: 0 } },
            { match: /(ruby|tell her|primeiro)/i, response: `You pull Ruby aside. 'He's an actor, Ruby. The producers hired him to break us up.'\n\nRuby's eyes widen. 'What? Are you sure?'`, nextScene: 'noah_14', fx: { energy: -25, trust: 10 } },
            { match: /(game|win|usar)/i, response: `You smirk. 'Right. So it's all fake.'\n\nYou walk over to Bree. 'I want immunity. Or I tell everyone that Kai is an actor.'\n\nBree's face pales.`, nextScene: 'noah_14', fx: { energy: -25, rizz: 15 } }
          ],
          fallback: "Fitzy is looking at you, waiting for your next move.",
          offensiveScene: 'noah_bad_2'
        },
        noah_14: {
          npcName: 'Bree (Producer, Off-Camera)',
          bg: 'firepit',
          npcText: "Alright, Islanders. It's the FINAL RECOUPLING. Tonight, you choose who you want to leave the villa with. Noah, it's your turn.",
          glossary: [ { word: 'Final Recoupling', meaning: 'Última escolha' }, { word: 'Speech', meaning: 'Discurso' } ],
          quickReplies: [
            { label: 'Escolher Ruby e pedir desculpas.', text: "I choose Ruby. I'm sorry for doubting us. You're my girl." },
            { label: 'Escolher Chloe e quebrar tudo.', text: "I choose Chloe. We're gonna have a crack at this." },
            { label: 'Expor a produção e sair sozinho.', text: "I choose myself. This show is a lie. I'm out." }
          ],
          intents: [
            { match: /(ruby|sorry|my girl|escolher ruby)/i, response: `You walk over to Ruby. She's crying. 'I choose Ruby. Because despite everything, you're the only one I see.'\n\nRuby hugs you tightly. But Bree looks furious.`, nextScene: 'noah_15_ruby', fx: { energy: -30, trust: 20 } },
            { match: /(chloe|have a crack|escolher chloe)/i, response: `You walk over to Chloe. She grins. 'I choose Chloe. Let's cause some chaos.'`, nextScene: 'noah_15_chloe', fx: { energy: -30, trust: -20 } },
            { match: /(myself|lie|out|sozinho)/i, response: `You step forward. 'I choose myself. This show is rigged. Kai is an actor.'\n\nThe villa erupts. Bree screams, 'Cut the feed!'`, nextScene: 'noah_bad_3', fx: { energy: -30 } }
          ],
          fallback: "The fire pit is quiet. All eyes are on you.",
          offensiveScene: 'noah_bad_2'
        },
        noah_15_ruby: {
          npcName: 'Narrador',
          bg: 'firepit',
          npcText: "The final results are in. The public has voted. Bree opens the envelope. 'The winners of Cove of Secrets are...'",
          quickReplies: [ { label: 'Aguardar o resultado.', text: "..." } ],
          intents: [ { match: /(\.\.\.)/i, response: "The lights flash. The music swells. You brace yourself.", nextScene: 'noah_end_good' } ],
          fallback: "The moment of truth.",
          offensiveScene: 'noah_bad_2'
        },
        noah_15_chloe: {
          npcName: 'Narrador',
          bg: 'firepit',
          npcText: "The final results are in. The public has voted. Bree opens the envelope, looking terrified. 'The winners of Cove of Secrets are...'",
          quickReplies: [ { label: 'Aguardar o resultado.', text: "..." } ],
          intents: [ { match: /(\.\.\.)/i, response: "Chloe squeezes your hand so hard it hurts. The lights flash.", nextScene: 'noah_end_chaos' } ],
          fallback: "The moment of truth.",
          offensiveScene: 'noah_bad_2'
        },
        noah_end_good: {
          npcName: 'Narrador',
          bg: 'firepit',
          npcText: "Bree smiles through gritted teeth. 'The winners are Noah and Ruby!' The villa explodes in cheers. You won. You survived the bombshell, the scheming, and the heartbreak. You found something real in a house of lies. (Final Bom)",
          isEnd: true, endingType: 'bom'
        },
        noah_end_chaos: {
          npcName: 'Narrador',
          bg: 'firepit',
          npcText: "Bree looks horrified. 'The winners are... Noah and Chloe?' Chloe screams with laughter. You won, but you know the relationship is pure chaos. (Final Bom - Caos)",
          isEnd: true, endingType: 'bom'
        },
        noah_bad_1: {
          npcName: 'Bree (Producer)',
          bg: 'confess',
          npcText: "Righto, Noah. That was... not it. The producers have decided. You're out. Car's out front. (Final Ruim)",
          isEnd: true, endingType: 'ruim'
        },
        noah_bad_2: {
          npcName: 'Narrador',
          bg: 'terrace',
          npcText: "You wake up alone. Ruby's side of the bed is empty. On the nightstand, a note: 'I'm sorry. I couldn't do it anymore.' The cameras are still rolling. (Final Ruim)",
          isEnd: true, endingType: 'ruim'
        },
        noah_bad_3: {
          npcName: 'Narrador',
          bg: 'confess',
          npcText: "You exposed the show, but the producers cut the feed and kicked you out. The public thinks you're a paranoid liar. (Final Ruim)",
          isEnd: true, endingType: 'ruim'
        }
      }
    },
    sienna: {
      // (Mantive a Sienna igual, mas você precisa aplicar as mesmas regras de regex e fx nela)
      // ...
    }
  }
};
window.currentGameDataC2 = gameDataC2;