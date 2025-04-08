import Particle from "./particle";
import Vector2D from "./vector2D";

const radius = 4;

class AlfaParticle extends Particle {
    constructor(position: Vector2D) {
        super(position);
        this.velocity = new Vector2D(Math.random() * 4 - 2, Math.random() * 4 - 2);
        this.acceleration = new Vector2D(Math.random() * 0.5 - 0.25, Math.random() * 0.5 - 0.25);
        this.lifespan = 255;
    }
    show(ctx: CanvasRenderingContext2D) {
        if (this.lifespan > 0) {
            // Dibujar los neutrones
            ctx.fillStyle = `rgba(150, 150, 150, ${this.lifespan / 255})`;
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y - radius, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = `rgba(150, 150, 150, ${this.lifespan / 255})`;
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y + radius, radius, 0, Math.PI * 2);
            ctx.fill();
            // Dibujar los protones
            ctx.fillStyle = `rgba(200, 0, 0, ${this.lifespan / 255})`;
            ctx.beginPath();
            ctx.arc(this.position.x - radius, this.position.y, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = `rgba(200, 0, 0, ${this.lifespan / 255})`;
            ctx.beginPath();
            ctx.arc(this.position.x + radius, this.position.y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

class BetaParticle extends Particle {
    constructor(position: Vector2D) {
        super(position);
        this.velocity = new Vector2D(Math.random() * 4 - 2, Math.random() * 4 - 2);
        this.acceleration = new Vector2D(Math.random() * 0.5 - 0.25, Math.random() * 0.5 - 0.25);
        this.lifespan = 255;
    }
    show(ctx: CanvasRenderingContext2D) {
        if (this.lifespan > 0) {
            ctx.fillStyle = `rgba(50, 100, 255, ${this.lifespan / 255})`;
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

class RadiationGammaParticle extends Particle {
    constructor(position: Vector2D) {
        super(position);
        this.velocity = new Vector2D(Math.random() * 4 - 2, Math.random() * 4 - 2);
        this.acceleration = new Vector2D(Math.random() * 0.5 - 0.25, Math.random() * 0.5 - 0.25);
        this.lifespan = 255;
    }
    show(ctx: CanvasRenderingContext2D) {
        if (this.lifespan > 0) {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.lifespan / 255})`;
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = `rgba(255, 255, 255, 200)`;
        }
    }
}

class RadiationXParticle extends Particle {
    constructor(position: Vector2D) {
        super(position);
        this.velocity = new Vector2D(Math.random() * 4 - 2, Math.random() * 4 - 2);
        this.acceleration = new Vector2D(Math.random() * 0.5 - 0.25, Math.random() * 0.5 - 0.25);
        this.lifespan = 255;
    }
    show(ctx: CanvasRenderingContext2D) {
        if (this.lifespan > 0) {
            ctx.fillStyle = `rgba(0, 255, 100, ${this.lifespan / 255})`;
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = `rgba(255, 255, 255, 200)`;
        }
    }
}

export { AlfaParticle, BetaParticle, RadiationGammaParticle, RadiationXParticle };

