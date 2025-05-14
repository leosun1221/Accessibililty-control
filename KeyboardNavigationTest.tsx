import React, { useEffect } from "react";

function KeyboardNavigationTester() {
  useEffect(() => {
    const focusableElements = document.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach((el) => {
      el.addEventListener("focus", () => {
        el.style.outline = "2px solid #4CAF50";
      });

      el.addEventListener("blur", () => {
        el.style.outline = "none";
      });
    });

    return () => {
      focusableElements.forEach((el) => {
        el.style.outline = "none";
      });
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h3>Keyboard Navigation Tester</h3>
      <p>Try navigating with Tab key.</p>
      <button>Button 1</button>
      <input type="text" placeholder="Input field" />
      <a href="#">Link 1</a>
    </div>
  );
}

export default KeyboardNavigationTester;
