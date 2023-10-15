package com.marcos.personafinance.model.enums;

public enum IncomeType {
	SALARIO(1),
	BONUS(2),
	FREELANCE(3),
	EXTRAS(4);

	private int code;

	private IncomeType(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}

	public static IncomeType valueOf(int code) {
		for (IncomeType order : IncomeType.values()) {
			if (order.getCode() == code) {
				return order;
			}
		}
		throw new IllegalArgumentException("Invalid IncomeType code");
	}
}
