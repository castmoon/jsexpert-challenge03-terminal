import IncomeRepository from './../repository/IncomeRepository.js';
import Income from './../entity/Income.js';

class IncomeService {
	constructor({ incomeRepository } = {}) {
		this.incomeRepository = incomeRepository || new IncomeRepository();
	}

	async generateIncomeFromString(incomeString, delimiter = ';') {
		if (!incomeString) {
			throw new Error(
				'Position is a required field. Please make sure you are providing a position.'
			);
		}
		const [position, expectation] = incomeString.split(delimiter);

		const valueOfExpectation = Number(expectation);

		if (Number.isNaN(valueOfExpectation)) {
			throw new Error(
				'A valid Expectation is required. Please note that only numbers are allowed.'
			);
		}

		const conversions = await this.incomeRepository.getConversions();

		const income = new Income({
			position,
		});

		income.expectation.value = valueOfExpectation;
		income.conversion01.value =
			valueOfExpectation * conversions[income.conversion01.currency];
		income.conversion02.value =
			valueOfExpectation * conversions[income.conversion02.currency];
		income.conversion03.value =
			valueOfExpectation * conversions[income.conversion03.currency];

		return income;
	}
}

export default IncomeService;
