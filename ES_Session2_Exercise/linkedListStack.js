class Node 
{
    constructor(value)
    {
        this.value = value;
        this.next = null;
    }
}

class LinkedListStack {
    constructor() {
        this.root = null;
        this.size = 0;
    }

    addLast(value) {
        const node = new Node(value);
        if (this.root) {
            let currentNode = this.root;
            while (currentNode && currentNode.next) {
                currentNode = currentNode.next;
            }
            currentNode.next = node;
        }
        else {
            this.root = node;
        }
        this.size++;
        // console.log(value);
    }

    getlength() {
        return this.size;
    }

    removelast() {
        let val = null;
        if (this.root) {
            let currentNode = this.root;
            while (currentNode.next.next) {
                currentNode = currentNode.next;
            }
            val = currentNode.next.value;
            currentNode.next = null;
            this.size--;
            return val;
        }
        else {
            return -1;
        }
        

    }
    printList() {
        var curr = this.root;
        var str = "";
        while (curr) {
            str += curr.value + " ";
            curr = curr.next;
        }
        console.log(str);
    }
  
}

var ls = new LinkedListStack();
ls.addLast(60);
ls.addLast(70);
ls.addLast(80);
ls.addLast(90);
ls.addLast(100);
ls.printList();

console.log(ls.getlength());
console.log(ls.removelast());
console.log(ls.removelast());
console.log(ls.getlength());
ls.printList();

ls.addLast(110);
ls.addLast(120);
ls.printList();


