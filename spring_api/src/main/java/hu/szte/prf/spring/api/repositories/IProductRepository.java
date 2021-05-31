package hu.szte.prf.spring.api.repositories;

import hu.szte.prf.spring.api.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductRepository extends JpaRepository<Product, String> { }