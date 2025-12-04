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
                
                // Anne (ATUALIZADO: Nova Mensagem)
                if (keyBuffer.includes("anne")) {
                    playSound("https://files.catbox.moe/2cn4sg.mp3");
                    document.body.classList.add('effect-love');
                    
                    // Texto exato solicitado
                    const titulo = "❤️ Para a Anne ❤️";
                    const mensagem = "Você é a melhor parte dos meus dias.\nObrigado por estar sempre comigo.\nEu te amo 🌹";
                    
                    showOverlay(titulo, mensagem, "", 300000);
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