//Allan Chaclán - 1502023
//Miguel Macario - 1597421
//José Castañeda - 1534422


class Node23 {
    values: number[];
    children: Node23[];

    constructor(value?: number) {
        this.values = value !== undefined ? [value] : [];
        this.children = [];
    }

    isLeaf(): boolean {
        return this.children.length === 0;
    }

    isFull(): boolean {
        return this.values.length === 2;
    }
}

class Tree23 {
    root: Node23 | null = null;

    insert(value: number): void {
        if (!Number.isInteger(value) || value < 0) {
            throw new Error("Solo se permiten números naturales.");
        }

        if (!this.root) {
            this.root = new Node23(value);
        } else {
            const splitInfo = this._insertRecursive(this.root, value);
            if (splitInfo) {
                // Se crea una nueva raíz si el nodo original se dividió
                const newRoot = new Node23(splitInfo.newValue);
                newRoot.children = [splitInfo.left, splitInfo.right];
                this.root = newRoot;
            }
        }
    }

    private _insertRecursive(node: Node23, value: number): { left: Node23, newValue: number, right: Node23 } | null {
        if (node.isLeaf()) {
            return this._insertIntoLeaf(node, value);
        } else {
            let childIndex = 0;
            while (childIndex < node.values.length && value > node.values[childIndex]) {
                childIndex++;
            }

            const splitInfo = this._insertRecursive(node.children[childIndex], value);
            if (splitInfo) {
                return this._handleSplit(node, splitInfo.left, splitInfo.newValue, splitInfo.right);
            }
            return null;
        }
    }

    private _insertIntoLeaf(node: Node23, value: number): { left: Node23, newValue: number, right: Node23 } | null {
        if (node.values.includes(value)) {
            return null; // Evita duplicados
        }

        node.values.push(value);
        node.values.sort((a, b) => a - b);

        if (node.isFull()) {
            return this._splitNode(node);
        }
        return null;
    }

    private _splitNode(node: Node23): { left: Node23, newValue: number, right: Node23 } {
        const left = new Node23(node.values[0]);
        const right = new Node23(node.values[2]);
        
        if (node.children.length > 0) {
            left.children = node.children.slice(0, 2);
            right.children = node.children.slice(2);
        }

        return { left, newValue: node.values[1], right };
    }

    private _handleSplit(parent: Node23, left: Node23, newValue: number, right: Node23): { left: Node23, newValue: number, right: Node23 } | null {
        parent.values.push(newValue);
        parent.values.sort((a, b) => a - b);
        
        const index = parent.values.indexOf(newValue);
        parent.children = [
            ...parent.children.slice(0, index),
            left,
            right,
            ...parent.children.slice(index + 1)
        ];

        if (parent.isFull()) {
            return this._splitNode(parent);
        }
        return null;
    }

    printTree(node: Node23 | null = this.root, level: number = 0): void {
        if (!node) return;

        console.log(" ".repeat(level * 4) + `Nodo: ${node.values}`);
        for (const child of node.children) {
            this.printTree(child, level + 1);
        }
    }
}

const tree = new Tree23();


"//José Castañeda - 1534422)"
console.log("Allan Chaclán - 1502023\nMiguel Macario - 1597421\nJosé Castañeda - 1534422\n")


const numbers = [8, 5, 15, 3, 10, 12, 18, 7, 6];

console.log("Insertando valores en el árbol 2-3:");
numbers.forEach(num => {
    console.log(`Insertando ${num}...`);
    tree.insert(num);
    tree.printTree();  // Imprimir el árbol después de cada inserción
    console.log("----------");
});

console.log("Árbol 2-3 final después de todas las inserciones:");
tree.printTree();

