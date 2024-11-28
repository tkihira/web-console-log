import { createConsoleElements } from "./domBuilder";
import { initializeMessage } from "./renderMessage";
import { initializeInterface } from "./interface";
import { replaceConsoleFunctions } from "./handleMessage";
import { registerErrorListener } from "./handleError";


replaceConsoleFunctions();
registerErrorListener();

document.addEventListener("DOMContentLoaded", () => {
    const consoleElements = createConsoleElements();
    initializeInterface(consoleElements);
    initializeMessage(consoleElements);
});