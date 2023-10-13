package com.marcos.personafinance.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marcos.personafinance.dto.ExpenseDTO;
import com.marcos.personafinance.service.ExpenseService;

@RestController
@RequestMapping("/expenses")
public class ExpenseController {
    
    @Autowired
    private ExpenseService service;

    @GetMapping
    public ResponseEntity<List<ExpenseDTO>> findAll() {
        List<ExpenseDTO> list = service.findAll();
        return ResponseEntity.ok().body(list);
    }

    @PostMapping
    public ResponseEntity<ExpenseDTO> insert(@RequestBody ExpenseDTO dto) {
        ExpenseDTO obj = service.insert(dto);
        return ResponseEntity.ok().body(obj);
    }
}
