function safeStringify(obj) {
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


export { safeStringify };