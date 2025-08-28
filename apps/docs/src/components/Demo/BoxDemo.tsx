import React, { useState } from "react";
import {Box} from "@site/src/components/UI/box";

const widthOptions = ["auto", "small", "normal", "large", "full"];
const heightOptions = ["auto", "small", "normal", "large", "screen"];
const paddingOptions = ["none", "sm", "normal", "lg"];
const backgroundOptions = ["white", "primary", "secondary", "muted"];
const roundedOptions = ["none", "sm", "md", "lg", "full"];
const shadowOptions = ["none", "subtle", "medium", "strong"];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const BoxDemo = () => {
  const [width, setWidth] = useState("normal");
  const [height, setHeight] = useState("auto");
  const [padding, setPadding] = useState("normal");
  const [background, setBackground] = useState("white");
  const [rounded, setRounded] = useState("md");
  const [shadow, setShadow] = useState("subtle");

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <table style={{ width: "100%", marginBottom: 16, borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Value</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>width</td>
              <td>{width}</td>
              <td>
                <select value={width} onChange={e => setWidth(e.target.value)}>
                  {widthOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </td>
            </tr>
            <tr>
              <td>height</td>
              <td>{height}</td>
              <td>
                <select value={height} onChange={e => setHeight(e.target.value)}>
                  {heightOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </td>
            </tr>
            <tr>
              <td>padding</td>
              <td>{padding}</td>
              <td>
                <select value={padding} onChange={e => setPadding(e.target.value)}>
                  {paddingOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </td>
            </tr>
            <tr>
              <td>background</td>
              <td>{background}</td>
              <td>
                <select value={background} onChange={e => setBackground(e.target.value)}>
                  {backgroundOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </td>
            </tr>
            <tr>
              <td>rounded</td>
              <td>{rounded}</td>
              <td>
                <select value={rounded} onChange={e => setRounded(e.target.value)}>
                  {roundedOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </td>
            </tr>
            <tr>
              <td>shadow</td>
              <td>{shadow}</td>
              <td>
                <select value={shadow} onChange={e => setShadow(e.target.value)}>
                  {shadowOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Box
        width={width}
        height={height}
        padding={padding as "normal" | "none" | "sm" | "lg"}
        background={background}
        rounded={rounded as "none" | "sm" | "md" | "lg" | "full"}
        shadow={shadow as "none" | "subtle" | "medium" | "strong"}
      >
        <h2>Box Component Demo</h2>
        <p>
          width: <b>{width}</b>, height: <b>{height}</b>, padding: <b>{padding}</b>, background: <b>{background}</b>, rounded: <b>{rounded}</b>, shadow: <b>{shadow}</b>
        </p>
      </Box>
    </div>
  );
};

export default BoxDemo;