import { useMemo, useState, useEffect } from "react";

import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";

import "reactflow/dist/style.css";

import { treeData } from "./data/treeData";
import { layoutTree } from "./utils/layoutTree";

import TreeNode from "./components/TreeNode";

const nodeTypes = {
  treeNode: TreeNode,
};

function FlowInner() {
  const [collapsed, setCollapsed] =
    useState<Record<string, boolean>>({});

  const { fitView } = useReactFlow();

  const { nodes, edges } = useMemo(() => {
    const result = layoutTree(treeData, collapsed);

    // Mark root node and wire up toggle
    result.nodes.forEach((node) => {
      node.data = {
        ...node.data,
        collapsed: collapsed[node.id],
        hasParent: node.id !== treeData.id,
        toggle: () => {
          setCollapsed((prev) => ({
            ...prev,
            [node.id]: !prev[node.id],
          }));
        },
      };
    });

    return result;
  }, [collapsed]);

  // Re-center the viewport every time the tree layout changes
  useEffect(() => {
    const timer = setTimeout(() => {
      fitView({ duration: 300, padding: 0.2 });
    }, 50);
    return () => clearTimeout(timer);
  }, [nodes, fitView]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      nodesConnectable={false}
      proOptions={{ hideAttribution: true }}
    >
      <Background
        variant={BackgroundVariant.Dots}
        gap={28}
        size={1.2}
        color="rgba(148, 163, 184, 0.15)"
      />
      <Controls showInteractive={false} />
    </ReactFlow>
  );
}

export default function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#080c14",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Header ── */}
      <header
        style={{
          padding: "14px 28px",
          borderBottom: "1px solid rgba(79, 255, 176, 0.12)",
          background: "rgba(10, 14, 24, 0.9)",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "8px",
            background: "rgba(79, 255, 176, 0.12)",
            border: "1px solid rgba(79, 255, 176, 0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <circle cx="8" cy="2.5" r="1.8" fill="#4fffb0" />
            <circle cx="3" cy="12" r="1.8" fill="#4fffb0" opacity="0.7" />
            <circle cx="13" cy="12" r="1.8" fill="#4fffb0" opacity="0.7" />
            <line
              x1="8" y1="4.3" x2="3" y2="10.2"
              stroke="#4fffb0" strokeWidth="1.2" strokeOpacity="0.5"
            />
            <line
              x1="8" y1="4.3" x2="13" y2="10.2"
              stroke="#4fffb0" strokeWidth="1.2" strokeOpacity="0.5"
            />
          </svg>
        </div>

        {/* Title */}
        <div>
          <h1
            style={{
              margin: 0,
              fontFamily: "'Exo 2', sans-serif",
              fontSize: "16px",
              fontWeight: 600,
              color: "#f1f5f9",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            Tree Visualizer
          </h1>

        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Legend */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            fontFamily: "'Fira Code', monospace",
            fontSize: "11px",
            color: "#475569",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "rgba(79,255,176,0.18)",
                border: "1px solid rgba(79,255,176,0.7)",
                fontSize: "11px",
                color: "#4fffb0",
                fontWeight: 700,
              }}
            >
              +
            </span>
            expand
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.18)",
                fontSize: "12px",
                color: "#64748b",
                fontWeight: 700,
              }}
            >
              −
            </span>
            collapse
          </span>
        </div>
      </header>

      {/* ── Flow canvas ── */}
      <div style={{ flex: 1, position: "relative" }}>
        <ReactFlowProvider>
          <FlowInner />
        </ReactFlowProvider>
      </div>
    </div>
  );
}