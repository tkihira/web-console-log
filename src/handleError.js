import { getBaseDirectory, parseStackString, safeStringify } from "./util";
import { appendError } from "./renderMessage";

const displayError = (message, stackString) => {
    if (stackString) {
        const callstack = parseStackString(stackString);
        if (callstack[0] && callstack[0].filename.indexOf(getBaseDirectory()) !== 0) {
            return;
        }

        message = [message, ...callstack.map(({ funcname, filename, lineno, colno }) => {
            if (filename.indexOf(getBaseDirectory()) === 0) {
                filename = filename.substring(getBaseDirectory().length);
                if (filename.length === 0) {
                    filename = '(index)';
                } else {
                    filename = './' + filename;
                }
            }
            if (funcname) {
                return `    at ${funcname} (${filename}:${lineno}:${colno})`;
            } else {
                return `    at ${filename}:${lineno}:${colno}`;
            }
        })].join("\n");
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