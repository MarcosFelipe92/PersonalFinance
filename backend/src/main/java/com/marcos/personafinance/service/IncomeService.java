package com.marcos.personafinance.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marcos.personafinance.dto.IncomeDTO;
import com.marcos.personafinance.model.Account;
import com.marcos.personafinance.model.Income;
import com.marcos.personafinance.repository.AccountRepository;
import com.marcos.personafinance.repository.IncomeRepository;

import jakarta.transaction.Transactional;

@Service
public class IncomeService {

    @Autowired
    private IncomeRepository repository;

    @Autowired
    private AccountRepository accountRepository;

    public List<IncomeDTO> findAll() {
        return repository.findAll().stream().map(x -> new IncomeDTO(x)).collect(Collectors.toList());
    }

    public IncomeDTO findById(Long id) {
        return new IncomeDTO(repository.findById(id).get());
    }

    @Transactional
    public IncomeDTO insert(IncomeDTO dto) {
        Account account = accountRepository.findById(dto.getAccount().getId()).get();
        Income entity = new Income();
        dtoToEntity(dto, entity);
        entity.setAccount(account);
        entity = repository.save(entity);
        return new IncomeDTO(entity);
    }

    @Transactional
    public IncomeDTO update(IncomeDTO dto, Long id) {
        Income entity = repository.getReferenceById(id);
        Account account = entity.getAccount();
        dtoToEntity(dto, entity);
        entity.setAccount(account);
        entity = repository.save(entity);
        return new IncomeDTO(entity);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public void dtoToEntity(IncomeDTO dto, Income entity) {
        entity.setDescription(dto.getDescription());
        entity.setType(dto.getType());
        entity.setAmount(dto.getAmount());
        entity.setDate(dto.getDate());
        entity.setAccount(dto.getAccount());
    }
}
