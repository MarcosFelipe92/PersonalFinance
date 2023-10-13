package com.marcos.personafinance.entities;

import java.time.LocalDateTime;

import com.marcos.personafinance.entities.enums.IncomeType;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity(name = "tb_income")
public class Income {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String description;
    private IncomeType type;
    private Double amount;
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;
}
