import * as Graph from '../Components/Graph';
import minHeap from './MinHeap';

/* Shortest path calculation using Dijkstra's */
const Dijkstra = (source, destination) => {
    const nodes_in_visited_order = [];
    const heap = new minHeap();
    Graph.graph[source.rowId][source.colId].distance = 0;
    Graph.markNodeVisited(source);
    heap.push({
        value: 0,
        node: source,
    });

    while (!heap.empty()) {
        const { value: distance, node: current } = heap.pop();
        if (distance > Graph.getDistance(current)) continue;

        for (let i = 0; i < Graph.neighbour.length; ++i) {
            const rowId = current.rowId + Graph.neighbour[i].rowId;
            const colId = current.colId + Graph.neighbour[i].colId;
            const nextNode = Graph.Node(rowId, colId);

            if (Graph.isValidNode(nextNode) && !Graph.isVisitedNode(nextNode) &&
                !Graph.isObstacle(nextNode) && Graph.isBetterPath(current, nextNode)) {
                Graph.markNodeVisited(nextNode);
                Graph.updateDistance(current, nextNode);
                Graph.updateParent(current, nextNode);
                nodes_in_visited_order.push(nextNode);
                heap.push({
                    value: Graph.getDistance(nextNode),
                    node: nextNode,
                });
            }
        }
    }

    Graph.resetVisitedGraph();
    return nodes_in_visited_order;
}

export default Dijkstra;