package com.marcos.personafinance.dto;

import com.marcos.personafinance.model.Account;
import com.marcos.personafinance.model.Role;
import com.marcos.personafinance.model.User;

import lombok.Data;

@Data
public class UserDTO {

    private Long id;
    private String cpf;
    private String name;
    private String login;
    private String password;
    private String phone;
    private Role role;
    private Account account;

    public UserDTO() {

    }

    public UserDTO(Long id, String cpf, String name, String email, String password, String phone, Role role,
            Account account) {
        this.id = id;
        this.cpf = cpf;
        this.name = name;
        this.login = email;
        this.password = password;
        this.phone = phone;
        this.role = role;
        this.account = account;
    }

    public UserDTO(User entity) {
        id = entity.getId();
        name = entity.getName();
        cpf = entity.getCpf();
        login = entity.getLogin();
        password = entity.getPassword();
        phone = entity.getPhone();
        role = entity.getRole();
        account = entity.getAccount();
    }
}
