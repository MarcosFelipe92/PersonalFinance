package com.marcos.personafinance.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marcos.personafinance.dto.ExpenseDTO;
import com.marcos.personafinance.entities.Account;
import com.marcos.personafinance.entities.Expense;
import com.marcos.personafinance.repository.AccountRepository;
import com.marcos.personafinance.repository.ExpenseRepository;

@Service
public class ExpenseService {
    
    @Autowired
    private ExpenseRepository repository;

    @Autowired
    private AccountRepository accountRepository;

    public List<ExpenseDTO> findAll() {
        return repository.findAll().stream().map(x -> new ExpenseDTO(x)).collect(Collectors.toList());
    }

    public ExpenseDTO insert(ExpenseDTO dto) {
        Account account = accountRepository.findById(dto.getAccount().getId()).get();
        Expense entity = new Expense();
        dtoToEntity(dto, entity);
        entity.setAccount(account);
        entity = repository.save(entity);
        return new ExpenseDTO(entity);
    }

    public Expense dtoToEntity(ExpenseDTO dto, Expense entity) {
        entity.setDescription(dto.getDescription());
        entity.setType(dto.getType());
        entity.setAmount(dto.getAmount());
        entity.setDate(dto.getDate());
        entity.setAccount(dto.getAccount());

        return entity;
    }
}
