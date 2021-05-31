package hu.szte.prf.spring.api.services;

import hu.szte.prf.spring.api.models.Product;

public interface IProductService {
    void addProduct(Product product);
    Product getProductById(String id);
}
