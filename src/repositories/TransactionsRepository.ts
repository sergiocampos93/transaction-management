import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();
    let [income, outcome] = [0, 0];
    transactions.forEach(transaction => {
      switch (transaction.type) {
        case 'income':
          income += Number(transaction.value);
          break;
        case 'outcome':
          outcome += Number(transaction.value);
          break;
        default:
          break;
      }
    });
    const balance: Balance = { income, outcome, total: income - outcome };
    return balance;
  }
}

export default TransactionsRepository;
