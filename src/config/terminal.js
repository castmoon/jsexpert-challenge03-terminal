import chalk from 'chalk';

// @TODO: Any guesses about what's missing?
export default {
	table: {
		leftPad: 2,
		columns: [
			{
				field: 'position',
				name: chalk.green('Position'),
			},
			{
				field: 'expectation',
				name: chalk.cyan('Expectation (BRL)'),
			},
			{
				field: 'conversion01',
				name: chalk.yellow('USD'),
			},
			{
				field: 'conversion02',
				name: chalk.grey('EUR'),
			},
			{
				field: 'conversion03',
				name: chalk.red('RUB'),
			},
		],
	},
};
