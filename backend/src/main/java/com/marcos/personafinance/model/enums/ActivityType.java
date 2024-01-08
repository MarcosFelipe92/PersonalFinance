package com.marcos.personafinance.model.enums;

public enum ActivityType {
    EXPENSE("expense"),
    INCOME("income");

    private String code;

    private ActivityType(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

}
