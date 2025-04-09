import Vector2D from './vector2D';

interface EmmiterType {
  activity: number;
  averageEnergy: number;
  qualityFactor: number;
}

// Relación rem - estado celular
// rem = [0; 50] -> healthy (#05df72)
// rem = [51; 200] -> damaged (#ff8904)
// rem = [200; 500] -> mutated (#8e51ff)
// rem >= 500 -> dead (#292524)

export class Cell {
  position: Vector2D;
  state: 'healthy' | 'damaged' | 'mutated' | 'dead' = 'healthy';
  color: '#05df72' | '#ff8904' | '#8e51ff' | '#292524' = '#05df72';

  constructor(x: number, y: number) {
    this.position = new Vector2D(x, y);
  }

  calculateDose(
    emmiterType: EmmiterType, 
    mass: number,
    tisularWeight: number,
    time: number, 
    randomMargin: number = 0.5
  ) {
    const randomFactor = (Math.random() * 2 * randomMargin) - randomMargin;
    const dose = (emmiterType.activity * emmiterType.averageEnergy * 1.602e-13 * emmiterType.qualityFactor * 100 * time * tisularWeight) / mass;
    return dose * (1 + randomFactor);
  }

  updateState(dose: number) {
    if (dose < 51) {
      this.state = 'healthy';
      this.color = '#05df72';
    } else if (dose < 201) {
      this.state = 'damaged';
      this.color = '#ff8904';
    } else if (dose < 501) {
      this.state = 'mutated';
      this.color = '#8e51ff';
    } else {
      this.state = 'dead';
      this.color = '#292524';
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
