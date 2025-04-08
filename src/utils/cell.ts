import Vector2D from './vector2D';

interface EmmiterType {
  activity: number;
  averageEnergy: number;
  qualityFactor: number;
}

// Relación rem - estado celular
// rem = [0; 50] -> healthy (#00FF00)
// rem = [51; 200] -> damaged (#FF0000)
// rem = [200; 500] -> mutated (#FF00FF)
// rem >= 500 -> dead (#111111)

export class Cell {
  position: Vector2D;
  state: 'healthy' | 'damaged' | 'mutated' | 'dead' = 'healthy';
  color: '#00ff00' | '#ff0000' | '#ff00ff' | '#111111' = '#00ff00';

  constructor(x: number, y: number) {
    this.position = new Vector2D(x, y);
  }

  calculateDose(
    emmiterType: EmmiterType, 
    mass: number,
    tisularWeight: number,
    time: number, 
    errorMargin: number = 0.5
  ) {
    const randomFactor = (Math.random() * 2 * errorMargin) - errorMargin;
    const dose = (emmiterType.activity * emmiterType.averageEnergy * 1.602e-13 * emmiterType.qualityFactor * 100 * time * tisularWeight) / mass;
    return dose * (1 + randomFactor);
  }

  updateState(dose: number) {
    if (dose < 51) {
      this.state = 'healthy';
      this.color = '#00ff00';
    } else if (dose < 201) {
      this.state = 'damaged';
      this.color = '#ff0000';
    } else if (dose < 501) {
      this.state = 'mutated';
      this.color = '#ff00ff';
    } else {
      this.state = 'dead';
      this.color = '#111111';
    }
  }
  

  draw(ctx: CanvasRenderingContext2D, cellSize: number) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.position.x * cellSize, this.position.y * cellSize, cellSize / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}
