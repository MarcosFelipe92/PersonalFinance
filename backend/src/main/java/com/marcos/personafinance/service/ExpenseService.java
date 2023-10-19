package com.marcos.personafinance.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.marcos.personafinance.dto.ExpenseDTO;
import com.marcos.personafinance.exception.service.DatabaseException;
import com.marcos.personafinance.exception.service.ResourceNotFoundException;
import com.marcos.personafinance.model.Account;
import com.marcos.personafinance.model.Expense;
import com.marcos.personafinance.repository.AccountRepository;
import com.marcos.personafinance.repository.ExpenseRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository repository;

    @Autowired
    private AccountRepository accountRepository;

    public List<ExpenseDTO> findAll() {
        return repository.findAll().stream().map(x -> new ExpenseDTO(x)).collect(Collectors.toList());
    }

    public ExpenseDTO findById(Long id) {
        Expense entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
        return new ExpenseDTO(entity);
    }

    @Transactional
    public ExpenseDTO insert(ExpenseDTO dto) {
        Account account = accountRepository.findById(dto.getAccount().getId()).get();
        Expense entity = new Expense();
        dtoToEntity(dto, entity);
        entity.setAccount(account);
        entity = repository.save(entity);
        return new ExpenseDTO(entity);
    }

    @Transactional
    public ExpenseDTO update(ExpenseDTO dto, Long id) {
        try {
            Expense entity = repository.getReferenceById(id);
            Account account = entity.getAccount();
            dtoToEntity(dto, entity);
            entity.setAccount(account);
            entity = repository.save(entity);
            return new ExpenseDTO(entity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("id " + id + " not found");
        }
    }

    public void delete(Long id) {
        try {
            repository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Integrity violation");
        }
    }

    public void dtoToEntity(ExpenseDTO dto, Expense entity) {
        entity.setDescription(dto.getDescription());
        entity.setType(dto.getType());
        entity.setAmount(dto.getAmount());
        entity.setDate(dto.getDate());
    }
}
