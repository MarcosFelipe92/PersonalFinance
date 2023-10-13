package com.marcos.personafinance.entities;

import java.time.LocalDateTime;

import com.marcos.personafinance.entities.enums.ExpenseType;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "tb_expense")
public class Expense {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private Double amount;
    private ExpenseType type;
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;
}
