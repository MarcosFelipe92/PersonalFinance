package com.marcos.personafinance.dto;

import java.util.ArrayList;
import java.util.List;

import com.marcos.personafinance.model.Account;
import com.marcos.personafinance.model.Expense;
import com.marcos.personafinance.model.Income;

import lombok.Data;

@Data
public class AccountDTO {

    private Long id;
    private Double balance;
    private Long user;

    private List<IncomeDTO> incomes = new ArrayList<>();
    private List<ExpenseDTO> expenses = new ArrayList<>();

    public AccountDTO() {

    }

    public AccountDTO(Account entity) {
        id = entity.getId();
        balance = entity.getBalance();
        user = entity.getUser();
    }

    public AccountDTO(Account entity, List<Income> incomes, List<Expense> expenses) {
        this(entity);
        incomes.forEach(i -> this.incomes.add(new IncomeDTO(i)));
        expenses.forEach(e -> this.expenses.add(new ExpenseDTO(e)));
    }
}
