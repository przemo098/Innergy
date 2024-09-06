import {ServiceType} from "../types/ServiceType";
import {ServiceYear} from "../types/ServiceYear";
import {calculateDiscounts} from "./discountService";

const sum = (values: number[]): number => values.reduce((total, value) => total + value, 0);

function validate(selectedServices: ServiceType[], selectedYear: ServiceYear){
		if(selectedYear < 2020 || selectedYear > 2022)
				throw new Error("Argument out of range");

		if(selectedServices.includes("BlurayPackage") && !selectedServices.includes("VideoRecording")) {
				throw new Error("BlurayPackage should not be added if VideoRecording was not added.");
		}
}

export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear) => {
		validate(selectedServices, selectedYear);

		const basePrices = selectedServices.map(service => servicePrices[selectedYear][service]);
		const basePrice = sum(basePrices);

		const discounts = calculateDiscounts(selectedServices, selectedYear);
		const discountSum = sum(discounts.flatMap(discount => Object.values(discount)));

		const finalPrice = basePrice - discountSum;

		return { basePrice, finalPrice };
};

const servicePrices: Record<ServiceYear, Record<ServiceType, number>> = {
		2020: {
				Photography: 1700,
				VideoRecording: 1700,
				BlurayPackage: 300,
				TwoDayEvent: 400,
				WeddingSession: 600,
		},
		2021: {
				Photography: 1800,
				VideoRecording: 1800,
				BlurayPackage: 300,
				TwoDayEvent: 400,
				WeddingSession: 600,
		},
		2022: {
				Photography: 1900,
				VideoRecording: 1900,
				BlurayPackage: 300,
				TwoDayEvent: 400,
				WeddingSession: 600,
		},
};
