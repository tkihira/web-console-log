import { safeStringify } from "./handleMessage";
import { appendError } from "./renderMessage";

const baseUrl = location.href;

const displayError = (message, stack) => {
    if (stack) {
        const callstack = [message];
        for (const line of stack.split("\n")) {
            let filename, lineno, colno;
            {
                const match = /^    at (.+):([0-9]+):([0-9]+)$/.exec(line);
                if (match) {
                    [, filename, lineno, colno] = match;
                }
            }
            {
                const match = /^@(.+):([0-9]+):([0-9]+)$/.exec(line);
                if (match) {
                    [, filename, lineno, colno] = match;
                }
            }
            if (filename) {
                if (filename.indexOf(baseUrl) === 0) {
                    filename = filename.substring(baseUrl.length);
                    if (filename.length === 0) {
                        filename = '(index)'
                    } else {
                        filename = './' + filename;
                    }
                }
                callstack.push(`    at ${filename}:${lineno}:${colno}`);
            }
        }
        message = callstack.join("\n");
    }
    appendError(message.trim())
};

const registerErrorListener = () => {
    addEventListener("error", (e) => {
        displayError(e.message, e.error?.stack);
    });
    addEventListener("unhandledrejection", (e) => {
        if (e.reason instanceof Error) {
            displayError(`(Unhandled Promise Rejection) ${e.reason.__proto__.name}: ${e.reason.message}`, e.reason.stack);
        } else {
            appendError("(Unhandled Promise Rejection) " + safeStringify(e.reason));
        }
    });
};

export { registerErrorListener };