package com.marcos.personafinance.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marcos.personafinance.dto.AccountDTO;
import com.marcos.personafinance.dto.ExpenseDTO;
import com.marcos.personafinance.dto.IncomeDTO;
import com.marcos.personafinance.model.Account;
import com.marcos.personafinance.model.Expense;
import com.marcos.personafinance.model.Income;
import com.marcos.personafinance.repository.AccountRepository;
import com.marcos.personafinance.repository.ExpenseRepository;
import com.marcos.personafinance.repository.IncomeRepository;

@Service
public class AccountService {

    @Autowired
    private AccountRepository repository;

    @Autowired
    private IncomeRepository incomeRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    public List<AccountDTO> findAll() {
        return repository.findAll().stream().map(x -> new AccountDTO(x)).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public AccountDTO findById(Long id) {
        Account entity = repository.findById(id).get();
        return new AccountDTO(entity, entity.getIncomes(), entity.getExpenses());
    }

    @Transactional
    public AccountDTO insert(AccountDTO dto) {
        Account entity = new Account();
        entity.setBalance(dto.getBalance());
        entity = repository.save(entity);
        return new AccountDTO(entity);
    }

    @Transactional
    public AccountDTO update(AccountDTO dto, Long id) {
        Account entity = repository.getReferenceById(id);
        dtoToEntity(dto, entity);
        return new AccountDTO(repository.save(entity));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public void dtoToEntity(AccountDTO dto, Account entity) {
        entity.setBalance(dto.getBalance());

        entity.getExpenses().clear();
        entity.getIncomes().clear();
        for (IncomeDTO incomeDto : dto.getIncomes()) {
            Income income = incomeRepository.getReferenceById(incomeDto.getId());
            entity.getIncomes().add(income);
        }
        for (ExpenseDTO expenseDto : dto.getExpenses()) {
            Expense expense = expenseRepository.getReferenceById(expenseDto.getId());
            entity.getExpenses().add(expense);
        }
    }
}
