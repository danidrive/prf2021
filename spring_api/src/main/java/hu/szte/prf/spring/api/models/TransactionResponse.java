package hu.szte.prf.spring.api.models;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

public class TransactionResponse {
    private UUID id;
    private Timestamp timestamp;
    private List<ProductsToBuy> products;

    public TransactionResponse() { }

    public TransactionResponse(UUID id, Timestamp timestamp, List<ProductsToBuy> products) {
        this.id = id;
        this.timestamp = timestamp;
        this.products = products;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public List<ProductsToBuy> getProducts() {
        return products;
    }

    public void setProducts(List<ProductsToBuy> products) {
        this.products = products;
    }
}
