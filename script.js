document.addEventListener('DOMContentLoaded', () => {
    
    /* -----------------------------------------------------------
       1. MENU MOBILE (Responsividade)
       Lógica para abrir/fechar o menu e ajustar classes Tailwind
    ----------------------------------------------------------- */
    const mobileBtn = document.querySelector('button[aria-label="Abrir menu de navegação"]');
    const navMenu = document.querySelector('nav');
    const navList = navMenu ? navMenu.querySelector('ul') : null;

    if (mobileBtn && navMenu && navList) {
        mobileBtn.addEventListener('click', () => {
            // Alterna a visibilidade
            navMenu.classList.toggle('hidden');

            // Verifica se o menu está aberto para aplicar estilos de "Overlay" Mobile
            if (!navMenu.classList.contains('hidden')) {
                // Adiciona classes para posicionamento mobile (sobrepondo o conteúdo)
                navMenu.classList.add('absolute', 'top-full', 'left-0', 'w-full', 'bg-gray-900', 'shadow-xl', 'z-40', 'pb-5');
                
                // Ajusta a lista para vertical
                navList.classList.remove('flex-row', 'space-x-6'); // Remove estilo desktop
                navList.classList.add('flex-col', 'space-y-4', 'items-center', 'pt-4'); // Adiciona estilo mobile
            } else {
                // Limpeza (opcional, pois o 'hidden' já esconde, mas garante reset ao fechar)
                navMenu.classList.remove('absolute', 'top-full', 'left-0', 'w-full', 'bg-gray-900', 'shadow-xl', 'z-40', 'pb-5');
                navList.classList.add('flex-row', 'space-x-6');
                navList.classList.remove('flex-col', 'space-y-4', 'items-center', 'pt-4');
            }
        });
    }

    /* -----------------------------------------------------------
       2. ATUALIZAÇÃO DO COPYRIGHT
    ----------------------------------------------------------- */
    const footerYear = document.querySelector('footer p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        // Se o texto não contiver o ano atual, atualiza
        if (!footerYear.innerHTML.includes(currentYear.toString())) {
             footerYear.innerHTML = footerYear.innerHTML.replace(/\d{4}/, currentYear);
        }
    }
});