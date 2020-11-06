import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface BalanceDTO {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionsDTO {
  transactions: Transaction[];
  balance: BalanceDTO;
}

class GetTransactionsService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): TransactionsDTO {
    const transactions = this.transactionsRepository.all();
    const balance = this.transactionsRepository.getBalance();

    const transactionsWithBalance: TransactionsDTO = {
      transactions,
      balance,
    };

    return transactionsWithBalance;
  }
}

export default GetTransactionsService;
