const getBaseDirectory = () => {
    const separatedDirectoryList = location.href.split("/");
    separatedDirectoryList.pop();
    return separatedDirectoryList.join("/") + "/";
};

const safeStringify = (obj) => {
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
};

const parseStackString = (stack) => {
    const callstack = [];

    for (const line of stack.split("\n")) {
        let funcname, filename, lineno, colno;
        {
            const match = /^    at (.+):([0-9]+):([0-9]+)$/.exec(line);
            if (match) {
                [, filename, lineno, colno] = match;
            }
        }
        {
            const match = /^    at (.+) \((.+):([0-9]+):([0-9]+)\)$/.exec(line);
            if (match) {
                [, funcname, filename, lineno, colno] = match;
            }
        }
        {
            const match = /^@(.+):([0-9]+):([0-9]+)$/.exec(line);
            if (match) {
                [, filename, lineno, colno] = match;
            }
        }
        {
            const match = /^(.+)@(.+):([0-9]+):([0-9]+)$/.exec(line);
            if (match) {
                [, funcname, filename, lineno, colno] = match;
            }
        }
        if (filename) {
            callstack.push({ funcname, filename, lineno, colno });
        }
    }

    return callstack;
};

export { safeStringify, parseStackString, getBaseDirectory };