const canvas = document.getElementById('maskCanvas');
const ctx = canvas.getContext('2d');

function getHolesFromDOM() {
    const spans = document.querySelectorAll('.hole-0-inline');
    return Array.from(spans).map(el => {
        const rect = el.getBoundingClientRect();
        return {
            xPct: rect.left / window.innerWidth,
            yPct: rect.top / window.innerHeight,
            wPct: rect.width / window.innerWidth,
            hPct: rect.height / window.innerHeight
        };
    });
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const dynamicHoles = getHolesFromDOM();
    drawMask(dynamicHoles);
}

function drawMask(holes) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    holes.forEach(h => {
        const x = h.xPct * canvas.width;
        const y = h.yPct * canvas.height;
        const w = h.wPct * canvas.width;
        const hRect = h.hPct * canvas.height;
        ctx.clearRect(x, y, w, hRect);
    });
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();






