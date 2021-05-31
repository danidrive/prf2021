package hu.szte.prf.spring.api.models;

import java.util.List;

public class TransactionRequest {
    private List<ProductsToBuy> products;
    private String username;

    public TransactionRequest() { }

    public TransactionRequest(List<ProductsToBuy> products, String username) {
        this.products = products;
        this.username = username;
    }

    public List<ProductsToBuy> getProducts() {
        return products;
    }

    public void setProducts(List<ProductsToBuy> products) {
        this.products = products;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
