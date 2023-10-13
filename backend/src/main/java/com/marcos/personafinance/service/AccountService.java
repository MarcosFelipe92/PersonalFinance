package com.marcos.personafinance.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marcos.personafinance.dto.AccountDTO;
import com.marcos.personafinance.entities.Account;
import com.marcos.personafinance.repository.AccountRepository;

@Service
public class AccountService {
    
    @Autowired
    private AccountRepository repository;

    public List<AccountDTO> findAll() {
        return repository.findAll().stream().map(x -> new AccountDTO(x)).collect(Collectors.toList());
    }

    public AccountDTO insert(AccountDTO dto) {
        Account entity = new Account();
        entity.setId(dto.getId());
        entity.setBalance(dto.getBalance());
        entity = repository.save(entity);
        return new AccountDTO(entity);
    }
}
