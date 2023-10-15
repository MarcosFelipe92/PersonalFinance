package com.marcos.personafinance.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marcos.personafinance.dto.RoleDTO;
import com.marcos.personafinance.model.Role;
import com.marcos.personafinance.repository.RoleRepository;

import jakarta.transaction.Transactional;

@Service
public class RoleService {

    @Autowired
    private RoleRepository repository;

    public List<RoleDTO> findAll() {
        return repository.findAll().stream().map(x -> new RoleDTO(x)).collect(Collectors.toList());
    }

    public RoleDTO findById(Long id) {
        return new RoleDTO(repository.findById(id).get());
    }

    @Transactional
    public RoleDTO insert(RoleDTO dto) {
        Role entity = new Role();
        dtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new RoleDTO(entity);
    }

    @Transactional
    public RoleDTO update(RoleDTO dto, Long id) {
        Role entity = repository.getReferenceById(id);
        dtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new RoleDTO(entity);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public void dtoToEntity(RoleDTO dto, Role entity) {
        entity.setName(dto.getName());
    }
}
