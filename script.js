// Espera a que el DOM cargue
document.addEventListener('DOMContentLoaded', () => {
    // Confeti en Canvas
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Resize canvas en responsive
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Partículas de confeti
    const particles = [];
    const colors = ['#FFD700', '#FF4500', '#00FF00', '#00BFFF']; // Colores festivos

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height, // Empieza arriba
            size: Math.random() * 5 + 5,
            speed: Math.random() * 2 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotSpeed: Math.random() * 5 - 2.5
        };
    }

    // Genera partículas iniciales
    for (let i = 0; i < 100; i++) { // Número bajo para rendimiento
        particles.push(createParticle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.y += p.speed;
            p.rotation += p.rotSpeed;
            if (p.y > canvas.height) {
                Object.assign(p, createParticle()); // Recicla partícula
            }
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();
        });
        requestAnimationFrame(animate);
    }

    animate();

    // NUEVO: Fondo dinámico
    const hero = document.getElementById('hero');
    const backgrounds = [
        'fondo1.jpg',
        'fondo2.jpg',
        'fondo3.jpg',
        'fondo4.jpg',
        'fondo5.jpg',
        'fondo6.jpg'
    ];
    let currentBgIndex = 0;

    function changeBackground() {
        currentBgIndex = (currentBgIndex + 1) % backgrounds.length; // Cicla entre 0 y 5
        hero.style.backgroundImage = `url('${backgrounds[currentBgIndex]}')`;
    }

    // Cambia cada 5 segundos (5000 ms). Ajusta si quieres más rápido/lento
    setInterval(changeBackground, 5000);

    // Parallax ligero en hero background (se mantiene, pero ahora con fondos dinámicos)
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        hero.style.backgroundPositionY = `${scrollPos * 0.5}px`; // Movimiento sutil
    });

    // Acción del botón (ejemplo: scroll a sección mensaje)
    const btn = document.querySelector('.btn-animated');
    btn.addEventListener('click', () => {
        document.querySelector('.message').scrollIntoView({ behavior: 'smooth' });
    });
});