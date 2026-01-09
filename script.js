const body = document.querySelector('body');
const main = document.querySelector('main');

const randomImg = (img) => {
    const randomNumber = numeroAleatorio(0, 2, true);
    if(randomNumber === 0) {
        img.src = './assets/lirio.jpg';
        img.classList.add('lirio');
    } else {
        img.src = './assets/lirios.png';
        img.classList.add('tulipa');
    }

}

const criarFlor = () => {
    const altura = Math.random() * window.innerHeight
    const flor = document.createElement('img');
    // randomImg(flor);
    flor.src = './assets/lirios.png';
    flor.classList.add('lirios');
    flor.style.top = `${altura}px`;
    flor.style.left = `${pegarLargura()}vw`;
    body.appendChild(flor);
    setKeyframe(flor, altura)
}

const tirarFlor = () => {
    const flor = document.querySelector('.flor_teste');
    if (flor) {
        flor.remove();
    }
}

const setKeyframe = (element, heightInitial) => {
    // Calcula uma distância de queda adequada (não ultrapassa a viewport)
    const maxFall = window.innerHeight - heightInitial - 10;
    const fallDistance = Math.max(150, Math.min(maxFall, 400));

    // Rotação inicial aleatória e pequena variação até o final
    const initialRot = numeroAleatorio(-15, 15, true);
    const rotDelta = numeroAleatorio(-12, 12, true);
    const endRot = initialRot + rotDelta;

    // Parâmetros para oscilação (wobble) durante a queda
    const wobbleAmp = numeroAleatorio(2, 6, true); // amplitude em graus
    const wobbleCycles = numeroAleatorio(1, 3, true); // quantas oscilações
    const phase = numeroAleatorio(0, 360, true) * (Math.PI / 180);

    // Gera keyframes mais finos para mostrar rotação contínua + oscilação
    const steps = [0, 0.2, 0.4, 0.6, 0.8, 1];
    const keyframes = steps.map(t => {
        const top = heightInitial + Math.round(fallDistance * t);
        // Opacity: fade in rápido no começo e fade out no fim
        let opacity = 1;
        if (t < 0.15) opacity = t / 0.15; // 0 -> 1
        if (t > 0.85) opacity = Math.max(0, (1 - t) / 0.15); // 1 -> 0

        // Rotação = interpolação linear + pequena oscilação senoidal
        const linearRot = initialRot + (endRot - initialRot) * t;
        const wobble = wobbleAmp * Math.sin(2 * Math.PI * wobbleCycles * t + phase);
        const rot = Math.round(linearRot + wobble);

        return {
            opacity,
            top: `${top}px`,
            transform: `rotate(${rot}deg)`,
            offset: t
        };
    });

    const optionsAnimation = {
        duration: 4000,
        iterations: 1,
        easing: 'ease-in-out',
        fill: 'forwards'
    };
    element.animate(keyframes, optionsAnimation);
}

const pegarLargura = () => {
    // Gera um número aleatório entre 0-15 ou 75-90 (em %) para definir a posição horizontal da flor
    const numAleatorio = numeroAleatorio(0, 2, true);
    if(numAleatorio === 0) {
        return numeroAleatorio(0, 20, true);
    } else {
        return numeroAleatorio(70, 80, true)
    }
}

const numeroAleatorio = (min, max, numeroInteiro) => {
    const numero = Math.random() * (max - min) + min;
    if (numeroInteiro) {
        return Math.floor(numero);
    }
    return numero;
}


setInterval(() => {
    main.classList.remove('none');
    main.classList.add('fadein_inicial_background');
}, 1000)

// função gatilho
setInterval(criarFlor, 500);
// Começa a remover flores apenas após 5 segundos, depois remove uma a cada 8s
setTimeout(() => setInterval(tirarFlor, 5000), 8000);