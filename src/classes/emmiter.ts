import { AlfaParticle, BetaParticle, RadiationGammaParticle, RadiationXParticle } from "./nuclearParticles";
import Vector2D from "./vector2D";

class ParticleEmitter {
    position: Vector2D;
    particles: any[] = [];
    emissionRate: number;
    lifespan: number;
    sprite: HTMLImageElement;
    lastEmissionTime: number = 0;

    constructor(position: Vector2D, emissionRate: number, lifespan: number, spriteSrc: string) {
        this.position = position;
        this.emissionRate = emissionRate;
        this.lifespan = lifespan;
        this.sprite = new Image();
        this.sprite.src = spriteSrc;

        this.sprite.onload = () => {
            console.log("Sprite loaded!");
        };
    }

    emit() {
        for (let i = 0; i < this.emissionRate; i++) {
          this.particles.push(new BetaParticle(new Vector2D(this.position.x + Math.random() * 150 - 75, this.position.y + Math.random() * 150 - 75)));
          this.particles.push(new AlfaParticle(new Vector2D(this.position.x + Math.random() * 150 - 75, this.position.y + Math.random() * 150 - 75)));
          this.particles.push(new RadiationXParticle(new Vector2D(this.position.x + Math.random() * 150 - 75, this.position.y + Math.random() * 150 - 75)));
          this.particles.push(new RadiationGammaParticle(new Vector2D(this.position.x + Math.random() * 150 - 75, this.position.y + Math.random() * 150 - 75)));
        }
    }

    update() {
        this.emit();

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.update();
            if (particle.isDead()) {
                this.particles.splice(i, 1);
            }
        }
    }

    // Dibujar las partículas y el sprite
    show(ctx: CanvasRenderingContext2D) {
        if (this.sprite.complete) {
            ctx.drawImage(this.sprite, this.position.x - this.sprite.width / 2 + 75, this.position.y - this.sprite.height / 2);
        }
        
        // Dibujar las partículas
        for (let particle of this.particles) {
            particle.show(ctx);
        }
    }
}

export default ParticleEmitter;
