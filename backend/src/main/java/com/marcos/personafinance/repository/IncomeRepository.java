package com.marcos.personafinance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.marcos.personafinance.model.Income;

public interface IncomeRepository extends JpaRepository<Income, Long> {

}
