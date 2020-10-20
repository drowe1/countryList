function printPath(){
    code = document.getElementById("countryCode").value
    var s = ""
    var l = getPath(code)
    l.reverse()
    for(var i = 0; i < l.length; i++){
        s += l[i]+"<br>"
    }
    document.getElementById("result").innerHTML = s
}

function getPath(endCountryCode){
    m = new Map()
    gr = new Graph(m)
    p = new Problem(endCountryCode, gr)
    n = bfs(p)
    return n.path()
}

class Queue{
    elements = []
    
    enqueue(e){
        this.elements.push(e)
    }

    dequeue(){
        return this.elements.shift()
    }

    isEmpty(){
        return this.elements.length == 0
    }

    toString(){
        let s = ""
        var i;
        for(i = 0; i < this.elements.length; i++){
            s += this.elements[i] + ", "
        }
        return s
    }
}

function includes(arr, value){
    var i
    for(i = 0; i < arr.length; i++){
        if(arr[i] == value){
            return true
        }
    }
    return false
}

class Graph{
    constructor(map){
        self.map = map
        map.set("USA", ["CAN", "MEX"])
        map.set("CAN", ["USA"])
        map.set("MEX", ["USA", "BLZ", "GTM"])
        map.set("BLZ", ["MEX", "GTM"])
        map.set("GTM", ["MEX", "BLZ", "SLV", "HND"])
        map.set("SLV", ["GTM", "HND"])
        map.set("HND", ["SLV", "GTM", "NIC"])
        map.set("NIC", ["HND", "CRI"])
        map.set("CRI", ["NIC", "PAN"])
        map.set("PAN", ["CRI"])
    }

    retrieve(key){
        return self.map.get(key)
    }
}

class Problem{
    constructor(goal, graph){
        this.initial = "USA"
        this.goal = goal
        this.graph = graph
    }

    getGraph(){
        return this.graph
    }
}

class Node{
    constructor(state, parent){
        this.state = state
        this.parent = parent
    }

    path(){
        let l = new Array()
        var x = this
        while(x.parent != null){
            l.push(x.state)
            x = x.parent
        }
        l.push("USA")
        return l
    }

    expand(problem){
        let g = problem.getGraph()
        return g.retrieve(this.state)
    }
}

function bfs(problem){
    //Perform a breadth-first search to find the optimal path
    let closed = new Array() //Array of states that have been closed
    let fringe = new Queue() //Queue of Nodes
    fringe.enqueue(new Node(problem.initial, null))
    while(!fringe.isEmpty()){
        let node = fringe.dequeue()
        if(problem.goal == node.state){
            return node
        }
        if(!includes(closed, node.state)){
            closed.push(node.state)
            var i
            let l = node.expand(problem)
            for(i = 0; i < l.length; i++){
                fringe.enqueue(new Node(l[i], node))
            }
        }
    }
    return null
}