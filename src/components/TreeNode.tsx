
import { memo, useState } from "react";
import { Handle, Position } from "reactflow";

export default memo(function TreeNode({ data }: any) {
  const [hovered, setHovered] = useState(false);

  const isRoot = !data.hasParent;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "10px 18px 12px",
        borderRadius: "10px",
        background: hovered
          ? "rgba(79, 255, 176, 0.07)"
          : "rgba(255, 255, 255, 0.04)",
        border: `1px solid ${hovered
            ? "rgba(79, 255, 176, 0.55)"
            : isRoot
              ? "rgba(79, 255, 176, 0.3)"
              : "rgba(255, 255, 255, 0.1)"
          }`,
        backdropFilter: "blur(12px)",
        minWidth: "100px",
        textAlign: "center",
        cursor: "default",
        transition: "all 0.22s ease",
        boxShadow: hovered
          ? "0 0 24px rgba(79, 255, 176, 0.18), 0 4px 20px rgba(0,0,0,0.5)"
          : isRoot
            ? "0 0 14px rgba(79, 255, 176, 0.08), 0 4px 14px rgba(0,0,0,0.4)"
            : "0 4px 14px rgba(0,0,0,0.35)",
        position: "relative",
      }}
    >
      {/* Top handle – hidden for root (no parent) */}
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: "#4fffb0",
          border: "2px solid #080c14",
          width: 8,
          height: 8,
          opacity: isRoot ? 0 : 1,
          pointerEvents: "none",
        }}
      />

      {/* Label */}
      <div
        style={{
          fontFamily: "'Fira Code', monospace",
          fontSize: "13px",
          fontWeight: 500,
          color: hovered ? "#4fffb0" : "#cbd5e1",
          letterSpacing: "0.04em",
          transition: "color 0.2s",
          marginBottom: data.hasChildren ? "8px" : "0",
          userSelect: "none",
        }}
      >
        {data.label}
      </div>

      {/* Expand / Collapse toggle */}
      {data.hasChildren && (
        <button
          onClick={data.toggle}
          title={data.collapsed ? "Expand" : "Collapse"}
          style={{
            background: data.collapsed
              ? "rgba(79, 255, 176, 0.18)"
              : "rgba(255, 255, 255, 0.07)",
            border: `1px solid ${data.collapsed
                ? "rgba(79, 255, 176, 0.7)"
                : "rgba(255, 255, 255, 0.18)"
              }`,
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: data.collapsed ? "#4fffb0" : "#64748b",
            fontSize: "15px",
            fontWeight: 700,
            lineHeight: 1,
            transition: "all 0.2s",
            padding: 0,
            outline: "none",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform =
              "scale(1.2)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform =
              "scale(1)";
          }}
        >
          {data.collapsed ? "+" : "−"}
        </button>
      )}

      {/* Bottom handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: "#4fffb0",
          border: "2px solid #080c14",
          width: 8,
          height: 8,
        }}
      />
    </div>
  );
});

