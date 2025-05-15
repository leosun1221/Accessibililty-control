function captureUIScreenshot(element) {
  const rect = element.getBoundingClientRect();
  const canvas = document.createElement("canvas");
  canvas.width = rect.width;
  canvas.height = rect.height;
  const ctx = canvas.getContext("2d");

  // Draw UI elements onto the canvas
  ctx.fillStyle = window.getComputedStyle(element).backgroundColor;
  ctx.fillRect(0, 0, rect.width, rect.height);

  // Clone each child element
  element.querySelectorAll("*").forEach((child) => {
    const childRect = child.getBoundingClientRect();
    if (childRect.width > 0 && childRect.height > 0) {
      ctx.font = getComputedStyle(child).font;
      ctx.fillStyle = getComputedStyle(child).color;
      ctx.fillText(child.innerText || "", childRect.left - rect.left, childRect.top - rect.top);
    }
  });

  return canvas;
}

async function compareDesignWithUI(designImageSrc, uiElement) {
  const designImage = new Image();
  designImage.src = designImageSrc;
  await new Promise((resolve) => (designImage.onload = resolve));

  const uiCanvas = captureUIScreenshot(uiElement);
  const diffCanvas = document.createElement("canvas");
  diffCanvas.width = uiCanvas.width;
  diffCanvas.height = uiCanvas.height;
  const diffContext = diffCanvas.getContext("2d");

  // Draw UI and Design on diff canvas
  diffContext.drawImage(uiCanvas, 0, 0);
  diffContext.globalCompositeOperation = "difference";
  diffContext.drawImage(designImage, 0, 0, uiCanvas.width, uiCanvas.height);

  document.body.appendChild(diffCanvas);
}
