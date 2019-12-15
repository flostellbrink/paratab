import * as vscode from 'vscode';

type Position = { lastCharacter: number, position: vscode.Position, column: number };

// this method is called when vs code is activated
export function activate(context: vscode.ExtensionContext) {
	console.log("Paratab: Activated");
	let activeEditor = vscode.window.activeTextEditor;
	let timeout: NodeJS.Timer | undefined = undefined;
	const paratab = "	\uFE00";
	const command = "paratab.insert";
	const extraIndent = 2;

	console.log("Paratab: Adding commands")
	const commandHandler = () => {
		if (!activeEditor) return;
		const position = activeEditor.selection.start;
		activeEditor.edit(builder => builder.insert(position, paratab));
	};

	context.subscriptions.push(vscode.commands.registerCommand(command, commandHandler));

	console.log("Paratab: Adding decorations")
	const paratabDecorationType = vscode.window.createTextEditorDecorationType({
		textDecoration: "none; font-size: 0.001em",
		rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
		before: { color: "#00000000" },
	});

	function updateDecorations() {
		if (!activeEditor) return;

		let lastPosition = new vscode.Position(0, 0);
		let column = -1;
		const columns: number[] = [];
		const positions: Position[] = [];
		const paratabs: vscode.DecorationOptions[] = [];
		const text = activeEditor.document.getText();
		for (let index = text.indexOf(paratab); index !== -1; index = text.indexOf(paratab, index + 1)) {
			const position = activeEditor.document.positionAt(index);
			for (let line = lastPosition.line; line < position.line; line += 1) {
				if (activeEditor.document.lineAt(line).isEmptyOrWhitespace) {
					addParatabs(positions, columns, paratabs);
					break;
				}
			}

			const sameLine = position.line === lastPosition.line;
			column = sameLine ? column + 1 : 0;
			const lastCharacter =  (sameLine && lastPosition.character) || 0;
			positions.push({ lastCharacter, position, column });

			const indent = position.character - lastCharacter;
			if (columns.length <= column) columns.push(0);
			if (indent > columns[column]) columns[column] = indent;

			lastPosition = position;
		}

		addParatabs(positions, columns, paratabs);
		activeEditor.setDecorations(paratabDecorationType, paratabs);
	}

	function addParatabs(positions: Position[], columns: number[], paratabs: vscode.DecorationOptions[]) {
		for (let { lastCharacter, position, column } of positions) {
			const positionEnd = new vscode.Position(position.line, position.character + 1);
			const missingIndent = lastCharacter + columns[column] - position.character + extraIndent;
			paratabs.push({
				range: new vscode.Range(position, positionEnd),
				renderOptions: { before: { contentText: "m".repeat(missingIndent) } }
			});
		}

		positions.length = 0;
		columns.length = 0;
	}

	function triggerUpdateDecorations() {
		if (timeout) {
			clearTimeout(timeout);
			timeout = undefined;
		}
		timeout = setTimeout(updateDecorations, 500);
	}

	if (activeEditor) {
		triggerUpdateDecorations();
	}

	vscode.window.onDidChangeActiveTextEditor(editor => {
		activeEditor = editor;
		if (editor) {
			triggerUpdateDecorations();
		}
	}, null, context.subscriptions);

	vscode.workspace.onDidChangeTextDocument(event => {
		if (activeEditor && event.document === activeEditor.document) {
			triggerUpdateDecorations();
		}
	}, null, context.subscriptions);
}

