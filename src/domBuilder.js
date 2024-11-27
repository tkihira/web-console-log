const gradColor = "linear-gradient(135deg, rgba(240, 240, 240, 0.9), rgba(192, 192, 192, 0.9))";

const createIconDiv = () => {
    const iconDiv = document.createElement("div");
    iconDiv.style.position = "fixed";
    iconDiv.style.right = "10px";
    iconDiv.style.bottom = "10px";
    iconDiv.style.width = "30px";
    iconDiv.style.height = "30px";
    iconDiv.style.border = "2px solid #ccc";
    iconDiv.style.borderRadius = "50%";
    iconDiv.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    iconDiv.style.display = "flex";
    iconDiv.style.alignItems = "center";
    iconDiv.style.justifyContent = "center";
    iconDiv.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.1)"
    iconDiv.style.cursor = "pointer";
    iconDiv.style.opacity = 0.2;
    iconDiv.style.transition = "opacity 150ms ease-out";

    const iTopDiv = document.createElement("div");
    iconDiv.appendChild(iTopDiv);
    iTopDiv.style.position = "absolute";
    iTopDiv.style.background = gradColor;
    iTopDiv.style.width = "5px";
    iTopDiv.style.height = "5px";
    iTopDiv.style.borderRadius = "50%";
    iTopDiv.style.top = "5px";

    const iBottomDiv = document.createElement("div");
    iconDiv.appendChild(iBottomDiv);
    iBottomDiv.style.position = "absolute";
    iBottomDiv.style.background = gradColor;
    iBottomDiv.style.width = "5px";
    iBottomDiv.style.height = "13px";
    iBottomDiv.style.bottom = "5px";
    iBottomDiv.style.borderRadius = "2px";

    iconDiv.onmouseover = () => iconDiv.style.opacity = 1.0;
    iconDiv.onmouseout = () => iconDiv.style.opacity = 0.2;

    return iconDiv;
};

const createConsoleElements = () => {
    const consoleRootDiv = document.createElement("div");
    consoleRootDiv.style.position = "fixed";
    consoleRootDiv.style.flexDirection = "column";
    consoleRootDiv.style.display = "flex";
    consoleRootDiv.style.bottom = "0";
    consoleRootDiv.style.left = "0";
    consoleRootDiv.style.right = "0";
    consoleRootDiv.style.maxHeight = "300px";
    consoleRootDiv.style.height = "30%";
    consoleRootDiv.style.background = "rgba(0, 0, 0, 0.8)";
    consoleRootDiv.style.borderRadius = "10px";
    consoleRootDiv.style.overflow = "hidden";
    consoleRootDiv.style.boxShadow = "inset 0 0 3px rgba(255, 255, 255, 0.5)";
    consoleRootDiv.style.transition = "height 150ms ease-out";

    const headerDiv = document.createElement("div");
    consoleRootDiv.appendChild(headerDiv);
    headerDiv.style.background = gradColor;
    headerDiv.style.color = "#222";
    headerDiv.style.display = "flex";
    headerDiv.style.alignItems = "center";
    headerDiv.style.justifyContent = "space-between";
    headerDiv.style.padding = "3px 10px 1px 15px";
    headerDiv.style.fontSize = "14px";
    headerDiv.style.fontWeight = "bold";
    headerDiv.style.borderBottom = "1px solid rgba(255, 255, 255, 0.2)";
    headerDiv.style.fontFamily = "Arial, sans-serif";
    headerDiv.style.cursor = "pointer";

    const captionSpan = document.createElement("span");
    headerDiv.appendChild(captionSpan);
    captionSpan.textContent = "web-console-log";

    const closeButton = document.createElement("button");
    headerDiv.appendChild(closeButton);
    closeButton.textContent = "✕";
    closeButton.style.background = "none";
    closeButton.style.border = "none";
    closeButton.style.color = "#000";
    closeButton.style.fontSize = "16px";
    closeButton.style.cursor = "pointer";

    const contentDiv = document.createElement("div");
    consoleRootDiv.appendChild(contentDiv);
    contentDiv.style.padding = "3px 8px";
    contentDiv.style.width = "100%";
    contentDiv.style.color = "white";
    contentDiv.style.fontSize = "14px";
    contentDiv.style.overflow = "scroll";
    contentDiv.style.boxSizing = "border-box";
    contentDiv.style.whiteSpace = "pre-wrap";
    contentDiv.style.fontFamily = "Consolas, Menlo, Monaco, 'Courier New', monospace";

    return { iconDiv: createIconDiv(), consoleRootDiv, headerDiv, closeButton, contentDiv };
};

export { createConsoleElements };