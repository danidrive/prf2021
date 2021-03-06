package hu.szte.prf.spring.api.controllers;

import hu.szte.prf.spring.api.models.*;
import hu.szte.prf.spring.api.services.IProductService;
import hu.szte.prf.spring.api.services.ITransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping
@CrossOrigin(origins = "*")
public class TransactionController {

    private final IProductService productService;
    private final ITransactionService transactionService;

    @Autowired
    public TransactionController(IProductService productService, ITransactionService transactionService) {
        this.productService = productService;
        this.transactionService = transactionService;
    }

    @GetMapping("/transactions/{username}")
    public List<TransactionResponse> listTransactionsByUser(@PathVariable(name = "username") String username) {
        List<Transaction> transactions = this.transactionService.listTransactionsByUser(username);
        HashMap<UUID, TransactionResponse> transactionDictionary = new HashMap<UUID, TransactionResponse>();
        for (Transaction transaction : transactions) {
            Product product = this.productService.getProductById(transaction.getProduct_id());
            ProductsToBuy productsToBuy = new ProductsToBuy(product.getId(), product.getName(), product.getPrice(), transaction.getAmount());

            if (!transactionDictionary.containsKey(transaction.getId())) {
                transactionDictionary.put(
                        transaction.getId(),
                        new TransactionResponse(
                                transaction.getId(),
                                transaction.getTimestamp(),
                                new ArrayList<>()));
            }
            transactionDictionary.get(transaction.getId()).getProducts().add(productsToBuy);
        }
        return new ArrayList<>(transactionDictionary.values());
    }

    @PostMapping("/transactions")
    public void addTransaction(@RequestBody TransactionRequest request){
        UUID transactionId = UUID.randomUUID();
        for (ProductsToBuy product : request.getProducts()) {
            Product p = this.productService.getProductById(product.getId());
            if (p == null) {
                this.productService.addProduct(new Product(product.getId(), product.getName(), product.getPrice()));
            }
            this.transactionService.addTransaction(
                    new Transaction(
                            transactionId,
                            product.getId(),
                            request.getUsername(),
                            product.getAmount(),
                            new Timestamp(System.currentTimeMillis())));
        }
    }
}
