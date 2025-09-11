import React, { useState } from "react";
import Masonry from "@site/src/components/UI/masonry";
import VariantSelector from "./VariantSelector";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";

const MasonryDemo = () => {
  const [columns, setColumns] = useState(3);
  const [mobile, setMobile] = useState(1);
  const [gap, setGap] = useState("normal");
  const [balanced, setBalanced] = useState(false);
  const [animation, setAnimation] = useState("none");

  const gaps = ["none", "small", "normal", "large"];
  const animations = ["none", "fade-in", "scale-in", "slide-up"];
  const columnOptions = ["1", "2", "3", "4"];

  const colors = [
    "bg-blue-600",
    "bg-blue-600",
    "bg-blue-600",
    "bg-blue-600",
    "bg-blue-600",
    "bg-blue-600",
  ];

  const codeString = `
<Masonry 
  columns={${columns}}
  mobile={${mobile}}
  gap="${gap}"
  balanced={${balanced}}
  animation="${animation}"
>
  {items.map((item, i) => (
    <div key={i} className="bg-gray-200 p-6 rounded-lg shadow text-center">
      Item {i + 1}
    </div>
  ))}
</Masonry>
`;

  return (
    <div className="space-y-6 mb-8">
      {/* Variant selectors */}
      <div className="flex flex-wrap gap-4 justify-start sm:justify-end">
        {/* Gap */}
        <div className="space-y-2">
          <VariantSelector
            variants={gaps}
            selectedVariant={gap}
            onSelectVariant={setGap}
            type="Gap"
          />
        </div>

        {/* Animation */}
        <div className="space-y-2">
          <VariantSelector
            variants={animations}
            selectedVariant={animation}
            onSelectVariant={setAnimation}
            type="Animation"
          />
        </div>

        {/* Balanced */}
        <div className="space-y-2">
          <VariantSelector
            variants={["true", "false"]}
            selectedVariant={String(balanced)}
            onSelectVariant={(val) => setBalanced(val === "true")}
            type="Balanced"
          />
        </div>

        {/* Mobile Columns */}
        <div className="space-y-2">
          <VariantSelector
            variants={columnOptions}
            selectedVariant={String(mobile)}
            onSelectVariant={(val) => setMobile(Number(val))}
            type="Mobile Columns"
          />
        </div>

        {/* Desktop Columns */}
        <div className="space-y-2">
          <VariantSelector
            variants={columnOptions}
            selectedVariant={String(columns)}
            onSelectVariant={(val) => setColumns(Number(val))}
            type="Desktop Columns"
          />
        </div>
      </div>

      {/* Tabs for preview/code */}
      <Tabs>
        <TabItem value="preview" label="Preview">
          <div className="border p-6 rounded-lg">
            <Masonry
              columns={columns}
              mobile={mobile}
              gap={gap as "none" | "small" | "normal" | "large"}
              balanced={balanced}
              animation={animation as "none" | "fade-in" | "scale-in" | "slide-up"}
            >
              {colors.map((color, i) => (
                <div
                  key={i}
                  className={`${color} text-white p-6 rounded-lg shadow-md text-center`}
                >
                  Item {i + 1}
                </div>
              ))}
            </Masonry>
          </div>
        </TabItem>

        <TabItem value="code" label="Code">
          <div className="mt-4">
            <CodeBlock language="tsx" className="text-sm">
              {codeString}
            </CodeBlock>
          </div>
        </TabItem>
      </Tabs>
    </div>
  );
};

export default MasonryDemo;