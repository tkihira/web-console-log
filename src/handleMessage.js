import { appendLog } from "./renderMessage";

const safeStringify = function (obj) {
    if (typeof obj === "string" || typeof obj === "number") {
        return String(obj);
    }
    if (typeof obj === "function") {
        return `[Function: ${obj.name || "anonymous"}]`;
    }

    const seen = new WeakSet();

    return JSON.stringify(
        obj,
        (key, value) => {
            if (value === undefined) {
                return "[[undefined]]";
            }

            if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                    return "[[[circular]]]";
                }
                seen.add(value);

                if (Array.isArray(value)) {
                    if (value.length > 100) {
                        return [...value.slice(0, 100), `...and ${value.length - 100} more items`];
                    }
                }
            }

            if (typeof value === "function") {
                return `[[[Function: ${value.name || "anonymous"}]]]`;
            }

            return value;
        },
        2
    ).replace(/"\.\.\.and \d+ more items"/g, match =>
        match.replace(/^"/, "").replace(/"$/, "")
    ).replace(/"\[\[.+\]\]"/g, match =>
        match.replace(/^"\[\[/, "").replace(/\]\]"$/, "")
    );
}

const replaceConsoleFunctions = () => {
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
        appendLog(safeStringify(message), "warn");
        originalConsoleWarn.apply(console, arguments);
    };
    console.error = function (message) {
        if (arguments.length > 1) {
            message = [...arguments];
        }
        appendLog(safeStringify(message), "error");
        originalConsoleError.apply(console, arguments);
    };
};


export { replaceConsoleFunctions };