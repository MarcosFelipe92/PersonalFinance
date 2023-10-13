package com.marcos.personafinance.dto;

import java.time.LocalDateTime;

import com.marcos.personafinance.entities.Account;
import com.marcos.personafinance.entities.Expense;
import com.marcos.personafinance.entities.enums.ExpenseType;

import lombok.Data;

@Data
public class ExpenseDTO {

    private Long id;
    private String description;
    private Double amount;
    private ExpenseType type;
    private LocalDateTime date;
    private Account account;

    public ExpenseDTO() {

    }

    public ExpenseDTO(Expense entity) {
        id = entity.getId();
        description = entity.getDescription();
        type = entity.getType();
        amount = entity.getAmount();
        date = entity.getDate();
        account = entity.getAccount();
    }

}