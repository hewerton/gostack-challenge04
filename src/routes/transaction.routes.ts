import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import GetTransactionsService from '../services/GetTransactionsService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

const createTransactionService = new CreateTransactionService(
  transactionsRepository,
);

const getTransactionsService = new GetTransactionsService(
  transactionsRepository,
);

transactionRouter.get('/', (request, response) => {
  try {
    return response.json(getTransactionsService.execute());
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    const parsedValue = parseInt(value, 10);

    const transaction = createTransactionService.execute({
      title,
      value: parsedValue,
      type,
    });
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
