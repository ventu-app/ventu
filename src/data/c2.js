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
          quickReplies: [ { label: 'Aguardar o resultado.', text: "Wait for the result." } ],
          intents: [ { match: /(wait|result|\.\.\.)/i, response: "The lights flash. The music swells. You brace yourself for the announcement.", nextScene: 'noah_end_good' } ],
          fallback: "The moment of truth.",
          offensiveScene: 'noah_bad_2'
        },
        noah_15_chloe: {
          npcName: 'Narrador',
          bg: 'firepit',
          npcText: "The final results are in. The public has voted. Bree opens the envelope, looking terrified. 'The winners of Cove of Secrets are...'",
          quickReplies: [ { label: 'Aguardar o resultado.', text: "Wait for the result." } ],
          intents: [ { match: /(wait|result|\.\.\.)/i, response: "Chloe squeezes your hand so hard it hurts. The lights flash.", nextScene: 'noah_end_chaos' } ],
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
      charId: 'sienna',
      name: 'Sienna',
      role: 'The Villain',
      emoji: '💅',
      description: "You are the villa's resident bombshell. You know exactly how this game is played, and you're here to win. But when a new bad boy arrives who sees right through your ice-cold facade, will you stick to the safe bet, or risk it all for real chemistry?",
      initialState: { money: 100.00, trust: 100, rizz: 50, energy: 100 },
      startScene: 'sienna_1',
      scenes: {
        sienna_1: {
          npcName: 'Dylan (Your Partner)',
          bg: 'bedroom',
          npcText: `Morning, gorgeous. I made you a coffee. Just the way you like it. And I saved you the good sunnies.\n\n*He smiles, so eager to please.*\n\n"What's the plan today? Grafting in the sun?"`,
          glossary: [
            { word: 'Grafting', meaning: 'Trabalhar duro (no sentido de flertar/conquistar alguém no reality)' },
            { word: 'Safe bet', meaning: 'Aposta segura (alguém confiável, mas talvez sem graça)' },
            { word: 'Golden retriever energy', meaning: 'Energia de cachorrinho (carinhoso, leal, mas previsível)' }
          ],
          quickReplies: [
            { label: 'Agradecer com charme.', text: "Thanks, babe. You're too good to me. Let's just chill by the pool." },
            { label: 'Ser sincera sobre o tédio.', text: "Honestly, Dylan? I'm bored out of my mind. Same thing every day." },
            { label: 'Planejar o jogo.', text: "We need to talk about our strategy. We have to stay on top." }
          ],
          intents: [
            { match: /(thanks|chill|pool|charme)/i, response: `Dylan beams. 'Anything for you.' He kisses your forehead.\n\nIt's sweet. It's safe. It's... incredibly predictable.\n\nYou look over his shoulder and see Bree, the producer, waving at you. 'Sienna! Confessional time.'\n\nTime to put on the show.`, nextScene: 'sienna_2', fx: { energy: -5, trust: 5 } },
            { match: /(bored|same thing|sincera)/i, response: `Dylan's face falls. 'Oh. Right. Well... we could go for a swim? Or...' He trails off.\n\nYou feel a tiny pang of guilt. But before you can apologize, the speakers crackle: 'ISLANDERS. A new bombshell is arriving. And he's a ripper.'\n\nDylan swallows hard. You just smile.`, nextScene: 'sienna_2', fx: { energy: -5, trust: -10 } },
            { match: /(strategy|top|game|planejar)/i, response: `Dylan nods seriously. 'Exactly. We're the strongest couple here. Noah and Ruby are a mess, and the others are irrelevant.'\n\nHe looks at you with pure trust. 'We're gonna win this.' You smile. 'Yes, we are.'\n\nBut the speakers crackle before you can say anything else: 'ISLANDERS. A new bombshell is arriving.'`, nextScene: 'sienna_2', fx: { energy: -5, rizz: 5 } }
          ],
          fallback: "Dylan is waiting for your answer, looking like a lost puppy.",
          offensiveScene: 'sienna_bad_1'
        },
        sienna_2: {
          npcName: 'Narrador',
          bg: 'terrace',
          npcText: "The door opens and he walks in. Unlike the other guys, he doesn't try to be charming. He's got dark hair, a sleeve of tattoos, and a leather jacket in the middle of a heatwave. Zane. He looks around the villa, completely unfazed, until his eyes lock on you. He smirks. 'Alright. I'm taking her for a chat.'",
          glossary: [
            { word: 'Unfazed', meaning: 'Não abalado / Indiferente' },
            { word: 'Ripper', meaning: 'Alguém ou algo incrível / fantástico' },
            { word: 'Lock on', meaning: 'Travar o olhar em alguém' }
          ],
          quickReplies: [
            { label: 'Aceitar o desafio.', text: "Lead the way, Zane. Let's see if you're as interesting as you think you are." },
            { label: 'Olhar para o Dylan.', text: "Dylan? Are you going to say something?" },
            { label: 'Ficar fria.', text: "I'm busy right now. Maybe later." }
          ],
          intents: [
            { match: /(lead the way|challenge|aceitar)/i, response: `Zane's smirk widens. He doesn't wait for you to stand up. He just turns and walks to the daybeds.\n\nYou follow. You can feel Dylan's eyes burning into your back, and the rest of the villa whispering.\n\nWhen you sit down, Zane leans in. 'So. You're the villain everyone's talking about.'`, nextScene: 'sienna_3', fx: { energy: -10, rizz: 10 } },
            { match: /(dylan|say something|olhar)/i, response: `Dylan steps forward. 'Mate, we were in the middle of a conversation.'\n\nZane doesn't even look at him. He just keeps staring at you. 'She can speak for herself, can't she?'\n\nDylan looks at you, desperate for backup. You just shrug. 'We'll talk later, Dylan.' You walk off with Zane.`, nextScene: 'sienna_3', fx: { energy: -10, trust: -5 } },
            { match: /(busy|later|fria)/i, response: `Zane laughs. It's a low, raspy sound. 'Busy. Right.'\n\nHe walks over, takes your hand, and pulls you up gently but firmly. 'I'll bring her back in one piece. Promise.'\n\nHe leads you away. And you let him. You hate that you let him.`, nextScene: 'sienna_3', fx: { energy: -10, trust: 5 } }
          ],
          fallback: "Zane is waiting. The whole villa is holding its breath.",
          offensiveScene: 'sienna_bad_1'
        },
        sienna_3: {
          npcName: 'Zane (The Bombshell)',
          bg: 'terrace',
          npcText: `You've got them all fooled, don't you? They think you're just the pretty villain. But I see you, Sienna. You're not playing the game. You're running from something.`,
          glossary: [
            { word: 'Fooled', meaning: 'Enganados / Feitos de trouxa' },
            { word: 'Running from', meaning: 'Fugindo de algo' },
            { word: 'Showmance', meaning: 'Romance de fachada (jargão de reality)' }
          ],
          quickReplies: [
            { label: 'Atacar de volta.', text: "And you're just another wannabe bad boy trying to get screen time. Am I wrong?" },
            { label: 'Ser vulnerável (raro).', text: "Maybe I am. Maybe being the villain is easier than getting hurt." },
            { label: 'Rejeitar a psicanálise.', text: "You don't know me. Don't pretend you do." }
          ],
          intents: [
            { match: /(wannabe|screen time|attack|wrong)/i, response: `Zane smiles, and this time it actually reaches his eyes. 'There she is. The real Sienna.'\n\nHe leans closer. 'I like this one better.' He stands up. 'We should do this again.'\n\nHe walks away without looking back. And you realize you're breathing a little harder.`, nextScene: 'sienna_4', fx: { energy: -15, rizz: 10 } },
            { match: /(vulnerable|hurt|easier)/i, response: `Zane doesn't laugh. He doesn't smirk. He just looks at you. 'I get it. Trust me, I get it.'\n\nHe reaches out and puts his hand over yours. 'But the best things in life aren't safe, Sienna.'\n\nHe squeezes your hand once, then stands up and walks away. You're left staring at your hand.`, nextScene: 'sienna_4', fx: { energy: -15, trust: 10 } },
            { match: /(don't know|pretend|rejeitar)/i, response: `Zane nods. 'Fair enough. But for the record? I'm not the one pretending.'\n\nHe stands up. 'Oh, and Sienna? The showmance with Dylan? It's boring the audience. And it's boring you.'\n\nHe walks away. You want to throw a drink at him. You also want him to come back.`, nextScene: 'sienna_4', fx: { energy: -15, trust: -10 } }
          ],
          fallback: "Zane is staring at you. He's not blinking.",
          offensiveScene: 'sienna_bad_1'
        },
        sienna_4: {
          npcName: 'Bree (Producer, Off-Camera)',
          bg: 'firepit',
          npcText: "Alright, Islanders! Time for the Heart Rate Challenge. The boys are going to dance for you. Sienna, we're starting with you. Zane is up first. Then Dylan. Let's see who makes your heart race.",
          glossary: [
            { word: 'Heart Rate Challenge', meaning: 'Desafio de dança sensual para ver quem acelera o coração' },
            { word: 'Race', meaning: 'Corrida (aqui, "quem faz o coração bater mais rápido")' }
          ],
          quickReplies: [
            { label: 'Focar no Zane.', text: "Focus on Zane." },
            { label: 'Focar no Dylan (Lealdade).', text: "Focus on Dylan." },
            { label: 'Jogar o jogo.', text: "Play the game." }
          ],
          intents: [
            { match: /(zane)/i, response: `Zane doesn't dance. He just walks over, pulls you up, and whispers in your ear. 'You're the only one I see.'\n\nHis breath is hot against your neck. The monitor goes crazy, hitting 180 BPM.\n\nDylan is next. He does a funny, choreographed dance with a fake rose. It's cute. The monitor barely moves.\n\nEveryone knows who won.`, nextScene: 'sienna_5', fx: { energy: -20, rizz: 15 } },
            { match: /(dylan)/i, response: `When Dylan dances, he looks at you with pure love. He's trying so hard. Your heart monitor goes up.\n\nBut then Zane takes the stage. He locks eyes with you, takes his shirt off slowly, and smirks.\n\nThe monitor spikes to 170. Dylan's face falls. The chemistry is undeniable.`, nextScene: 'sienna_5', fx: { energy: -20, trust: 10 } },
            { match: /(game)/i, response: `You barely look at either of them. You just sit there, cold and calculating.\n\nWhen Zane dances, you smile. When Dylan dances, you clap. Both monitors go up.\n\nBut nobody can tell who made your heart race more. The audience is going wild.`, nextScene: 'sienna_5', fx: { energy: -20, trust: -5 } }
          ],
          fallback: "The music starts. Time to see who makes your heart race.",
          offensiveScene: 'sienna_bad_2'
        },
        sienna_5: {
          npcName: 'Narrador',
          bg: 'firepit',
          npcText: "It's the Recoupling. The fire pit is lit. The boys are standing in a line. Dylan is sweating, holding a speech. Zane is leaning against a pillar, looking completely bored. Bree looks at you. 'Sienna, it's your turn.'",
          glossary: [
            { word: 'Recoupling', meaning: 'Cerimônia de escolha de casal' },
            { word: 'Sweating', meaning: 'Suando / Nervoso' },
            { word: 'Speech', meaning: 'Discurso' }
          ],
          quickReplies: [
            { label: 'Escolher Dylan.', text: "I'm choosing Dylan. He's my rock. I need safe." },
            { label: 'Escolher Zane.', text: "I'm choosing Zane. I want to see what happens when I'm not being safe." },
            { label: 'Fazer um discurso confuso.', text: "I... I don't know. I like you both. Can I flip a coin?" }
          ],
          intents: [
            { match: /(choosing dylan|rock)/i, response: `Dylan exhales, almost crying with relief. He runs over and hugs you.\n\nBut Zane just watches. He doesn't look hurt. He looks disappointed.\n\n'You're making a mistake, Sienna,' he says loud enough for everyone to hear. 'But I'll wait.'`, nextScene: 'sienna_6', fx: { energy: -25, trust: 15 } },
            { match: /(choosing zane|not being safe)/i, response: `The villa gasps. Dylan looks like you slapped him. Zane's face lights up.\n\nHe walks over, cups your face, and kisses you right there in front of everyone.\n\nIt's a hard, hungry kiss that sends a shockwave through the villa. 'You just made this interesting,' he whispers.`, nextScene: 'sienna_6', fx: { energy: -25, rizz: 10, trust: -15 } },
            { match: /(don't know|coin|confuso|flip)/i, response: `The villa goes silent. Dylan looks mortified. Zane just smirks.\n\nBree raises an eyebrow. 'You have to choose, Sienna.'\n\nYou look at them both. You're playing the game, but you've backed yourself into a corner. The audience is ripping you apart.`, nextScene: 'sienna_6', fx: { energy: -25, trust: -10 } }
          ],
          fallback: "The fire crackles. Who do you choose?",
          offensiveScene: 'sienna_bad_2'
        },
        sienna_6: {
          npcName: 'Dylan (Your Partner)',
          bg: 'terrace',
          npcText: `Sienna. I just want to be enough for you. Why am I not enough? What does he have that I don't? He's looking at you with such pain in his eyes.`,
          glossary: [
            { word: 'Enough', meaning: 'Suficiente' },
            { word: 'Pain', meaning: 'Dor / Tristeza' }
          ],
          quickReplies: [
            { label: 'Ser honesta e cruel.', text: "He has a pulse, Dylan. You're too nice. It's suffocating." },
            { label: 'Ser carinhosa e falsa.', text: "You are enough, Dylan. I'm just confused. I'm sorry." },
            { label: 'Ficar em silêncio.', text: "..." }
          ],
          intents: [
            { match: /(pulse|too nice|suffocating|cruel)/i, response: `Dylan steps back as if you slapped him. 'Right. Okay. I get it.'\n\nHe walks away, not crying, but clearly shattered.\n\nZane is watching from the pool. He raises his beer to you. You're officially the villain. And it feels... powerful.`, nextScene: 'sienna_7', fx: { energy: -15, trust: -15 } },
            { match: /(enough|confused|sorry|falsa)/i, response: `Dylan nods, tears in his eyes. 'Thank you.' He hugs you. You feel like a complete monster.\n\nZane is watching from the pool. He doesn't raise his beer. He just stares, waiting to see what you do next.`, nextScene: 'sienna_7', fx: { energy: -15, trust: 5 } },
            { match: /(\.\.\.)/i, response: `You say nothing. Dylan waits. Then he nods. 'Right.' He walks away, shoulders slumped.\n\nYou watch him go. Zane appears beside you. 'Cold,' he whispers. 'I like it.'\n\nBut even he seems a little put off.`, nextScene: 'sienna_7', fx: { energy: -15, trust: -5 } }
          ],
          fallback: "Dylan is waiting for an answer that will make him feel better.",
          offensiveScene: 'sienna_bad_1'
        },
        sienna_7: {
          npcName: 'Bree (Producer, Off-Camera)',
          bg: 'firepit',
          npcText: "Gather round, Islanders! Movie Night! We're going to show you exactly what you've been saying behind each other's backs. Roll the tape!",
          glossary: [
            { word: 'Roll the tape', meaning: 'Rodar a fita / Passar o vídeo' },
            { word: 'Movie Night', meaning: 'Noite de cinema do reality (onde os segredos são expostos)' }
          ],
          quickReplies: [
            { label: 'Preparar para o caos.', text: "Prepare for chaos." },
            { label: 'Fingir calma.', text: "Pretend to be calm." },
            { label: 'Olhar para o Zane.', text: "Look at Zane." }
          ],
          intents: [
            { match: /(chaos)/i, response: `The screen lights up. It's you in the confessional, talking to Bree. 'Dylan is a safe bet. But Zane... Zane makes me want to risk it all. I don't know if I can stay faithful.'\n\nThe villa erupts. Dylan stands up, furious. Zane just smiles.`, nextScene: 'sienna_8', fx: { energy: -20, trust: -10 } },
            { match: /(calm)/i, response: `The screen lights up. First is Zane's confessional: 'Sienna's a challenge. But I don't lose.'\n\nThen, your confessional plays. You admit that Dylan is just a game piece. Dylan is devastated.\n\nThe villa is in chaos. You've been caught out.`, nextScene: 'sienna_8', fx: { energy: -20, trust: -15 } },
            { match: /(zane)/i, response: `The screen lights up. It's not you first. It's Kai. 'Noah's a mug.' Everyone gasps.\n\nBut then, the tape switches to you. 'Dylan is boring. Zane is dangerous.'\n\nDylan stands up and walks inside. The damage is done.`, nextScene: 'sienna_8', fx: { energy: -20, trust: -5 } }
          ],
          fallback: "The screen is about to play your biggest secrets.",
          offensiveScene: 'sienna_bad_2'
        },
        sienna_8: {
          npcName: 'Zane (The Bombshell)',
          bg: 'terrace',
          npcText: `Well. Looks like the cat's out of the bag.\n\n*He laughs.*\n\n"So, what's the play now, Sienna? Are you going to run after the puppy and beg for forgiveness? Or are you going to be the villain everyone thinks you are?"`,
          glossary: [
            { word: 'Cat\'s out of the bag', meaning: 'O segredo foi revelado' },
            { word: 'Play', meaning: 'Jogada / Estratégia' },
            { word: 'Puppy', meaning: 'Cachorrinho (aqui se referindo ao Dylan)' }
          ],
          quickReplies: [
            { label: 'Assumir a vilania.', text: "I'm done playing nice. Let's be the villains together, Zane." },
            { label: 'Correr atrás do Dylan.', text: "I need to fix this with Dylan. I'm sorry, Zane." },
            { label: 'Sair sozinha.', text: "I'm done with both of you. I'm playing for myself." }
          ],
          intents: [
            { match: /(villains|done playing)/i, response: `Zane grabs your waist and pulls you in. 'Now we're talking.'\n\nThe villa watches in shock as you kiss him deeply.\n\nDylan walks out with his suitcase, leaving the show. You're the ultimate villain now. And you're going to win.`, nextScene: 'sienna_9', fx: { energy: -25, rizz: 15, trust: -15 } },
            { match: /(fix this|sorry)/i, response: `Zane steps back, surprised. 'Really? The puppy?' He shakes his head. 'You're making a mistake.'\n\nBut you run inside. You find Dylan packing.\n\nYou have to convince him to stay. Or maybe you just want to salvage your image.`, nextScene: 'sienna_9', fx: { energy: -25, trust: 15 } },
            { match: /(both of you|myself|alone)/i, response: `Zane laughs, but it's hollow. 'Playing alone? Good luck with that.' He walks away.\n\nYou are left standing alone in the middle of the villa. The cameras are all on you.\n\nIt's the most vulnerable you've ever been.`, nextScene: 'sienna_9', fx: { energy: -25, trust: 0 } }
          ],
          fallback: "Zane is waiting. He's got his hand out. What do you do?",
          offensiveScene: 'sienna_bad_2'
        },
        sienna_9: {
          npcName: 'Bree (Producer, Off-Camera)',
          bg: 'firepit',
          npcText: "Alright, Islanders. It's the FINAL RECOUPLING. Sienna, it's your turn. Make your speech.",
          glossary: [
            { word: 'Final Recoupling', meaning: 'A última cerimônia de escolha' },
            { word: 'Speech', meaning: 'Discurso de declaração' }
          ],
          quickReplies: [
            { label: 'Ficar com o Zane.', text: "I choose Zane. We're the villains, and we're winning this." },
            { label: 'Ficar com o Dylan.', text: "I choose Dylan. I'm sorry for everything. I want to be better." },
            { label: 'Sair do programa.', text: "I choose myself. I'm leaving." }
          ],
          intents: [
            { match: /(zane|villains|winning|escolher zane)/i, response: `Zane walks over and takes your hand. 'Told you,' he whispers. 'Best things aren't safe.'\n\nThe audience is divided. Some hate you, some love you. But you're in the final.`, nextScene: 'sienna_10_zane', fx: { energy: -30, rizz: 10 } },
            { match: /(dylan|sorry|better|escolher dylan)/i, response: `Dylan hesitates, then walks over and hugs you. 'We can fix this. We can be good.'\n\nZane just shakes his head and walks away. You've chosen the redemption arc. The audience is eating it up.`, nextScene: 'sienna_10_dylan', fx: { energy: -30, trust: 20 } },
            { match: /(myself|leaving|sair|sozinha)/i, response: `You step back. 'I choose myself. I'm done.'\n\nYou drop your microphone. The villa gasps. Bree screams at the cameramen.\n\nYou walk out of the villa and into the night.`, nextScene: 'sienna_end_chaos', fx: { energy: -30 } }
          ],
          fallback: "The fire pit is silent. Who do you choose?",
          offensiveScene: 'sienna_bad_2'
        },
        sienna_10_zane: {
          npcName: 'Narrador',
          bg: 'firepit',
          npcText: "The final results are in. The public has voted. You stand in front of Bree. The tension is palpable. Bree opens the envelope, looking furious that the villains made it this far. 'The winners of Cove of Secrets are...'",
          quickReplies: [ { label: 'Aguardar o resultado.', text: "Wait for the result." } ],
          intents: [ { match: /(wait|result|\.\.\.)/i, response: "The lights flash. The music swells. You brace yourself.", nextScene: 'sienna_end_good' } ],
          fallback: "The moment of truth.",
          offensiveScene: 'sienna_bad_2'
        },
        sienna_10_dylan: {
          npcName: 'Narrador',
          bg: 'firepit',
          npcText: "The final results are in. The public has voted. You stand in front of Bree. The tension is palpable. Bree opens the envelope. 'The winners of Cove of Secrets are...'",
          quickReplies: [ { label: 'Aguardar o resultado.', text: "Wait for the result." } ],
          intents: [ { match: /(wait|result|\.\.\.)/i, response: "Dylan squeezes your hand so hard it hurts. He's crying. The lights flash.", nextScene: 'sienna_end_dylan' } ],
          fallback: "The moment of truth.",
          offensiveScene: 'sienna_bad_2'
        },
        sienna_end_good: {
          npcName: 'Narrador',
          bg: 'firepit',
          npcText: "Bree smiles through gritted teeth. 'The winners are Sienna and Zane!' The villa explodes. Zane lifts you up and kisses you. You won. You were the villain, you played the game, and you got exactly what you wanted. The audience loves to hate you, and you love every second of it. (Final Bom)",
          isEnd: true, endingType: 'bom'
        },
        sienna_end_dylan: {
          npcName: 'Narrador',
          bg: 'firepit',
          npcText: "Bree forces a smile. 'The winners are Sienna and Dylan!' Dylan picks you up, crying happy tears. You might not have won as the ruthless villain, but you won as the girl who chose the good guy. The audience loves a redemption arc. (Final Bom - Redenção)",
          isEnd: true, endingType: 'bom'
        },
        sienna_end_chaos: {
          npcName: 'Narrador',
          bg: 'firepit',
          npcText: "You walked out of the villa. The producers tried to stop you, but you were done. You exposed the fake nature of the show. The public might hate you, but you're free. And honestly? That's better than any prize money. (Final de Caos)",
          isEnd: true, endingType: 'bom'
        },
        sienna_bad_1: {
          npcName: 'Bree (Producer)',
          bg: 'confess',
          npcText: "Sienna, you've become irrelevant. The audience finds you boring. The producers have decided to cut your screen time. You're out. Leave. (Final Ruim)",
          isEnd: true, endingType: 'ruim'
        },
        sienna_bad_2: {
          npcName: 'Narrador',
          bg: 'terrace',
          npcText: "You played both of them, and it backfired. Both Dylan and Zane dumped you in the final. You left the villa alone, humiliated, and without the prize money. The audience is laughing. The villain has been defeated. (Final Ruim)",
          isEnd: true, endingType: 'ruim'
        }
      }
    }
  }
};
window.currentGameDataC2 = gameDataC2;