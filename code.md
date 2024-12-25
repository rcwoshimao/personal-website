
/* Mid level*/ 
procedure GraphSearch(G:graph, s:vertex): 
    Initialize X = empty, F = {s}. U = V - f
    While F is not empty: 
        Pick vertex w in F 
        for each outgoing neighbor y of w(for every (w,y) in E): 
            If y not in X OR f: 
                Move y from U to F
        Move w from F to X 
    Return X 

X: explored. A set, array of booleans of vertices that have been explored. 
F: frontier. A set for enqueued vertices for processing in order. 
U: a set, array of booleans of unexplored vertices. 
G: a graph in adjacency list form 
    - For each vertex v, loop through its neighbors takes O(deg(v) +1 )



procedure explore(G = (V,E), s):
    visited(s)=true
    previsit(s)
    for each edge(s,u):
        if not visited(u):
            prev(u) = s
                explore(G,u)
    postvisit(s)

procedure previsit(v): 
    prev(v) = clock 
    clock++ 

procedure postvisit(v): 
    post(v) = clock 
    clock++


procedure DFS(G): 
    cc = 0 
    clock = 1
    for each vertex v: 
        visited(v) = false 
    for each vertex v: 
        if not visited(v): 
            c++
            explore(G,v) 




procedure BFS(G,s): 
    Input: Graph G = (V,E), directed OR undirected, vertex s in V. 
    Output: for all u reachable from s, dist(u) is the distance from s to u. for all u not reachable from s, dist(u) = inf. 
    for each vertex u in V: 
        dist(u) = inf
    dist(s) = 0 
    Q = [s] // enqueue s 
    while Q: 
        u = Q.pop
        for all edges (u,v) in E: 
            if dist(v) = inf: 
                Q.enqueue(v)
                dist(v) = dist(u) + 1 



procedure dikstras(G: directed wieghted graph, s: vertex): 
    X = {}, pq(F) = {s}
    for all v: 
        dist(v) = inf 
        dist(s) = 0 
    while pq: 
        v = pq.peek //min pq, pop lowest dist
    for each neighbor u of v: 
        pq.enqueue(u) //move u to F. 
        dist(u) = dist(v) + len(u,v)
        pq.pop //move v from F to X. 

        