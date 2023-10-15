package com.marcos.personafinance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.marcos.personafinance.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
