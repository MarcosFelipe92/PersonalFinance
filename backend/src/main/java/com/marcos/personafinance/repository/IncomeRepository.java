package com.marcos.personafinance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.marcos.personafinance.entities.Income;

public interface IncomeRepository extends JpaRepository<Income, Long> {
    
}
