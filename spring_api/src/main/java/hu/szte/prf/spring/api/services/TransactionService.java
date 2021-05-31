package hu.szte.prf.spring.api.services;

import hu.szte.prf.spring.api.models.Transaction;
import hu.szte.prf.spring.api.repositories.ITransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService implements ITransactionService {

    private final ITransactionRepository transactionRepository;

    @Autowired
    public TransactionService(ITransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @Override
    public void addTransaction(Transaction transaction) {
        this.transactionRepository.save(transaction);
    }

    @Override
    public List<Transaction> listTransactionsByUser(String username) {
        return this.transactionRepository.findAllByUsername(username);
    }
}
