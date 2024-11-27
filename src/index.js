import { createConsoleElements } from "./domBuilder";
import { appendError, appendLog, initializeMessage } from "./renderMessage";
import { initializeInterface } from "./interface";

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

    let count = 0;
    (async () => {
        while (true) {
            await new Promise(r => setTimeout(r, 10));
            appendLog(`Message Test: ` + count++);
        }
    })();

});


onerror = function () {

    // console.log([...arguments]);
    // console.log(window.location.href);
};
