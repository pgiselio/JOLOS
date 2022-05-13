import { ReactNode } from "react";

type LabelWithDataType = {
    label: string;
    icon?: string;
    data: ReactNode
}

export default function LabelWithData({ label, icon, data }: LabelWithDataType) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <i
        className={icon}
        style={{
          padding: "15px",
          fontSize: "20px",
          color: "var(--text-b)",
        }}
      ></i>
      <div>
        <span style={{ fontSize: 12, color: "var(--text-b)" }}>
            {label}
        </span>
        <h4 style={{lineHeight: "22px"}}>
          {data}
        </h4>
      </div>
    </div>
  );
}
