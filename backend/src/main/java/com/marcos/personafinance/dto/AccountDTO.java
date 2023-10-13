package com.marcos.personafinance.dto;

import com.marcos.personafinance.entities.Account;

import lombok.Data;

@Data
public class AccountDTO {

    private Long id;
    private Double balance;

    public AccountDTO() {
        
    }

    public AccountDTO(Account entity) {
        id = entity.getId();
        balance = entity.getBalance();
    }
}
