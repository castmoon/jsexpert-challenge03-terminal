import server from './../server.json' assert { type: 'json' };
import { readFile, writeFile } from 'fs/promises';

const API_BASE_URL = 'http://localhost:3000';

class IncomeRepository {
	async makeRequest(url) {
		// @TODO: Implement method
		return null;
	}

	async getConversions() {
		// @TODO: Implement method
		return server.convert.results;
	}

	async save(data) {
		const { pathname: databaseFile } = new URL(
			'./../server.json',
			import.meta.url
		);
		const currentData = JSON.parse(await readFile(databaseFile));
		currentData.incomes.push(data);
		await writeFile(databaseFile, JSON.stringify(currentData));
	}
}

export default IncomeRepository;
