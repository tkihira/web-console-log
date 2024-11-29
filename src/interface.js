let isConsoleMinimized = false;
let isConsoleVisible = false;
let isIconVisible = false;

let notifyMessage = () => { };

const initializeInterface = (consoleElements) => {
    const { iconDiv, consoleRootDiv, headerDiv, closeButton } = consoleElements;

    const toggleIconVisibility = () => {
        iconDiv.style.display = isIconVisible ? "none" : "flex";
        isIconVisible = !isIconVisible;
    };

    const toggleConsoleVisibility = () => {
        consoleRootDiv.style.display = isConsoleVisible ? "none" : "flex";
        isConsoleVisible = !isConsoleVisible;
    };

    const toggleConsoleMinimized = () => {
        consoleRootDiv.style.height = isConsoleMinimized ? "30%" : headerDiv.offsetHeight + "px";
        isConsoleMinimized = !isConsoleMinimized;
    };

    const rootDiv = document.createElement("div");
    document.body.appendChild(rootDiv);
    rootDiv.append(consoleRootDiv, iconDiv);

    isConsoleVisible = false;
    isIconVisible = false;
    isConsoleMinimized = false;
    iconDiv.style.display = "none";
    consoleRootDiv.style.display = "none";

    // toggleIconVisibility(); // debug
    // toggleConsoleVisibility(); // debug

    iconDiv.onclick = () => {
        toggleIconVisibility();
        toggleConsoleVisibility();
        return false;
    };

    headerDiv.onclick = () => {
        toggleConsoleMinimized();
        return false;
    };

    closeButton.onclick = (e) => {
        e.stopPropagation();

        toggleIconVisibility();
        toggleConsoleVisibility();

        if (isConsoleMinimized) {
            toggleConsoleMinimized();
        }

        return false;
    };

    notifyMessage = (isError) => {
        if (!isIconVisible && !isConsoleVisible) {
            toggleIconVisibility();
        }
        if (isError) {
            iconDiv.style.backgroundColor = "rgba(255, 0, 0, 0.9)";
            iconDiv.style.borderColor = "rgba(204, 0, 0, 0.9)";
            iconDiv.style.opacity = 1;
            iconDiv.children[0].style.background = "";
            iconDiv.children[0].style.backgroundColor = "rgba(150, 30, 30, 0.9)";
            iconDiv.children[1].style.background = "";
            iconDiv.children[1].style.backgroundColor = "rgba(150, 30, 30, 0.9)";
            iconDiv.onmouseout = iconDiv.onmouseover = null;
        }
    }
};

export { initializeInterface, notifyMessage };