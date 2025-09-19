import React, { useState } from "react";
import { LazyLoad } from "../UI/lazyload";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";

const LazyloadDemo: React.FC = () => {
  const [threshold, setThreshold] = useState("100px");
  const [animation, setAnimation] = useState<"fade" | "slide" | "none">("fade");
  const [once, setOnce] = useState(true);

  const codeString = `
<LazyLoad 
  threshold="${threshold}" 
  animation="${animation}" 
  once={${once}}
  placeholder={<div style={{ height: "200px", background: "#eee" }}>Loading...</div>}
>
  <div style={{
    height: "200px", 
    background: "#ccc", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center"
  }}>
    Loaded Content
  </div>
</LazyLoad>
`;

  return (
    <div className="space-y-6 mb-8">
      {/* Variant selectors */}
      <div className="flex flex-wrap gap-4 justify-start sm:justify-end">
        {/* Threshold */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Threshold</label>
          <input
            type="text"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          />
        </div>

        {/* Animation */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Animation</label>
          <select
            value={animation}
            onChange={(e) => setAnimation(e.target.value as "fade" | "slide" | "none")}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="fade">Fade</option>
            <option value="slide">Slide</option>
            <option value="none">None</option>
          </select>
        </div>

        {/* Once */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Load Once</label>
          <input
            type="checkbox"
            checked={once}
            onChange={(e) => setOnce(e.target.checked)}
            className="border rounded px-2 py-1 text-sm"
          />
        </div>
      </div>

      {/* Tabs for preview/code */}
      <Tabs>
        <TabItem value="preview" label="Preview">
          <div className="border p-6 rounded-lg">
            <LazyLoad
              threshold={threshold}
              animation={animation}
              once={once}
              placeholder={<div style={{ height: "200px", background: "#eee" }}>Loading...</div>}
            >
              <div
                style={{
                  height: "200px",
                  background: "#ccc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Loaded Content
              </div>
            </LazyLoad>
          </div>
        </TabItem>

        <TabItem value="code" label="Code">
          <div className="mt-4">
            <CodeBlock language="tsx" className="text-sm">
              {codeString.trim()}
            </CodeBlock>
          </div>
        </TabItem>
      </Tabs>
    </div>
  );
};

export default LazyloadDemo;