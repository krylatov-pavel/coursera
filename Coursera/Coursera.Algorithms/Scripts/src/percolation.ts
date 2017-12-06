interface Point {
    x: number,
    y: number
}

interface Cell {
    row: number,
    col: number
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

interface UF {
    connected(a: number, b: number): boolean;
    connect(a: number, b: number): void;
}

class WeightedQuickUnionUF implements UF {
    public count: number;
    private nodes: number[];
    private sizes: number[];

    constructor(count: number) {
        this.count = count;
        this.nodes = Array(count).fill(0).map(function (e, i) { return i });
        this.sizes = Array(count).fill(1);
    }

    connected(a: number, b: number): boolean {
        let rootA = this.root(a);
        let rootB = this.root(b);

        return rootA == rootB;
    }

    connect(a: number, b: number): void {
        let rootA = this.root(a);
        let rootB = this.root(b);

        if (rootA == rootB) return;

        if (this.sizes[rootA] > this.sizes[rootB]) {
            this.nodes[rootB] = rootA;
            this.sizes[rootA] += this.sizes[rootB];
        } else {
            this.nodes[rootA] = rootB;
            this.sizes[rootB] += this.sizes[rootA];
        }
    }

    private root(node: number): number {
        if (this.nodes[node] !== node) {
            return this.root(this.nodes[node]);
        } else {
            return node;
        }
    }
}

class Percolation {
    private n: number;
    private grid: boolean[][];
    private model: UF;
    private startIndex: number;
    private endIndex: number;

    constructor(n: number) {
        this.n = n;
        this.grid = Array(n).fill(Array(n).fill(false));
        this.model = new WeightedQuickUnionUF(n * n + 2); //add 2 virtual nodes
        this.startIndex = n * n;
        this.endIndex = this.startIndex + 1;
        for (let i = 0; i < n; i++) {
            this.model.connect(this.startIndex, i);
            this.model.connect(this.endIndex, n * (n - 1) + i);
        }
    }

    public open(row: number, col: number): void {
        this.grid[row][col] = true;

        let indexA: number = this.getIndex(row, col);

        //connect 
    }

    //public boolean isOpen(int row, int col)  // is site (row, col) open?
    //public boolean isFull(int row, int col)  // is site (row, col) full?
    //public int numberOfOpenSites()       // number of open sites
    //public boolean percolates()              // does the system percolate?

    private getIndex(row: number, col: number) {
        return row * this.n + col;
    }

    private getNeighbours(row: number, col: number): Cell[] {
        let neighbours: Cell[];

        if (row > 1) neighbours.push({ row: row - 1, col: col });
        if (row < this.n - 1) neighbours.push({ row: row + 1, col: col });
        if (col > 1) neighbours.push({ row: row, col: col - 1 });
        if (col < this.n - 1) neighbours.push({ row: row, col: col + 1 });

        return neighbours;
    }
}

$(document).ready(function () {
    //let size: number = 50;
    //let visualizer: Visualiser = new Visualiser(size, 500);
    //let model: ModelRandomizer = new ModelRandomizer(size);

    //let openCell = function (): void {
    //    if (model.hasClosedCells()) {
    //        visualizer.open(model.next());
    //        setTimeout(openCell, 10);
    //    }
    //    else {
    //        console.log("all cells are opened");
    //    }
    //}

    //openCell();
});