package com.marcos.personafinance.dto;

import java.time.LocalDateTime;

import com.marcos.personafinance.entities.Account;
import com.marcos.personafinance.entities.Income;
import com.marcos.personafinance.entities.enums.IncomeType;

import lombok.Data;

@Data
public class IncomeDTO {

    private Long id;
    private String description;
    private IncomeType type;
    private Double amount;
    private LocalDateTime date;
    private Account account;

    public IncomeDTO() {

    }

    public IncomeDTO(Income entity) {
        id = entity.getId();
        description = entity.getDescription();
        type = entity.getType();
        amount = entity.getAmount();
        date = entity.getDate();
        account = entity.getAccount();
    }

}
