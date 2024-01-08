package com.marcos.personafinance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marcos.personafinance.dto.ResponseTokenDTO;
import com.marcos.personafinance.dto.TokenDTO;
import com.marcos.personafinance.dto.UserDTO;
import com.marcos.personafinance.model.User;
import com.marcos.personafinance.repository.UserRepository;
import com.marcos.personafinance.security.TokenService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private TokenService service;

    @Autowired
    private UserRepository repository;

    @PostMapping
    public ResponseTokenDTO validationToken(@RequestBody TokenDTO dto) {
        String login = service.validateToken(dto.getToken());
        UserDetails user = repository.findByLogin(login);

        if (user != null) {
            return new ResponseTokenDTO(true);
        } else {
            throw new RuntimeException();
        }
    }

    @PostMapping("/get")
    public UserDTO getDataForToken(@RequestBody TokenDTO dto) {
        String login = service.validateToken(dto.getToken());
        UserDetails obj = repository.findByLogin(login);
        User user = repository.findByPassword(obj.getPassword());
        return new UserDTO(user);
    }
}
