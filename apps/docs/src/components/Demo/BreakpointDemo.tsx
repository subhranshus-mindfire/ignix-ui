import React from "react";
import { Breakpoint } from "@site/src/components/UI/breakpoint";

const BreakpointDemo = () => {
  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-bold mb-2">Breakpoint Demo</h3>
        <Breakpoint show="mobile">
          <p className="text-sm text-blue-600">This content is visible only on mobile devices.</p>
        </Breakpoint>
        <Breakpoint hide="desktop">
          <p className="text-sm text-red-600">This content is hidden on desktop devices.</p>
        </Breakpoint>
        <Breakpoint from="tablet" to="desktop">
          <p className="text-sm text-green-600">This content is visible from tablet to desktop.</p>
        </Breakpoint>
      </div>
    </div>
  );
};

export default BreakpointDemo;