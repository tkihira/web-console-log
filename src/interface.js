let isConsoleMinimized = false;
let isConsoleOpen = false;
let isIconVisible = false;

const initializeInterface = (consoleElements) => {
    const { iconDiv, consoleRootDiv, headerDiv, closeButton } = consoleElements;

    const toggleIconVisibility = () => {
        iconDiv.style.display = isIconVisible ? "none" : "flex";
        isIconVisible = !isIconVisible;
    };
    
    const toggleConsoleVisibility = () => {
        consoleRootDiv.style.display = isConsoleOpen ? "none" : "flex";
        isConsoleOpen = !isConsoleOpen;
    };

    const toggleConsoleMinimized = () => {
        consoleRootDiv.style.height = isConsoleMinimized ? "30%" : headerDiv.offsetHeight + "px";
        isConsoleMinimized = !isConsoleMinimized;
    };
        
    const rootDiv = document.createElement("div");
    document.body.appendChild(rootDiv);
    rootDiv.append(consoleRootDiv, iconDiv);

    isConsoleOpen = false;
    isIconVisible = false;
    isConsoleMinimized = false;
    iconDiv.style.display = "none";
    consoleRootDiv.style.display = "none";

    // toggleIconVisibility(); // debug
    toggleConsoleVisibility(); // debug

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
};


export { initializeInterface };