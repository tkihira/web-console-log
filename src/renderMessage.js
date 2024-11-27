let contentDiv = null;
let messageCount = 0;
let isInitialized = false;
const pendingMessageQueue = [];

const initializeMessage = (consoleElements) => {
    ({ contentDiv } = consoleElements);
    messageCount = 0;
    isInitialized = true;

    if (pendingMessageQueue.length) {
        for (const message of pendingMessageQueue) {
            appendMessage.apply(null, message);
        }
        pendingMessageQueue.length = 0;
    }
};

const appendMessage = (message, logLevel, isError) => {
    if (!isInitialized) {
        pendingMessageQueue.push([message, logLevel, isError]);
        return;
    }
    if (messageCount > 1000) {
        return;
    }
    const doScroll = (contentDiv.scrollTop + contentDiv.offsetHeight >= contentDiv.scrollHeight);

    const messageDiv = document.createElement("div");
    contentDiv.append(messageDiv);

    messageDiv.style.padding = "1.5px 3px";
    messageDiv.style.margin = "1.5px 0";
    messageDiv.style.minHeight = "1em";

    if (logLevel === "error" || logLevel === "warn") {
        messageDiv.style.backgroundColor = (logLevel === "error" ? "rgba(255, 0, 0, 0.3)" : "rgba(255, 255, 0, 0.3)");
        messageDiv.style.borderRadius = "3px";
    } else {
        messageDiv.style.borderBottom = "1px solid rgba(255, 255, 255, 0.1)";
    }
    if (message.length) {
        for (const line of message.split("\n")) {
            messageDiv.append(document.createElement("br"), document.createTextNode(line));
        }
        messageDiv.removeChild(messageDiv.firstChild);
    }

    if (isError) {
        const iconSpan = document.createElement("span");
        iconSpan.style.width = "13px";
        iconSpan.style.height = "13px";
        iconSpan.style.backgroundColor = "#e74c3c";
        iconSpan.style.borderRadius = "50%";
        iconSpan.style.position = "relative";
        iconSpan.style.display = "inline-flex";
        iconSpan.style.justifyContent = "center";
        iconSpan.style.alignItems = "center";
        iconSpan.style.marginTop = "1px";
        iconSpan.style.marginRight = "3px";

        for (let i = 0; i < 2; i++) {
            const slashSpan = document.createElement("span");
            iconSpan.appendChild(slashSpan);
            slashSpan.style.position = "absolute";
            slashSpan.style.width = "60%";
            slashSpan.style.height = "2px";
            slashSpan.style.backgroundColor = "#fff";
            slashSpan.style.transform = `rotate(${45 * (1 - i * 2)}deg)`;
        }

        messageDiv.insertBefore(iconSpan, messageDiv.firstChild);
    }

    if (doScroll) {
        contentDiv.scrollTop = contentDiv.scrollHeight;
    }

    messageCount++;
    if (messageCount === 1000) {
        appendMessage("Too many messages. Logging stopped.", "warn", true);
    }
};

const appendLog = (message, logLevel = "info") => {
    appendMessage(message, logLevel, false);
};

const appendError = (message) => {
    appendMessage(message, "error", true);
};

export { initializeMessage, appendLog, appendError };