package com.marcos.personafinance.dto;

import java.util.HashSet;
import java.util.Set;

import com.marcos.personafinance.model.Role;
import com.marcos.personafinance.model.User;

import lombok.Data;

@Data
public class UserDTO {

    private Long id;
    private String cpf;
    private String name;
    private String email;
    private String password;
    private String phone;

    private Set<RoleDTO> roles = new HashSet<>();

    public UserDTO() {

    }

    public UserDTO(Long id, String cpf, String name, String email, String password, String phone) {
        this.id = id;
        this.cpf = cpf;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
    }

    public UserDTO(User entity) {
        id = entity.getId();
        name = entity.getName();
        cpf = entity.getCpf();
        email = entity.getEmail();
        password = entity.getPassword();
        phone = entity.getPhone();
    }

    public UserDTO(User entity, Set<Role> roles) {
        this(entity);
        roles.forEach(r -> this.roles.add(new RoleDTO(r)));
    }
}
