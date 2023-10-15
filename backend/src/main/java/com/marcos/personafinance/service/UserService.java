package com.marcos.personafinance.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marcos.personafinance.dto.RoleDTO;
import com.marcos.personafinance.dto.UserDTO;
import com.marcos.personafinance.model.Role;
import com.marcos.personafinance.model.User;
import com.marcos.personafinance.repository.RoleRepository;
import com.marcos.personafinance.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private RoleRepository roleRepository;

    public List<UserDTO> findAll() {
        return repository.findAll().stream().map(x -> new UserDTO(x)).collect(Collectors.toList());
    }

    public UserDTO findById(Long id) {
        User entity = repository.findById(id).get();
        return new UserDTO(entity, entity.getRoles());
    }

    @Transactional
    public UserDTO insert(UserDTO dto) {
        User entity = new User();
        dtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new UserDTO(entity);
    }

    @Transactional
    public UserDTO update(UserDTO dto, Long id) {
        User entity = repository.getReferenceById(id);
        dtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new UserDTO(entity);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public void dtoToEntity(UserDTO dto, User entity) {
        entity.setCpf(dto.getCpf());
        entity.setName(dto.getName());
        entity.setEmail(dto.getEmail());
        entity.setPassword(dto.getPassword());
        entity.setPhone(dto.getPhone());

        entity.getRoles().clear();
        for (RoleDTO roleDto : dto.getRoles()) {
            Role role = roleRepository.getReferenceById(roleDto.getId());
            entity.getRoles().add(role);
        }
    }
}
