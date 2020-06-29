import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import CreateTransactionService from '../services/CreateTransactionService';


const transactionsRepository = new TransactionsRepository();

const transactionRouter = Router();



transactionRouter.get('/', (request, response) => {
  try {
    // TODO
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    return response.status(200).json({transactions,balance});

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  const { title , value , type }  = request.body;
  try {
    // TODO
    if(type !== 'income' && type !== 'outcome'){
      throw new Error('Type invalid');
    }

    const createTransactionService = new CreateTransactionService(transactionsRepository);

    const transaction = createTransactionService.execute({title,value,type});

    return response.status(200).json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
