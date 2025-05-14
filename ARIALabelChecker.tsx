import React, { useState, useEffect } from "react";

function ARIALabelChecker() {
  const [missingAriaElements, setMissingAriaElements] = useState([]);

  useEffect(() => {
    const elements = document.querySelectorAll("button, input, a");
    const missingAria = [];

    elements.forEach((el) => {
      if (
        el.tagName === "BUTTON" ||
        (el.tagName === "A" && !el.hasAttribute("aria-label") && !el.textContent)
      ) {
        missingAria.push(el);
      }
    });

    setMissingAriaElements(missingAria);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h3>ARIA Label Checker</h3>
      {missingAriaElements.length > 0 ? (
        <ul>
          {missingAriaElements.map((el, index) => (
            <li key={index}>
              Missing ARIA Label on &lt;{el.tagName.toLowerCase()}&gt;
            </li>
          ))}
        </ul>
      ) : (
        <p>All elements have proper ARIA labels.</p>
      )}
    </div>
  );
}

export default ARIALabelChecker;
