package com.marcos.personafinance.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marcos.personafinance.dto.AccountDTO;
import com.marcos.personafinance.service.AccountService;

@RestController
@RequestMapping("/accounts")
public class AccountController {
    
    @Autowired
    private AccountService service;

    @GetMapping
    public ResponseEntity<List<AccountDTO>> findAll() {
        List<AccountDTO> list = service.findAll();
        return ResponseEntity.ok().body(list);
    }

    @PostMapping
    public ResponseEntity<AccountDTO> insert(@RequestBody AccountDTO dto) {
        AccountDTO obj = service.insert(dto);
        return ResponseEntity.ok().body(obj);
    }
}
