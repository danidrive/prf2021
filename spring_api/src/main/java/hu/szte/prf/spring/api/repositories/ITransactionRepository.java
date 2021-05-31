package hu.szte.prf.spring.api.repositories;

import hu.szte.prf.spring.api.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ITransactionRepository extends JpaRepository<Transaction, Integer> {

    @Query(value = "SELECT * FROM Transactions t where t.username = :username", nativeQuery = true)
    List<Transaction> findAllByUsername(@Param("username") String username);
}