import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function AccessibilityChecker() {
  const [axeResults, setAxeResults] = useState([]);

  const runAxeTest = async () => {
    const { axe } = await import("@axe-core/react");
    const results = await axe.run(document.body);
    setAxeResults(results.violations);
  };

  return (
    <Card className="mt-4 p-4">
      <h2 className="text-xl font-bold mb-2">Accessibility Checker</h2>
      <Button onClick={runAxeTest}>Run Accessibility Check</Button>
      
      <div className="mt-4 space-y-2">
        {axeResults.length === 0 ? (
          <p>No accessibility issues detected.</p>
        ) : (
          axeResults.map((violation, index) => (
            <div key={index} className="bg-red-100 p-2 rounded-md">
              <h3 className="font-semibold text-red-600">{violation.description}</h3>
              <p>{violation.help}</p>
              <ul className="list-disc ml-4">
                {violation.nodes.map((node, i) => (
                  <li key={i}>
                    <strong>Element:</strong> {node.html}
                    <br />
                    <strong>Fix:</strong> {node.failureSummary}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}

export default AccessibilityChecker;
