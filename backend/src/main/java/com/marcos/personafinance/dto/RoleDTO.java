package com.marcos.personafinance.dto;

import com.marcos.personafinance.model.Role;

import lombok.Data;

@Data
public class RoleDTO {

    private Long id;
    private String name;

    public RoleDTO() {

    }

    public RoleDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public RoleDTO(Role entity) {
        id = entity.getId();
        name = entity.getName();
    }
}
