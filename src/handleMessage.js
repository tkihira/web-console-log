import { appendLog } from "./renderMessage";
import { getBaseDirectory, parseStackString, safeStringify } from "./util";

const replaceConsoleFunctions = () => {
    const originalConsoleLog = console.log;
    const originalConsoleWarn = console.warn;
    const originalConsoleError = console.error;

    console.log = function (message) {
        originalConsoleLog.apply(this, arguments);
        const error = new Error();
        const stackList = parseStackString(error.stack);
        if(stackList[1]?.filename?.indexOf(getBaseDirectory()) !== -1) {
            if (arguments.length > 1) {
                message = [...arguments];
            }
            appendLog(safeStringify(message));
        }
    };
    console.warn = function (message) {
        originalConsoleWarn.apply(this, arguments);
        const error = new Error();
        const stackList = parseStackString(error.stack);
        if(stackList[1]?.filename?.indexOf(getBaseDirectory()) !== -1) {
            if (arguments.length > 1) {
                message = [...arguments];
            }
            appendLog(safeStringify(message), "warn");
        }
    };
    console.error = function (message) {
        originalConsoleError.apply(this, arguments);
        const error = new Error();
        const stackList = parseStackString(error.stack);
        if(stackList[1]?.filename?.indexOf(getBaseDirectory()) !== -1) {
            if (arguments.length > 1) {
                message = [...arguments];
            }
            appendLog(safeStringify(message), "error");
        }
    };
};


export { replaceConsoleFunctions };