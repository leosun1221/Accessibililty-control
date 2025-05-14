import React, { useState } from "react";

function ColorContrastChecker() {
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");

  const getLuminance = (color) => {
    const rgb = color
      .replace("#", "")
      .match(/.{2}/g)
      .map((hex) => parseInt(hex, 16) / 255);
    return rgb.map((val) =>
      val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
    );
  };

  const calculateContrast = (textColor, bgColor) => {
    const [r1, g1, b1] = getLuminance(textColor);
    const [r2, g2, b2] = getLuminance(bgColor);
    const lum1 = 0.2126 * r1 + 0.7152 * g1 + 0.0722 * b1;
    const lum2 = 0.2126 * r2 + 0.7152 * g2 + 0.0722 * b2;
    const contrast =
      lum1 > lum2 ? (lum1 + 0.05) / (lum2 + 0.05) : (lum2 + 0.05) / (lum1 + 0.05);
    return contrast.toFixed(2);
  };

  const contrastRatio = calculateContrast(textColor, bgColor);
  const isAccessible = contrastRatio >= 4.5 ? "Pass" : "Fail";

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h3>Color Contrast Checker</h3>
      <div>
        <label>Text Color: </label>
        <input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
        />
      </div>
      <div>
        <label>Background Color: </label>
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />
      </div>
      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: bgColor,
          color: textColor,
        }}
      >
        Sample Text
      </div>
      <p>Contrast Ratio: {contrastRatio}</p>
      <p>Status: {isAccessible}</p>
    </div>
  );
}

export default ColorContrastChecker;
