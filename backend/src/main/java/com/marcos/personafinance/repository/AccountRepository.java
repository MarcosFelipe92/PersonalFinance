package com.marcos.personafinance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.marcos.personafinance.model.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {

}
