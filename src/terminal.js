import DraftLog from 'draftlog';
import chalkTable from 'chalk-table';
import chalk from 'chalk';
import readline from 'readline';
import terminalConfig from './config/terminal.js';
import Income from './entity/Income.js';

const TABLE_OPTIONS = terminalConfig.table;

class CustomTerminal {
	constructor() {
		this.print = {};
		this.data = [];
	}

	initialize(database) {
		// TODO: Initialize your terminal with the main instance
		DraftLog(console).addLineListener(process.stdin);
		this.terminal = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		this.initializeTable(database);
	}

	initializeTable(database) {
		const data = database.map((item) => new Income(item).format());
		const table = chalkTable(terminalConfig.table, data);

		this.print = console.draft(table);
		this.data = data;
	}
	updateTable(item) {
		this.data.push(item);
		this.print(chalkTable(terminalConfig.table, this.data));
	}
	question(msg = '') {
		return new Promise((resolve) => this.terminal.question(msg, resolve));
	}

	closeTerminal() {
		this.terminal.close();
	}
}

export default CustomTerminal;
