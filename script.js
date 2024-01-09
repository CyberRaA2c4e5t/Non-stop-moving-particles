
/**@type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const cw = canvas.width = window.innerWidth;
const ch = canvas.height = window.innerHeight;

class Particles {
    constructor() {
        this.x = Math.random() * cw;
        this.y = Math.random() * ch;
        this.radius = Math.random() * 7 + 5;
        this.rSpeed = Math.random() * 0.7 + 0.3;
        this.speedX = Math.random() * 2.5 - 2.5;
        this.speedY = Math.random() * 2.5 - 2.5;
        //this.move = true;
        this.color = 'rgba(0,250,200,0.6)';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > cw ) {
            this.speedX = Math.random() * -3.3;
            this.color = 'rgb(' + Math.floor(Math.random() * 250) + ',' + Math.floor(Math.random() * 250) + ',' + Math.floor(Math.random() * 250) + ')';
        } if (this.y > ch) {
            this.speedY = Math.random() * -3.3;
            this.color = 'rgb(' + Math.floor(Math.random() * 250) + ',' + Math.floor(Math.random() * 250) + ',' + Math.floor(Math.random() * 250) + ')';
        }
        if (this.x < 0 || this.y < 0) {
            this.speedX = Math.random() * 2.5 + 0.7;
            this.speedY = Math.random() * 2.5 + 0.7;
            this.color = 'rgb(' + Math.floor(Math.random() * 250) + ',' + Math.floor(Math.random() * 250) + ',' + Math.floor(Math.random() * 250) + ')';
        }
        /*if (this.move) {
            this.radius += this.rSpeed;
            if (this.radius >= 30) {
                this.move = false;
            }
        } else {
            this.radius -= this.rSpeed;
            if (this.radius <= Math.random() * 7 + 5) {
                this.move = true;
            }
        }*/
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2);
        ctx.fill();
    }
}

const particles = [];
for (let i = 0; i < 10; i++) {
    particles.push(new Particles());
}

function handleParticles() {
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update();
        p.draw();
        for (let j = i; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distance = Math.sqrt(dx**2 + dy**2);
            if (distance <= 250) {
                ctx.strokeStyle = p.color;
                ctx.beginPath();
                ctx.lineCap = 'round';
                ctx.lineWidth = Math.random() * 2.5 + 2.5;
                ctx.moveTo(p.x,p.y);
                ctx.lineTo(p2.x,p2.y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0,0,cw,ch);
    handleParticles();
    requestAnimationFrame(animate);
}
animate();
