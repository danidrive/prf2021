package hu.szte.prf.spring.api.services;

import hu.szte.prf.spring.api.models.Product;
import hu.szte.prf.spring.api.repositories.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService implements IProductService{

    private final IProductRepository productRepository;

    @Autowired
    public ProductService(IProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void addProduct(Product product) {
        this.productRepository.save(product);
    }

    @Override
    public Product getProductById(String id) {
        return this.productRepository.findById(id).orElse(null);
    }
}
