document.addEventListener('DOMContentLoaded', () => {
    
    /* -----------------------------------------------------------
       1. MENU MOBILE (Original - Mantido)
    ----------------------------------------------------------- */
    const mobileBtn = document.querySelector('button[aria-label="Abrir menu de navegação"]');
    const navMenu = document.querySelector('nav');
    const navList = navMenu ? navMenu.querySelector('ul') : null;

    if (mobileBtn && navMenu && navList) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('hidden');
            if (!navMenu.classList.contains('hidden')) {
                navMenu.classList.add('absolute', 'top-full', 'left-0', 'w-full', 'bg-gray-900', 'shadow-xl', 'z-40', 'pb-5');
                navList.classList.remove('flex-row', 'space-x-6');
                navList.classList.add('flex-col', 'space-y-4', 'items-center', 'pt-4');
            } else {
                navMenu.classList.remove('absolute', 'top-full', 'left-0', 'w-full', 'bg-gray-900', 'shadow-xl', 'z-40', 'pb-5');
                navList.classList.add('flex-row', 'space-x-6');
                navList.classList.remove('flex-col', 'space-y-4', 'items-center', 'pt-4');
            }
        });
    }

    /* -----------------------------------------------------------
       2. COPYRIGHT DATE (Original - Mantido)
    ----------------------------------------------------------- */
    const footerYear = document.querySelector('footer p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        if (!footerYear.textContent.includes(currentYear)) {
            // Lógica simples mantida
        }
    }

    /* -----------------------------------------------------------
       3. EASTER EGGS ENGINE (ATUALIZADO)
    ----------------------------------------------------------- */
    (function initEasterEggs() {

        // --- CONFIGURAÇÃO DE MÍDIA ---
        // Ajuste os nomes dos arquivos conforme sua pasta 'assets' ou 'imagens'
        const MATRIX_IMG = "imagens/matrix.jpeg";  
        const KONAMI_IMG = "imagens/ziom.jpg";   
        
        const DEFTONES_MP3 = "imagens/risk.mp3";     
        const CHESTER_MP3 = "imagens/what.mp3"; // Coloque aqui o MP3 do Linkin Park
        
        // -------------------------------------------------

        // A. Injetar HTML do Overlay (Se não existir)
        if (!document.getElementById('secret-layer')) {
            const html = `
                <div id="secret-layer">
                    <canvas id="secret-canvas"></canvas>
                    <div id="secret-modal">
                        <div id="secret-icon"></div>
                        <h2 id="secret-title" style="white-space: pre-wrap;"></h2>
                        <p id="secret-msg" style="white-space: pre-wrap; line-height: 1.6;"></p>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', html);
        }

        // B. Referências
        const layer = document.getElementById('secret-layer');
        const modal = document.getElementById('secret-modal');
        const titleEl = document.getElementById('secret-title');
        const msgEl = document.getElementById('secret-msg');
        const iconEl = document.getElementById('secret-icon');
        const canvas = document.getElementById('secret-canvas');
        
        let keyBuffer = "";
        const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
        let konamiIdx = 0;
        let clickCount = 0;
        let clickTimer = null;
        let audioPlayer = null;
        let matrixInterval = null;
        let overlayTimer = null; 

        // C. Funções de Controle
        function showOverlay(title, msg, visualContent, duration = 4000) {
            titleEl.textContent = title;
            msgEl.textContent = msg; // Usa textContent com estilo pre-wrap para quebras de linha
            iconEl.innerHTML = visualContent; 
            
            layer.classList.add('visible');
            
            if (overlayTimer) clearTimeout(overlayTimer);

            if (duration > 0) {
                overlayTimer = setTimeout(closeOverlay, duration);
            }
        }

        function closeOverlay() {
            layer.classList.remove('visible');
            if (overlayTimer) clearTimeout(overlayTimer);
            
            setTimeout(() => {
                stopMatrix();
                document.body.classList.remove('effect-glitch', 'effect-love');
                if (audioPlayer) {
                    audioPlayer.pause();
                    audioPlayer.currentTime = 0;
                }
            }, 500);
        }

        function playSound(url) {
            if (audioPlayer) { audioPlayer.pause(); }
            audioPlayer = new Audio(url);
            audioPlayer.volume = 0.5;
            audioPlayer.play().catch(e => console.log("Interação necessária"));
        }

        // Matrix Effect
        function runMatrix() {
            canvas.style.display = 'block';
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            const chars = "01"; // Binário
            const cols = canvas.width / 20;
            const drops = Array(Math.floor(cols)).fill(1);

            matrixInterval = setInterval(() => {
                ctx.fillStyle = 'rgba(0,0,0,0.05)';
                ctx.fillRect(0,0,canvas.width, canvas.height);
                ctx.fillStyle = '#0F0';
                ctx.font = '15px monospace';
                for(let i=0; i<drops.length; i++) {
                    const text = chars[Math.floor(Math.random()*chars.length)];
                    ctx.fillText(text, i*20, drops[i]*20);
                    if(drops[i]*20 > canvas.height && Math.random() > 0.975) drops[i]=0;
                    drops[i]++;
                }
            }, 50);
        }

        function stopMatrix() {
            if(matrixInterval) clearInterval(matrixInterval);
            canvas.style.display = 'none';
        }

        // D. Listeners (Teclado)
        document.addEventListener('keydown', (e) => {
            
            // ESC para sair
            if (e.key === "Escape") {
                closeOverlay();
                return;
            }

            // 1. Konami Code (Mantido)
            if (e.key === konami[konamiIdx]) {
                konamiIdx++;
                if (konamiIdx === konami.length) {
                    const imgHtml = `<img src="${KONAMI_IMG}" alt="Gamer Mode" style="max-width:150px; border-radius:10px;">`;
                    showOverlay("MODO GAMER SUPREMO", "Konami Code Ativado!", imgHtml, 300000); // 5 min
                    konamiIdx = 0;
                }
            } else {
                konamiIdx = 0;
            }

            // 2. Digitação
            if (e.key.length === 1) {
                keyBuffer += e.key.toLowerCase();
                if (keyBuffer.length > 20) keyBuffer = keyBuffer.slice(-20);

                // Monika (Mantido)
                if (keyBuffer.includes("monika")) {
                    document.body.classList.add('effect-glitch');
                    showOverlay("JUST MONIKA", "Seu sistema agora pertence a mim.", "👁️", 5000);
                    keyBuffer = "";
                }
                
                // Deftones (ATUALIZADO: 5 minutos)
                if (keyBuffer.includes("deftones")) {
                    playSound(DEFTONES_MP3); 
                    showOverlay("TOCANDO", "Deftones - Risk", "🎧", 300000); // Agora 5 minutos
                    keyBuffer = "";
                }

                // Chester (NOVO: Linkin Park, 5 minutos)
                if (keyBuffer.includes("chester")) {
                    playSound(CHESTER_MP3); 
                    showOverlay("TOCANDO", "Linkin Park - What I've Done", "🎧", 300000); // 5 minutos, mesmo estilo do Deftones
                    keyBuffer = "";
                }
                
                // Matrix (Mantido)
                if (keyBuffer.includes("matrix")) {
                    runMatrix();
                    const imgHtml = `<img src="${MATRIX_IMG}" alt="Matrix Mode" style="max-width:150px; border-radius:10px;">`;
                    showOverlay("MATRIX INICIADO", "A Verdade e nada mais...", imgHtml, 300000); // 5 min
                    keyBuffer = "";
                }
                
                // Anne (corrigido: overlay fixo + 5 minutos)
                if (keyBuffer.includes("anne")) {
                    playSound("https://files.catbox.moe/2cn4sg.mp3");
                    document.body.classList.add('effect-love');

                    const titulo = "❤️ Para a Anne ❤️";
                    const mensagem = 
                    "Você é a melhor parte dos meus dias.\n" +
                    "Obrigado por estar sempre comigo.\n" +
                    "Eu te amo 🌹";

                    showOverlay(titulo, mensagem, "", 300000); // 5 minutos
                    keyBuffer = "";
                }

            }
        });

        // E. Listener (Clique Logo - Mantido)
        const logos = document.querySelectorAll('h1, .navbar-brand, a[href="index.html"]');
        logos.forEach(logo => {
            logo.addEventListener('click', (e) => {
                clickCount++;
                if (clickTimer) clearTimeout(clickTimer);
                clickTimer = setTimeout(() => clickCount = 0, 1000);

                if (clickCount === 3) {
                    const html = document.documentElement;
                    if (html.classList.contains('effect-invert')) {
                        html.classList.remove('effect-invert');
                        showOverlay("SISTEMA", "Modo Normal Restaurado", "☀️");
                    } else {
                        html.classList.add('effect-invert');
                        showOverlay("SECRETO", "Modo Noturno Invertido", "🌙");
                    }
                    clickCount = 0;
                }
            });
        });

    })();
});

/* --- CORREÇÃO FINAL DO CARROSSEL --- */
document.addEventListener('DOMContentLoaded', () => {

    const track = document.getElementById('reviews-carousel-track');
    const btnPrev = document.getElementById('reviews-prev');
    const btnNext = document.getElementById('reviews-next');

    if (!track || !btnPrev || !btnNext) return;

    // Pega largura real do card dinamicamente
    function getCardWidth() {
        const card = track.querySelector('.review-card');
        if (!card) return 320;
        const style = window.getComputedStyle(card);
        return card.offsetWidth + parseInt(style.marginRight);
    }

    btnPrev.addEventListener('click', (e) => {
        e.preventDefault();
        track.scrollBy({
            left: -getCardWidth(),
            behavior: 'smooth'
        });
    });

    btnNext.addEventListener('click', (e) => {
        e.preventDefault();
        track.scrollBy({
            left: getCardWidth(),
            behavior: 'smooth'
        });
    });
});
/* --- LÓGICA DE CONTATO (Página Anuncie Conosco) --- */
document.addEventListener('DOMContentLoaded', () => {
    const btnSubmit = document.getElementById('contact-submit');
    const emailInput = document.getElementById('contact-email');
    const successMsg = document.getElementById('contact-message');

    // Verifica se os elementos existem na página antes de rodar
    if (btnSubmit && emailInput && successMsg) {
        btnSubmit.addEventListener('click', (e) => {
            e.preventDefault(); // Impede recarregamento da página

            // Validação simples: se o campo não estiver vazio
            if (emailInput.value.trim() !== "") {
                
                // 1. Mostra a mensagem de sucesso
                successMsg.classList.remove('hidden');

                // 2. Limpa o campo de e-mail
                emailInput.value = "";

                // 3. (Opcional) Esconde a mensagem após 5 segundos para limpar a tela
                setTimeout(() => {
                    successMsg.classList.add('hidden');
                }, 5000);
            } else {
                // Se estiver vazio, foca no input
                emailInput.focus();
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    
    /* -----------------------------------------------------------
       1. MENU MOBILE
    ----------------------------------------------------------- */
    const mobileBtn = document.querySelector('button[aria-label="Abrir menu de navegação"]');
    const navMenu = document.querySelector('nav');
    const navList = navMenu ? navMenu.querySelector('ul') : null;

    if (mobileBtn && navMenu && navList) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('hidden');
            if (!navMenu.classList.contains('hidden')) {
                navMenu.classList.add('absolute', 'top-full', 'left-0', 'w-full', 'bg-gray-900', 'shadow-xl', 'z-40', 'pb-5');
                navList.classList.remove('flex-row', 'space-x-6');
                navList.classList.add('flex-col', 'space-y-4', 'items-center', 'pt-4');
            } else {
                navMenu.classList.remove('absolute', 'top-full', 'left-0', 'w-full', 'bg-gray-900', 'shadow-xl', 'z-40', 'pb-5');
                navList.classList.add('flex-row', 'space-x-6');
                navList.classList.remove('flex-col', 'space-y-4', 'items-center', 'pt-4');
            }
        });
    }

    /* -----------------------------------------------------------
       2. EASTER EGGS (Simplificado para o exemplo)
    ----------------------------------------------------------- */
    // (O código completo dos Easter Eggs - Konami, Matrix, etc. - estaria aqui conforme suas versões anteriores)
    // Mantendo breve para focar no Quiz, mas imagine aqui toda a lógica de keydown listeners.

    /* -----------------------------------------------------------
       3. NAVEGAÇÃO DO CARROSSEL
    ----------------------------------------------------------- */
    const track = document.getElementById('reviews-carousel-track');
    const btnPrev = document.getElementById('reviews-prev');
    const btnNext = document.getElementById('reviews-next');

    if (track && btnPrev && btnNext) {
        function getCardWidth() {
            const card = track.querySelector('.review-card'); // Ajuste conforme classe real do seu card
            if (!card) return 320;
            const style = window.getComputedStyle(card);
            return card.offsetWidth + parseInt(style.marginRight || 0) + 16; // + gap
        }

        btnPrev.addEventListener('click', (e) => {
            e.preventDefault();
            track.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
        });

        btnNext.addEventListener('click', (e) => {
            e.preventDefault();
            track.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
        });
    }

    /* -----------------------------------------------------------
       4. FORMULÁRIO DE CONTATO (Anuncie Conosco)
    ----------------------------------------------------------- */
    const btnSubmit = document.getElementById('contact-submit');
    const emailInput = document.getElementById('contact-email');
    const successMsg = document.getElementById('contact-message');

    if (btnSubmit && emailInput && successMsg) {
        btnSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            if (emailInput.value.trim() !== "") {
                successMsg.classList.remove('hidden');
                emailInput.value = "";
                setTimeout(() => successMsg.classList.add('hidden'), 5000);
            } else {
                emailInput.focus();
            }
        });
    }

    /* -----------------------------------------------------------
       5. LÓGICA DO QUIZ (ATUALIZADA COM IMAGENS)
    ----------------------------------------------------------- */
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        
        // Elementos do DOM
        const questionText = document.getElementById('question-text');
        const questionImage = document.getElementById('question-image'); // Elemento da imagem
        const optionsList = document.getElementById('options-list');
        const nextBtn = document.getElementById('next-btn');
        const progressBar = document.getElementById('progress-bar');
        const questionBlock = document.getElementById('question-block');
        const resultBlock = document.getElementById('result-block');
        const scoreDisplay = document.getElementById('score-display');
        const resultMessage = document.getElementById('result-message');
        const resultImage = document.getElementById('result-image');

        let currentQuestionIndex = 0;
        let score = 0;

        // BANCO DE DADOS DE PERGUNTAS (Com Imagens)
        const questions = [
            {
                question: "Em The Legend of Zelda: Majora’s Mask, qual é o verdadeiro propósito narrativo do ciclo de três dias?",
                options: ["Apenas um limite de tempo para aumentar a dificuldade", "Representar a punição dos deuses sobre Termina", "Forçar o jogador a explorar todo o mapa rapidamente", "Criar um sistema de progressão não linear aleatório", "Simbolizar os estágios do luto vividos pelos personagens"],
                correct: 4,
                image: "imagens/zelda.jpg"
            },
            {
                question: "Em Battlefield 4, uma manobra aérea ficou tão icônica que ultrapassou a comunidade e foi oficialmente homenageada pela própria EA no trailer de Battlefield 2042. A jogada envolve ejetar de um caça em pleno voo, destruir um veículo inimigo no ar e retornar à aeronave. Essa manobra recebeu o nome do jogador que a criou. Qual é o nome dessa manobra?",
                options: ["Ninja Mid-Air Reset", "Faker Aerial Outplay", "Rendezook Maneuver", "s1mple Precision Eject", "Shroud One-Tap Evasion"],
                correct: 2,
                image: "imagens/Rendezook.avif"
            },
            {
                question: "Logo no início de Call of Duty: Black Ops, o jogo esconde um dos easter eggs mais famosos da franquia. Como o jogador acessa esse conteúdo secreto?",
                options: ["Responder corretamente todas as perguntas do interrogatório", " Permanecer completamente imóvel durante a cena inicial", "Apertar L2 + R2 repetidamente para se soltar da cadeira e acessar um computador com comandos, jogos antigos, arquivos secretos e lore oculto", " Falhar repetidamente no interrogatório até o jogo quebrar o script", " Concluir a campanha uma vez para desbloquear o menu oculto"],
                correct: 2,
                image: "imagens/BO.jpg" 
            },
            {
                question: "Em DOOM (1993), áreas secretas eram escondidas sem qualquer indicação visual clara. Como os jogadores descobriam esses segredos?",
                options: ["Interagindo repetidamente com paredes aparentemente normais", "Observando diferenças sutis na iluminação das fases", "Seguindo pistas sonoras específicas do ambiente", "Coletando itens especiais que revelavam mapas ocultos", "Usando comandos secretos disponíveis no menu"],
                correct: 0,
                image: "imagens/doom.jpg"
            },
            {
                question: "Qual foi considerado o primeiro jogo de vídeo game da história?",
                options: [" Pong (1972) ", "Space Invaders (1978)", "Pac-Man (1980)", "Computer Space (1971)", "Tennis for Two (1958)"],
                correct: 4,
                image: "imagens/atari.jpg"
            },
            {
                question: "Em Skyrim, um comportamento inesperado da física virou praticamente um easter egg lendário. O que causa esse efeito?",
                options: ["Receber um golpe crítico enquanto está sem armadura","Usar o grito Fus Ro Dah em terreno elevado", "Ser atingido por uma criatura de nível muito acima do jogador", "Ativar uma animação de finalização em terreno inclinado", " Ser atingido diretamente por um ataque corpo a corpo de um gigante"],
                correct: 4,
                image: "imagens/skyrim.png"
            },
            {
                question: "Em Silent Hill 2, o horror psicológico é construído de forma singular porque a cidade, os inimigos e a própria progressão narrativa operam como:",
                options: ["Um sistema sobrenatural autônomo, onde o Outro Mundo funciona como uma dimensão paralela fixa, ativada por eventos traumáticos globais que independem do estado psicológico do protagonista.", "Uma manifestação indireta de forças ocultistas residuais, nas quais símbolos, monstros e ambientes representam arquétipos universais do mal, aplicados igualmente a todos que entram na cidade.", " Um mecanismo narrativo de punição metafísica, no qual a cidade julga moralmente os pecados do indivíduo e executa sentenças simbólicas por meio de criaturas e cenários hostis.", "Um espelho psíquico que traduz culpa reprimida, negação e trauma em arquitetura, monstros e ritmo de gameplay, fazendo com que o terror emerja da subjetividade do protagonista e não de uma ameaça externa objetiva.", " Uma consequência da fragmentação da memória do protagonista, em que a desorientação cognitiva distorce a percepção da realidade e gera a ilusão de um ambiente hostil e mutável."],
                correct: 3,
                image: "imagens/james.jpg"
            },
            {
                question: "Qual destes grupos realmente ganhou as categorias que representa no Game Awards 2015?",
                options: ["Bloodborne(Melhor Design de Jogo), Splatoon(Melhor Multiplayer), Undertale(Melhor Música)", "Metal Gear Solid V(Melhor Performance), Inside(Melhor Direção de Arte), Bloodborne(Melhor Música)", "Assassin’s Creed Syndicate(Melhor Performance), Rocket League(Melhor Multiplayer), Ori and the Blind Forest(Melhor Direção de Arte)", "Mad Max(Melhor Performance), The Witcher 3: Wild Hunt(Game of the Year), Life is Strange(Melhor História Interativa)", "The Witcher 3: Wild Hunt(Game of the Year), Rocket League(Melhor Jogo Multiplayer), Ori and the Blind Forest(Melhor Direção de Arte)"],
                correct: 4,
                image: "imagens/premio.jpeg"
            },
            {
                question: "Em Bloodborne, o sistema de “Insight” (Discernimento) funciona como um eixo central que conecta filosofia, narrativa e gameplay porque ele representa:",
                options: ["Um recurso de progressão cognitiva que amplia a percepção do jogador sem impactos negativos diretos, funcionando principalmente como um gatilho para revelar conteúdo oculto e expandir o lore do mundo.", "Uma mecânica de dificuldade adaptativa, na qual o acúmulo de Insight ajusta parâmetros de IA, dano e visibilidade com o objetivo técnico de escalar o desafio conforme a experiência do jogador.", "Um sistema narrativo de recompensa, onde adquirir conhecimento cósmico fortalece o caçador por meio de acesso a itens raros, invocações e vantagens estratégicas que compensam riscos menores.", "Um atributo secundário opcional, projetado para aprofundar o lore sem interferir significativamente nas mecânicas centrais de combate, exploração ou sobrevivência.", "Uma tradução lúdica da filosofia do horror cósmico, em que compreender verdades além da condição humana altera a própria realidade do jogo, revela horrores antes invisíveis e simultaneamente fragiliza o jogador, tornando o progresso inseparável da perda de sanidade e controle."],
                correct: 4,
                image: "imagens/bloodborne.jpg"
            },
            {
                question: "Muito antes de Hollywood transformar franquias de jogos em blockbusters, um jogo pioneiro rompeu a barreira dos pixels e se tornou o primeiro videogame adaptado para o cinema, ainda em uma época em que o próprio conceito de “game movie” sequer existia. Qual foi esse jogo??",
                options: ["Space Invaders (1985)", " Street Fighter II (1994)", " Super Mario Bros. (1993)", "Mortal Kombat (1995)", "Double Dragon (1994)"],
                correct: 2,
                image: "imagens/movie.webp"
            },
            {
                question: "Quais destes grupos de famosos realmente participaram dos jogos listados?",
                options: ["Michael Jordan(NBA 2K series), Hideo Kojima(Metal Gear Solid V), Travis Scott(Fortnite), Mark Hamill(Assassin’s Creed Valhalla)", "Samuel L. Jackson(Fortnite), Travis Scott(Fortnite),  Cristiano Ronaldo(FIFA 21), Bill Murray(Death Stranding)", "Keifer Sutherland(Metal Gear Solid V), Marshmello(Fortnite), Norman Reedus(Death Stranding), Elliot Page(Ghost of Tsushima)", "Bill Murray(Ghostbusters: The Video Game), Emma Stone(Fortnite), Keanu Reeves(Cyberpunk 2077), Keifer Sutherland(Marvel’s Spider-Man)", "Idris Elba(Call of Duty: Modern Warfare 3 - 2011), Keanu Reeves(Cyberpunk 2077), Elliot Page(Beyond: Two Souls), Mark Hamill(Batman: Arkham series)"],
                correct: 4,
                image: "imagens/dublagem.jpg"
            },
            {
                question: "Antes de se tornar Portal, o conceito central do jogo surgiu de um projeto independente que chamou a atenção da Valve. Qual foi a origem real dessa ideia?",
                options: ["Um mod interno criado a partir de testes com física no Source Engine", "Um conceito descartado durante o desenvolvimento de Half-Life 2", "Um experimento técnico criado para demonstrar renderização de portais", "Um projeto universitário chamado Narbacular Drop", "Um protótipo desenvolvido para eventos acadêmicos patrocinados pela Valve"],
                correct: 3,
                image: "imagens/portal.jpg"
            },
            {
                question: "Em Alan Wake, a luz e a escuridão operam simultaneamente como elementos narrativos, simbólicos e mecânicos. Considerando a fragmentação da história, a manifestação dos inimigos, a progressiva instabilidade mental do protagonista e o papel ativo do jogador na condução dos eventos, qual interpretação melhor sintetiza a função real desses dois elementos dentro da experiência do jogo?",
                options: ["A luz funciona como um recurso puramente mecânico de combate, enquanto a escuridão representa uma força sobrenatural externa que ameaça a integridade física do protagonista", " A luz simboliza consciência, autoria e lucidez, enquanto a escuridão materializa repressão, culpa e perda de identidade, afetando diretamente a existência dos inimigos, a fragmentação da narrativa e o grau de agência do jogador sobre os acontecimentos", "A oposição entre luz e escuridão simboliza um conflito psicológico clássico entre sanidade e loucura, sem impacto direto na estrutura narrativa ou na agência do jogador", " A escuridão atua como uma entidade autônoma que manipula os acontecimentos, enquanto a luz serve apenas como ferramenta simbólica para guiar o jogador pela progressão da história", "A narrativa utiliza luz e escuridão como metáforas visuais da luta interna de Alan, mas mantém a identidade do protagonista e o controle do jogador estáveis ao longo da experiência"],
                correct: 1,
                image: "imagens/wake.png"
            },
            {
                question: "Quais destas músicas famosas da vida real foram usadas em jogos?",
                options: ["My Own Summer (Shove It)” – Deftones (Tony Hawk’s Pro Skater 2), “Song 2” – Blur (FIFA / Pro Evolution Soccer), “Hey Jude” – The Beatles (Lego Rock Band)", "“Smells Like Teen Spirit” – Rock Band, “Numb” – Band Hero, “We Are the Champions” – Queen (Call of Duty)", "“Let It Be” – Lego Rock Band, “I Want It That Way” – Just Dance 3, “Imagine” – Call of Duty", "“Enter Sandman” – Rock Band 3, “Beat It” – Dance Central, “Billie Jean” – Tetris", "“Sweet Child O’ Mine” – Guitar Hero III, “Livin’ on a Prayer” – Dance Dance Revolution, “Clair de Lune” – Claude Debussy (Minecraft)"],
                correct: 0,
                image: "imagens/hero.webp"
            },
            {
                question: "Durante o desenvolvimento de Resident Evil 4, o projeto passou por tantas iterações que acabou influenciando diretamente outra grande franquia. O que de fato aconteceu nesse processo?",
                options: ["Um protótipo mais focado em ação estilizada e combos abandonou o terror de sobrevivência e foi transformado em uma nova IP de ação", "A Capcom dividiu o projeto em múltiplas versões experimentais, cada uma visando um público diferente", " A história original foi descartada e reaproveitada como base para Resident Evil 5", " Um protótipo experimental se afastou tanto do terror clássico que acabou se tornando Devil May Cry", "Elementos de combate e câmera foram herdados de um projeto cancelado da série Onimusha"],
                correct: 3,
                image: "imagens/leon.webp"
            },
            {
                question: "Em Spec Ops: The Line, a revelação de que o Coronel Konrad esteve morto desde o início da missão é central para o significado do jogo porque ela demonstra que:",
                options: ["Konrad foi utilizado como um artifício narrativo tardio para justificar a escalada de violência e oferecer ao jogador um antagonista simbólico no terceiro ato da história.", "A morte de Konrad funciona como uma metáfora isolada para o fracasso da liderança militar, sem impacto direto sobre as ações do jogador ou a interpretação dos eventos anteriores.", "O jogo subverte a estrutura tradicional do shooter ao revelar que as ordens recebidas são projeções da mente fragmentada de Walker, transformando a jornada militar em um colapso psicológico onde culpa, trauma e delírio substituem a figura clássica do vilão externo.", "O enredo utiliza a alucinação como um recurso narrativo para suavizar a responsabilidade moral de Walker, deslocando suas ações para um estado de insanidade fora de seu controle consciente.", "A revelação serve apenas para chocar o jogador, mantendo intacta a lógica tradicional de herói contra vilão típica dos shooters modernos."],
                correct: 2,
                image: "imagens/spec.jpg"
            },
            {
                question: "Em Cyberpunk 2077, Johnny Silverhand carrega dois artefatos que transcendem sua função prática: eles operam como extensões simbólicas de sua identidade, ideologia anti-corporativa e legado histórico dentro de Night City. Considerando lore, narrativa e iconografia, qual é o nome correto da guitarra e da arma que definem Johnny Silverhand?",
                options: ["Guitarra Samurai Stratocaster e pistola Arasaka Type-12 “Red Queen”", "Guitarra Gibson Les Paul Custom e canhão BFG 9000n", "Guitarra Fender Stratocaster Blackout e pistola Silverballer .45", " Guitarra Lucille e pistolas Ebony & Ivory", "Guitarra DeLuze Orphean e pistola Malorian Arms 3516"],
                correct: 4,
                image: "imagens/deluze.jpg"
            },
            {
                question: "Qual foi o primeiro jogo da história a atingir 1 bilhão de downloads oficialmente registrados?",
                options: ["Candy Crush Saga", "Angry Birds", "Clash of Clans", "Subway Surfers", "Pokémon GO"],
                correct: 1,
                image: "imagens/cell.webp"
            },
            {
                question: "Muito antes de “segredos escondidos” virarem tradição, um único jogo inaugurou oficialmente o conceito de Easter Egg na história dos videogames, escondendo o nome de seu criador como forma de protesto contra a indústria.Qual foi esse jogo?",
                options: ["Space Invaders (Taito, 1978)", "Adventure (Atari 2600, 1979)", "Pac-Man (Namco, 1980)", "Pitfall! (Activision, 1982)", "Asteroids (Atari, 1979)"],
                correct: 1,
                image: "imagens/megadrive.jpg"
            },
            {
                question: "Em Metal Gear Solid 3, existe um jeito completamente fora da lógica tradicional de derrotar um boss sem lutar. O que o jogador pode fazer?",
                options: ["Mudar a data do console avançando 8 dias reais para o boss morrer de velhice", "Destruir antecipadamente os suprimentos do chefe para enfraquecê-lo", "Esperar o chefe sair da área ao permanecer escondido por tempo prolongado", "Usar apenas armas não letais até o fim da luta", "Executar a missão inteira sem alertar nenhum inimigo"],
                correct: 0,
                image: "imagens/solid.jpg"
            }
        ];

        // FUNÇÃO: Carregar Pergunta
        function loadQuestion() {
            const q = questions[currentQuestionIndex];
            
            // Atualiza texto e barra
            questionText.textContent = `${currentQuestionIndex + 1}. ${q.question}`;
            const progressPercent = ((currentQuestionIndex) / questions.length) * 100;
            progressBar.style.width = `${progressPercent}%`;

            // [ATUALIZADO] Troca a imagem da pergunta
            if (questionImage) {
                questionImage.src = q.image;
            }

            // Limpa opções antigas
            optionsList.innerHTML = '';
            nextBtn.classList.add('hidden');

            // Cria botões
            q.options.forEach((option, index) => {
                const btn = document.createElement('button');
                btn.textContent = option;
                btn.classList.add('quiz-option');
                btn.setAttribute('data-index', index);
                
                btn.addEventListener('click', () => checkAnswer(index, q.correct, btn));
                optionsList.appendChild(btn);
            });
        }

        // FUNÇÃO: Verificar Resposta
        function checkAnswer(selectedIndex, correctIndex, selectedBtn) {
            const allOptions = optionsList.querySelectorAll('.quiz-option');
            allOptions.forEach(btn => btn.disabled = true);

            // Lógica de Acerto/Erro
            if (selectedIndex === correctIndex) {
                selectedBtn.classList.add('correct');
                score++;
            } else {
                selectedBtn.classList.add('wrong');
                allOptions[correctIndex].classList.add('correct');
                
                // [NOVO] CHAMA A TELA DE FEEDBACK DE ERRO
                if (typeof window.showErrorFeedback === "function") {
                    window.showErrorFeedback(currentQuestionIndex);
                }
            }

            // IMPORTANTE: Faz o botão "Próxima" aparecer
            nextBtn.classList.remove('hidden');
        } 
        // ^--- ESTA CHAVE ESTAVA FALTANDO!

        // EVENTO: Botão Próxima
        nextBtn.addEventListener('click', () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                showResults();
            }
        });
        // FUNÇÃO: Exibir Resultados
        function showResults() {
            questionBlock.classList.add('hidden');
            nextBtn.classList.add('hidden');
            progressBar.parentElement.classList.add('hidden');
            resultBlock.classList.remove('hidden');

            scoreDisplay.textContent = score;

            let message = "";
            let imageUrl = "";

            if (score === 0) {
                message = "Você entrou no quiz como quem pula direto no boss sem tutorial. Nada deu certo, mas todo gamer começa no Game Over. Hora de aprender a ler o cenário, entender a lore… e tentar de novo.";
                imageUrl = "imagens/died.jpg";
            } else if (score <= 4) {
                message = "Você ainda está se localizando no mapa. Alguns acertos mostram potencial, mas o conhecimento de games precisa de mais grinding. Continue jogando a evolução vem.";
                imageUrl = "imagens/cup.jpg";
            } else if (score <= 9) {
                message = "Você já passou do modo iniciante. Tem noção de história, mecânicas e curiosidades, mas ainda perde detalhes importantes. Está no caminho certo, só falta afiar o olhar.";
                imageUrl = "imagens/savepoint.jpg";
            } else if (score <= 14) {
                message = "Bom desempenho. Você claramente conhece o meio gamer, lembra de easter eggs, lore e momentos históricos. Ainda não é elite, mas joga acima da média.";
                imageUrl = "imagens/geraldao.webp";
            } else if (score <= 19) {
                message = "Excelente. Você pensa como quem viveu a história dos videogames, entende referências profundas e pega armadilhas difíceis. Gamer veterano de respeito.";
                imageUrl = "imagens/masterchef.webp";
            } else {
                message = "LENDÁRIO. Você não jogou esse quiz — você o dominou. Conhecimento de lore, história, easter eggs e cultura gamer em nível absoluto. Se esse quiz tivesse New Game+, você já estaria pronto.";
                imageUrl = "imagens/theend.webp";
            }

            resultMessage.textContent = message;
            resultImage.src = imageUrl;
        }

        // Inicia o Quiz
        loadQuestion();
    }
});
/* -----------------------------------------------------------
   LÓGICA ADICIONAL: FEEDBACK DE ERRO (QUIZ)
----------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    
    // Elementos do Overlay
    const errorOverlay = document.getElementById('error-overlay');
    const errorExplanation = document.getElementById('error-explanation');
    const closeErrorBtn = document.getElementById('close-error-btn');
    const nextBtn = document.getElementById('next-btn'); // Botão original do quiz

    // BANCO DE EXPLICAÇÕES (Sincronizado com o índice das perguntas)
    const explanations = [
        "O ciclo de três dias em Majora’s Mask não é apenas uma mecânica de tempo, mas um recurso narrativo que reflete os estágios do luto (negação, raiva, aceitação) vividos pelos habitantes de Termina diante do fim iminente. Cada repetição aprofunda o impacto emocional, mostrando como diferentes personagens lidam com a perda, o medo e a inevitabilidade, tornando o tempo parte essencial do significado da história.",
        "A Rendezook Maneuver surgiu em Battlefield 4 quando um jogador ejetou de um caça, destruiu um helicóptero inimigo com um lança-foguetes em pleno ar e retornou à aeronave. A jogada se tornou tão icônica na comunidade que a EA a reconheceu oficialmente, homenageando-a no trailer de Battlefield 2042 como símbolo da liberdade emergente e das jogadas improvisadas da franquia.",
        "No início de Call of Duty: Black Ops, o jogador pode se soltar da cadeira ao apertar L2 + R2 repetidamente durante a cena inicial. Isso libera o acesso a um computador escondido no cenário, que contém jogos clássicos, arquivos secretos, comandos e informações de lore, tornando o easter egg um dos mais icônicos da franquia.",
        "Em DOOM (1993), muitos segredos eram descobertos ao interagir repetidamente com paredes aparentemente normais, que funcionavam como passagens ocultas. Essa abordagem incentivava a curiosidade e a experimentação, tornando a exploração parte central da experiência e ajudando a definir o design de fases dos shooters clássicos.",
        "Tennis for Two (1958) é considerado o primeiro videogame da história por ter sido um jogo interativo exibido em uma tela, permitindo que duas pessoas jogassem em tempo real. Criado por William Higinbotham em um osciloscópio, ele antecede os consoles comerciais e estabelece a base conceitual do que viria a ser o videogame moderno.",
        "Em Skyrim, o efeito lendário acontece quando o jogador é atingido diretamente por um ataque corpo a corpo de um gigante. A combinação da força absurda do golpe com a física do jogo faz o personagem ser arremessado a grandes alturas, criando uma situação inesperada e icônica que virou praticamente um easter egg emergente, a Bethesda nunca corrigiu o erro, mantendo o momento como parte da identidade do jogo.",
        "Em Silent Hill 2, a cidade não opera como um mal externo ou um sistema sobrenatural neutro, mas como um espelho da psique de James Sunderland. Seus sentimentos de culpa, repressão, negação e dor emocional são traduzidos diretamente em arquitetura distorcida, monstros simbólicos e no ritmo lento e opressivo da progressão. Criaturas como Pyramid Head e os ambientes decadentes não existem apenas para assustar, mas para representar conflitos internos específicos do protagonista. Dessa forma, o horror emerge da subjetividade humana e da incapacidade de lidar com o trauma, tornando a experiência profundamente psicológica e emocional, e não apenas baseada em sustos ou ameaças objetivas.",
        "A alternativa E é a correta porque reúne apenas vencedores reais do The Game Awards 2015 em suas respectivas categorias. The Witcher 3: Wild Hunt venceu Game of the Year, Rocket League conquistou Melhor Jogo Multiplayer e Ori and the Blind Forest foi premiado por Melhor Direção de Arte, formando um conjunto totalmente coerente com os resultados oficiais daquele ano. As demais alternativas misturam jogos importantes e indicados, mas com associações incorretas de categorias. Na A, apesar de The Witcher 3 estar corretamente como Jogo do Ano, Mad Max não venceu Melhor Performance e Life is Strange não ganhou Melhor História Interativa. Na B, Bloodborne e Splatoon aparecem como vencedores de categorias que não conquistaram, enquanto Undertale, mesmo sendo muito elogiado por sua trilha sonora, não venceu Melhor Música. Na C, Inside está corretamente ligado à Direção de Arte, mas Metal Gear Solid V não ganhou Melhor Performance e Bloodborne não venceu Melhor Música. Já na D, Rocket League e Ori and the Blind Forest estão corretos, porém Assassin’s Creed Syndicate não venceu Melhor Performance, o que invalida o grupo.",
        "Em Bloodborne, o Insight não é apenas um recurso mecânico, mas uma tradução direta do horror cósmico para o gameplay. À medida que o caçador adquire conhecimento sobre verdades além da compreensão humana, o próprio mundo do jogo se transforma: criaturas antes invisíveis passam a ser vistas, detalhes perturbadores surgem e, ao mesmo tempo, o personagem se torna mais vulnerável a efeitos mentais e certos inimigos. Assim, compreender mais não significa apenas ganhar poder, mas perder segurança, controle e sanidade, conectando filosofia, narrativa e mecânicas de forma inseparável e tornando o progresso um ato de risco existencial.",
        "Super Mario Bros. (1993) foi o primeiro videogame adaptado para o cinema em formato de longa-metragem live-action, em um período em que adaptações de jogos ainda não eram vistas como um gênero viável. Mesmo com recepção negativa, o filme quebrou a barreira entre videogames e Hollywood e estabeleceu o precedente para produções posteriores como Double Dragon (1994), Street Fighter (1994) e Mortal Kombat (1995), tornando-se um marco histórico nas adaptações de games.",
        "A alternativa E é a correta porque reúne apenas participações reais e bem documentadas de famosos em jogos. Idris Elba atuou em Call of Duty: Modern Warfare 3 (2011) como o personagem Truck, Keanu Reeves interpretou Johnny Silverhand em Cyberpunk 2077 com voz e captura de movimento, Elliot Page protagonizou Beyond: Two Souls com performance completa, e Mark Hamill é a voz icônica do Coringa na série Batman: Arkham. Nas demais alternativas, há sempre uma mistura de acertos com associações incorretas. Em A e D, apesar de Michael Jordan realmente aparecer na série NBA 2K e Travis Scott ter participado de eventos em Fortnite, Hideo Kojima não atua como personagem em Metal Gear Solid V e Mark Hamill não participa de Assassin’s Creed Valhalla. Na B, Bill Murray reprisou seu papel em Ghostbusters: The Video Game e Keanu Reeves está corretamente em Cyberpunk 2077, mas Emma Stone nunca participou de Fortnite e Keifer Sutherland não aparece em Marvel’s Spider-Man. Já na C, Keifer Sutherland e Marshmello estão corretos, porém Norman Reedus não está em Death Stranding como participação equivocada (ele é protagonista, mas o contexto da alternativa invalida o grupo) e Elliot Page não participa de Ghost of Tsushima.",
        "O conceito que deu origem a Portal veio de Narbacular Drop, um projeto universitário desenvolvido por estudantes do DigiPen Institute of Technology. O jogo chamou a atenção da Valve por sua mecânica inovadora de portais interconectados, levando a empresa a contratar a equipe e transformar a ideia em Portal, expandindo o conceito com narrativa, humor e refinamento técnico.",
        "Em Alan Wake, luz e escuridão vão além de simples mecânicas ou símbolos isolados e funcionam como eixos centrais da experiência narrativa e interativa. A luz representa consciência, controle e autoria — é por meio dela que o jogador reafirma a identidade de Alan e exerce agência sobre o mundo. Já a escuridão materializa culpa, repressão e a perda gradual de identidade, manifestando inimigos, distorcendo a narrativa e colocando em dúvida quem realmente controla os acontecimentos. Essa relação faz com que a progressão do jogo, o estado mental do protagonista e as escolhas do jogador estejam diretamente ligados a esses dois elementos, sintetizando sua função real como algo inseparável de história, simbolismo e gameplay.",
        "A alternativa A é a correta porque todas as músicas listadas são faixas reais, lançadas antes dos jogos, e oficialmente licenciadas para aparecerem neles. “My Own Summer (Shove It)” do Deftones marcou presença em Tony Hawk’s Pro Skater 2, “Song 2” do Blur foi amplamente usada em jogos de futebol como FIFA e Pro Evolution Soccer, e “Hey Jude” dos Beatles integra o repertório de Lego Rock Band. Nas demais alternativas, cada grupo mistura músicas que realmente apareceram em jogos com associações incorretas. Em B, “Smells Like Teen Spirit” e “Numb” aparecem corretamente em jogos musicais, mas “We Are the Champions” nunca foi usada em Call of Duty. Na C, “Let It Be” e “I Want It That Way” estão corretas, porém “Imagine” não faz parte de nenhum Call of Duty. Na D, “Enter Sandman” e “Beat It” aparecem corretamente, mas “Billie Jean” nunca foi utilizada em Tetris. Já na E, apesar de “Sweet Child O’ Mine” e “Livin’ on a Prayer” terem aparecido em jogos musicais, “Clair de Lune” não integra a trilha oficial de Minecraft, invalidando o grupo.",
        "Durante o desenvolvimento de Resident Evil 4, a Capcom criou diversos protótipos experimentais. Um deles se afastou radicalmente do terror de sobrevivência, adotando combates rápidos, movimentos acrobáticos e um protagonista estiloso. Esse conceito já não se encaixava mais em Resident Evil, mas era forte o suficiente para não ser descartado. Em vez disso, a Capcom transformou esse protótipo em uma nova franquia, que viria a ser Devil May Cry. Assim, um desvio criativo dentro de Resident Evil 4 acabou dando origem a uma das séries de ação mais influentes da indústria, mostrando como o processo caótico de desenvolvimento impactou diretamente outra grande franquia.",
        "A revelação de que o Coronel Konrad já estava morto desde o início mostra que Spec Ops: The Line desconstrói deliberadamente o shooter militar tradicional. As ordens e a figura de Konrad não vêm de um inimigo real, mas são projeções da mente fragmentada de Walker, criada para justificar decisões cada vez mais violentas. Com isso, o jogo transforma a campanha em um colapso psicológico, onde culpa, trauma e negação substituem a noção clássica de vilão externo, forçando o jogador a confrontar sua própria responsabilidade pelas atrocidades cometidas.",
        "As alternativas incorretas utilizam referências conhecidas da cultura pop e de outros jogos para criar confusão, mas nenhuma delas corresponde ao lore oficial de Cyberpunk 2077. A opção A mistura o nome da banda Samurai com equipamentos ligados à Arasaka, o que entra em conflito direto com a ideologia anti-corporativa de Johnny Silverhand, além de citar itens que não existem no jogo. A B combina uma guitarra real famosa com o BFG 9000, arma icônica de DOOM, totalmente deslocada do universo cyberpunk. Na C, a pistola Silverballer .45 é associada a personagens de outras franquias, como Hitman, e não a Johnny, enquanto a guitarra citada não faz parte da iconografia da Samurai. Já a D reúne referências externas: a guitarra Lucille, ligada a B.B. King, e as armas Ebony & Ivory, de Devil May Cry, sem qualquer relação com o mundo ou a narrativa de Cyberpunk 2077. Assim, apenas a alternativa E apresenta artefatos canônicos que realmente definem Johnny Silverhand dentro da história de Night City.",
        "Angry Birds foi o primeiro jogo a ultrapassar a marca de 1 bilhão de downloads, alcançando esse feito por volta de 2012. O sucesso se deveu à sua jogabilidade simples e acessível, ampla disponibilidade em múltiplas plataformas e forte presença em dispositivos móveis no início da popularização dos smartphones. Esse marco transformou o jogo em um fenômeno cultural e estabeleceu um novo patamar de escala para a indústria de games mobile.",
        "Adventure (Atari 2600, 1979) é reconhecido como o primeiro jogo a conter um Easter Egg oficial. Seu criador, Warren Robinett, escondeu secretamente seu nome em uma sala invisível como forma de protesto contra a política da Atari, que não creditava os desenvolvedores. Esse ato não apenas marcou a história dos videogames, mas também deu origem ao próprio conceito de Easter Egg como conhecemos hoje.",
        "Em Metal Gear Solid 3, o jogador pode derrotar The End de forma totalmente não convencional ao avançar a data do console em cerca de 8 dias reais, fazendo com que o chefe morra de velhice antes do confronto. Essa solução quebra a lógica tradicional de batalhas contra bosses e reforça o estilo metanarrativo da série, que incentiva criatividade, experimentação e a quebra da quarta parede como parte do gameplay."
    ];

    // Função para mostrar o erro
    window.showErrorFeedback = function(questionIndex) {
        if (!errorOverlay || !errorExplanation) return;

        // Define o texto da explicação com base no índice
        errorExplanation.innerHTML = explanations[questionIndex] || "Resposta incorreta. Tente prestar mais atenção aos detalhes!";
        
        // Mostra o overlay
        errorOverlay.classList.remove('hidden');
    };

    // Ação do botão "Entendi, Próxima"
    if (closeErrorBtn) {
        closeErrorBtn.addEventListener('click', () => {
            // 1. Esconde o overlay
            errorOverlay.classList.add('hidden');
            
            // 2. Simula o clique no botão "Próxima" do quiz original para avançar
            if (nextBtn) {
                nextBtn.click();
            }
        });
    }
});