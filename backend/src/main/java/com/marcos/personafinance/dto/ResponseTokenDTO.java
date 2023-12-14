package com.marcos.personafinance.dto;

public class ResponseTokenDTO {
    private boolean valid;

    public ResponseTokenDTO() {

    }

    public ResponseTokenDTO(boolean valid) {
        this.valid = valid;
    }

    public boolean isValid() {
        return valid;
    }
}
