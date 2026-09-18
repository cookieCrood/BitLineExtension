const vscode = require("vscode");
const { spawn } = require("child_process");
const path = require("path");

function activate(context) {
    const run = vscode.commands.registerCommand("bitline.run", () => {
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            vscode.window.showErrorMessage("No file is open.");
            return;
        }

        const file = editor.document.fileName;

        if (!file.endsWith(".bl")) {
            vscode.window.showErrorMessage("Not a Bitline file.");
            return;
        }

        const jar = path.join(context.extensionPath, "BitLine.jar");

        const terminal = vscode.window.createTerminal("BitLine");
        terminal.show();

        terminal.sendText(
            `java -jar "${jar}" "${file}"`
        );
    });

    context.subscriptions.push(run);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};