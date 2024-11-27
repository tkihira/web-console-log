import { createConsoleElements } from "./domBuilder";
import { appendError, appendLog, initializeMessage } from "./renderMessage";
import { initializeInterface } from "./interface";
import { safeStringify } from "./handleMessage";

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

const originalConsoleLog = console.log;
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;
console.log = function (message) {
    if (arguments.length > 1) {
        message = [...arguments];
    }
    appendLog(safeStringify(message));
    originalConsoleLog.apply(console, arguments);
};
console.warn = function (message) {
    if (arguments.length > 1) {
        message = [...arguments];
    }
    appendWarn(safeStringify(message));
    originalConsoleWarn.apply(console, arguments);
};
console.error = function (message) {
    if (arguments.length > 1) {
        message = [...arguments];
    }
    appendError(safeStringify(message));
    originalConsoleError.apply(console, arguments);
};

onerror = function () {

    // console.log([...arguments]);
    // console.log(window.location.href);
};
