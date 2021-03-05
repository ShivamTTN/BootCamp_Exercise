
class Node 
{
    constructor(value)
    {
        this.value = value;
        this.next = null;
    }
}

class LinkedList{
    constructor(){
        this.root = null;
        this.size = 0;
    }

    addLast(value){
        const node = new Node(value);
        if(this.root)
        {
            let currentNode = this.root;
            while(currentNode && currentNode.next){
                currentNode = currentNode.next;
            }
            currentNode.next =  node;
        }
        else{
            this.root = node;
        }
        this.size++;
    }

    getlength()
    {
        return this.size;
    }

    getFirst()
    {
        return this.root.value;
    }

    getLast()
    {
        if(this.root)
        {
            let currentNode = this.root;
            while(currentNode && currentNode.next){
                currentNode = currentNode.next;
            }
            return currentNode.value;
        }
        else{
            return this.getFirst();
        }
    }
}

var ll = new LinkedList();
ll.addLast(10);
ll.addLast(20);
ll.addLast(30);
ll.addLast(40);
ll.addLast(50);
console.log(ll.getlength());
console.log(ll.getFirst());
console.log(ll.getLast());

