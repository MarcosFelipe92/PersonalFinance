package com.marcos.personafinance.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "tb_account")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double balance;

    @JsonIgnore
    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL)
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "account")
    private List<Expense> expenses = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "account")
    private List<Income> incomes = new ArrayList<>();

    public Account() {

    }

    public Account(Long id, Double balance, User user) {
        this.id = id;
        this.balance = balance;
        this.user = user;
    }

    public void deposit(Double amount) {
        if (amount < 0) {
            System.out.println("O valor deve ser maior que zero");
        }
        balance += amount;
    }

    public void withdraw(Double amount) {
        if (amount > balance) {
            throw new IllegalArgumentException("Não existe saldo suficiente");
        }
        balance -= amount;
    }
}
