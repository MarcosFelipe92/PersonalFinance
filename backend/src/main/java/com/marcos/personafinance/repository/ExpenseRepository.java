package com.marcos.personafinance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.marcos.personafinance.model.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

}
