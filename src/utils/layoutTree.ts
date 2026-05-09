import { Edge, Node } from "reactflow";

const NODE_WIDTH = 120;
const LEVEL_HEIGHT = 140;
const HORIZONTAL_SPACING = 50;

type TreeNode = {
  id: string;
  label?: string;
  children?: TreeNode[];
};

type LayoutResult = {
  nodes: Node[];
  edges: Edge[];
  width: number;
  centerX: number;
};

export function layoutTree(
  tree: TreeNode,
  collapsed: Record<string, boolean>
): LayoutResult {

  function dfs(
    node: TreeNode,
    depth: number,
    startX: number
  ): LayoutResult {

    const children =
      collapsed[node.id] ? [] : node.children || [];

    if (children.length === 0) {

      return {
        nodes: [
          {
            id: node.id,
            position: {
              x: startX,
              y: depth * LEVEL_HEIGHT,
            },
            data: {
              label: node.label ?? node.id,
              hasChildren:
                (node.children?.length || 0) > 0,
            },
            type: "treeNode",
          },
        ],
        edges: [],
        width: NODE_WIDTH,
        centerX: startX,
      };
    }

    let currentX = startX;

    let allNodes: Node[] = [];
    let allEdges: Edge[] = [];

    const childCenters: number[] = [];

    for (const child of children) {

      const childLayout = dfs(
        child,
        depth + 1,
        currentX
      );

      allNodes.push(...childLayout.nodes);
      allEdges.push(...childLayout.edges);

      allEdges.push({
        id: `${node.id}-${child.id}`,
        source: node.id,
        target: child.id,
      });

      childCenters.push(childLayout.centerX);

      currentX +=
        childLayout.width +
        HORIZONTAL_SPACING;
    }

    const totalWidth = currentX - startX;

    const parentX =
      (childCenters[0] +
        childCenters[childCenters.length - 1]) / 2;

    allNodes.push({
      id: node.id,
      position: {
        x: parentX,
        y: depth * LEVEL_HEIGHT,
      },
      data: {
        label: node.label ?? node.id,
        hasChildren:
          (node.children?.length || 0) > 0,
      },
      type: "treeNode",
    });

    return {
      nodes: allNodes,
      edges: allEdges,
      width: totalWidth,
      centerX: parentX,
    };
  }

  return dfs(tree, 0, 0);
}