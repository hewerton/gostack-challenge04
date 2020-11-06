import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totals = this.transactions.reduce(
      (previousValue, currentValue) => {
        const valueUpdated = { ...previousValue };
        if (currentValue.type === 'income') {
          valueUpdated.totalIncome += currentValue.value;
        } else {
          valueUpdated.totalOutcome += currentValue.value;
        }
        return valueUpdated;
      },
      {
        totalIncome: 0,
        totalOutcome: 0,
      },
    );

    const balance: Balance = {
      income: totals.totalIncome,
      outcome: totals.totalOutcome,
      total: totals.totalIncome - totals.totalOutcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
