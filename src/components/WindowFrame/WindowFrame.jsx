// Usage:
// <WindowFrame>
//   <p>Your content here</p>
// </WindowFrame>

export default function WindowFrame({ className, children }) {
  return (
    <div className={className}
      style={{
        position: "relative",
        width: "98%",
        border: "2px solid #111",
        borderRadius: 14,
        boxSizing: "border-box",
        backgroundColor: "#f5f5f5",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        paddingTop: 32,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 30,
      }}
    >
      {/* Traffic light dots */}
      <div
        style={{
          position: "absolute",
          top: 14,
          left: 14,
          display: "flex",
          gap: 8,
        }}
      >
        <div style={{ ...dot, background: "transparent", border: "2px solid #111" }} />
        <div style={{ ...dot, background: "#e8d56b", border: "2px solid #c9b840" }} />
        <div style={{ ...dot, background: "#c8a0d8", border: "2px solid #a878c0" }} />
      </div>

      {/* Resize dots */}
      <div
        style={{
          position: "absolute",
          bottom: 14,
          right: 14,
          display: "grid",
          gridTemplateColumns: "repeat(4, 5px)",
          gap: 4,
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#333",
              opacity: 0.4,
            }}
          />
        ))}
      </div>

      {children}
    </div>
  );
}

const dot = {
  width: 22,
  height: 22,
  borderRadius: "50%",
};