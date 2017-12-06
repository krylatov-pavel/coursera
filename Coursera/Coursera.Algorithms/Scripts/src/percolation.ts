interface Point {
    x: number,
    y: number
}

class Visualiser {
    private n: number;
    private cellSize: number;
    private context: CanvasRenderingContext2D;

    constructor(n: number, size: number) {
        this.n = n;
        if (size >= n) {
            this.cellSize = Math.floor(size / n);
        } else {
            this.cellSize = 1;
        }

        let canvasSize: number = n * this.cellSize;
        let canvas: HTMLCanvasElement = document.getElementsByTagName("canvas").item(0);
        canvas.width = canvasSize;
        canvas.height = canvasSize;

        this.context = canvas.getContext("2d")
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, canvas.width, canvas.height);
        this.context.fillStyle = "grey";
    }

    open(cell: number) {
        let point = {
            x: cell % this.n,
            y: Math.floor(cell / this.n)
        };

        this.context.fillRect(point.x * this.cellSize, point.y * this.cellSize, this.cellSize, this.cellSize)
    }

    fill(cells: number[]) {

    }
}

class ModelRandomizer {
    private n: number;
    private count: number;
    private cells: number[];
    public openCells: number = 0;

    constructor(n: number) {
        this.n = n;
        this.count = n * n;
        this.cells = Array.apply(null, { length: this.count }).map(Function.call, Number);

        //do Fisher–Yates shuffle
        for (let i = this.count - 1; i >= 1; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            if (j !== i) {
                let temp = this.cells[i];
                this.cells[i] = this.cells[j];
                this.cells[j] = temp;
            }
        }
    }

    hasClosedCells(): boolean {
        return this.openCells < this.count;
    }

    next(): number {
        this.openCells++;
        return this.cells[this.openCells - 1];
    }
}

$(document).ready(function () {
    let size: number = 20;
    let visualizer: Visualiser = new Visualiser(size, 100);
    let model: ModelRandomizer = new ModelRandomizer(size);

    let openCell = function (): void {
        if (model.hasClosedCells()) {
            visualizer.open(model.next());
            setTimeout(openCell, 10);
        }
        else {
            console.log("all cells are opened");
        }
    }

    openCell();
});