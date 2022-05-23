import CustomTerminal from './terminal.js';
import IncomeService from './service/IncomeService.js';
import database from './server.json' assert { type: 'json' };
import IncomeRepository from './repository/IncomeRepository.js';

const VOCABULARY = {
	STOP: ':q',
};

const terminal = new CustomTerminal();
terminal.initialize(database.incomes);

const service = new IncomeService();
const repository = new IncomeRepository();

async function mainLoop() {
	console.info('🚀 Running...\n');
	try {
		const answer = await terminal.question(
			'Qual seu cargo e pretensão salarial em BRL? (position; expectation)\nInsira: '
		);
		if (answer === VOCABULARY.STOP) {
			terminal.closeTerminal();
			console.log('process finished!');
			return;
		}
		const income = await service.generateIncomeFromString(answer);
		console.log('\n');
		terminal.updateTable(income.format());
		await repository.save(income);

		return mainLoop();
	} catch (error) {
		// TODO: Don't forget of handling some errors beautifully ;)
		console.error(error);
		return mainLoop();
	}
}

await mainLoop();
