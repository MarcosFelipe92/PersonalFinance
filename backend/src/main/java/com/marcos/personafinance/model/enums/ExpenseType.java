package com.marcos.personafinance.model.enums;

public enum ExpenseType {
	ALIMENTACAO(1),
	EDUCACAO(2),
	LAZER(3),
	SAUDE(4),
	TRANSPORTE(5);

	private int code;

	private ExpenseType(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}

	public static ExpenseType valueOf(int code) {
		for (ExpenseType order : ExpenseType.values()) {
			if (order.getCode() == code) {
				return order;
			}
		}
		throw new IllegalArgumentException("Invalid ExpenseType code");
	}
}
