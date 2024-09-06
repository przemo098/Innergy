import {ServiceType} from "../types/ServiceType";
import {ServiceYear} from "../types/ServiceYear";

export const calculateDiscounts = (selectedServices: ServiceType[], selectedYear: ServiceYear): Record<string, number>[] => {
		const discounts: Record<string, number>[] = [];

		const addDiscount = (description: string, amount: number) => discounts.push({ [description]: amount });

		const hasWeddingSession = selectedServices.includes("WeddingSession");
		const hasPhotography = selectedServices.includes("Photography");
		const hasVideoRecording = selectedServices.includes("VideoRecording");

		if (hasWeddingSession) {
				if (hasPhotography) {
						if(selectedYear < 2020 || selectedYear > 2022) throw "Please adjust the logic"; // or log
						const discountAmount = selectedYear === 2022 ? 600 : 300;
						addDiscount(`${selectedYear} Photography & WeddingSession`, discountAmount);
				} else if (hasVideoRecording) {
						addDiscount("VideoRecording during wedding", 300);
				}
		}

		if (hasPhotography && hasVideoRecording) {
				if(selectedYear < 2020 || selectedYear > 2022) throw "Please adjust the logic"; // or log
				const discountAmount = selectedYear === 2020 ? 1200 : 1300;
				addDiscount(`${selectedYear} VideoRecording + Photography`, discountAmount);
		}

		return discounts;
};
