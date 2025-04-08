import Vector2D from "./vector2D";

let colors = [
  "255, 0, 0",
  "0, 255, 0",
  "0, 0, 255",
];

class Particle {
  position: Vector2D;
  velocity: Vector2D;
  acceleration: Vector2D;
  lifespan: number;

  constructor(position: Vector2D) {
    this.position = position;
    this.velocity = new Vector2D(Math.random() * 4 - 2, Math.random() * 4 - 2);
    this.acceleration = new Vector2D(
      Math.random() * 0.5 - 0.25,
      Math.random() * 0.5 - 0.25
    );
    this.lifespan = 255;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
  }

  isDead() {
    return this.lifespan <= 0;
  }
}

export default Particle;