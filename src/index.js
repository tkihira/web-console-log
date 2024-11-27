import { createConsoleElements } from "./domBuilder";
import { appendError, appendLog, initializeMessage } from "./renderMessage";
import { initializeInterface } from "./interface";
import { replaceConsoleFunctions } from "./handleMessage";

document.addEventListener("DOMContentLoaded", () => {

    const consoleElements = createConsoleElements();
    initializeInterface(consoleElements);
    initializeMessage(consoleElements);

    appendLog("");
    appendLog("");
    appendLog("");
    appendLog("");
    appendLog("Hello,     world\t!");
    appendLog("Hello,\nworld!", "warn");
    appendError("this is another test div<br>Hello hello");
});

replaceConsoleFunctions();

onerror = function () {

    // console.log([...arguments]);
    // console.log(window.location.href);
};
