package hu.szte.prf.spring.api.models;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name="Transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int _id;
    private UUID id;
    private String product_id;
    private String username;
    private int amount;
    private Timestamp timestamp;

    public Transaction() { }

    public Transaction(int _id, UUID id, String product_id, String username, int amount, Timestamp timestamp) {
        this._id = _id;
        this.id = id;
        this.product_id = product_id;
        this.username = username;
        this.amount = amount;
        this.timestamp = timestamp;
    }

    public Transaction(UUID id, String product_id, String username, int amount, Timestamp timestamp) {
        this.id = id;
        this.product_id = product_id;
        this.username = username;
        this.amount = amount;
        this.timestamp = timestamp;
    }

    public int get_id() {
        return _id;
    }

    public void set_id(int _id) {
        this._id = _id;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getProduct_id() {
        return product_id;
    }

    public void setProduct_id(String productId) {
        this.product_id = productId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }
}
