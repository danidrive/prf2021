package hu.szte.prf.spring.api.services;

import hu.szte.prf.spring.api.models.Transaction;
import java.util.List;

public interface ITransactionService {
    void addTransaction(Transaction transaction);
    List<Transaction> listTransactionsByUser(String username);
}
