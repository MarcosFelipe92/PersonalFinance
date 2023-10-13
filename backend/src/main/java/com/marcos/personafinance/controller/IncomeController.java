package com.marcos.personafinance.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marcos.personafinance.dto.IncomeDTO;
import com.marcos.personafinance.service.IncomeService;

@RestController
@RequestMapping("/incomes")
public class IncomeController {
    
    @Autowired
    private IncomeService service;

    @GetMapping
    public ResponseEntity<List<IncomeDTO>> findAll() {
        List<IncomeDTO> list = service.findAll();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<IncomeDTO> findById(@PathVariable Long id) {
        IncomeDTO obj = service.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @PostMapping
    public ResponseEntity<IncomeDTO> insert(@RequestBody IncomeDTO dto) {
        IncomeDTO obj = service.insert(dto);
        return ResponseEntity.ok().body(obj);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<IncomeDTO> update(@RequestBody IncomeDTO dto, @PathVariable Long id) {
        IncomeDTO obj = service.update(dto, id);
        return ResponseEntity.ok().body(obj);
    }
}
