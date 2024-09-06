import {calculateDiscounts, validateDiscounts} from "./discountService";

describe("calculateDiscounts", () => {

		it("should return an empty array when no services are selected", () => {
				const result = calculateDiscounts([], 2021);
				expect(result).toEqual([]);
		});

		it("should throw an error if selected year is out of range for Photography & WeddingSession", () => {
				expect(() => {
						// @ts-ignore
						calculateDiscounts(["WeddingSession", "Photography"], 2019);
				}).toThrow("Please adjust the logic");

				expect(() => {
						// @ts-ignore
						calculateDiscounts(["WeddingSession", "Photography"], 2023);
				}).toThrow("Please adjust the logic");
		});

		it("should add the correct discount for Photography & WeddingSession in 2022", () => {
				const result = calculateDiscounts(["WeddingSession", "Photography"], 2022);
				expect(result).toEqual([{ "2022 Photography & WeddingSession": 600 }]);
		});

		it("should add the correct discount for Photography & WeddingSession in 2021", () => {
				const result = calculateDiscounts(["WeddingSession", "Photography"], 2021);
				expect(result).toEqual([{ "2021 Photography & WeddingSession": 300 }]);
		});

		it("should add the correct discount for VideoRecording during wedding when no photography is selected", () => {
				const result = calculateDiscounts(["WeddingSession", "VideoRecording"], 2021);
				expect(result).toEqual([{ "VideoRecording during wedding": 300 }]);
		});

		it("should throw an error if selected year is out of range for VideoRecording + Photography", () => {
				expect(() => {
						// @ts-ignore
						calculateDiscounts(["Photography", "VideoRecording"], 2019);
				}).toThrow("Please adjust the logic");

				expect(() => {
						// @ts-ignore
						calculateDiscounts(["Photography", "VideoRecording"], 2023);
				}).toThrow("Please adjust the logic");
		});

		it("should add the correct discount for VideoRecording + Photography in 2020", () => {
				const result = calculateDiscounts(["Photography", "VideoRecording"], 2020);
				expect(result).toEqual([{ "2020 VideoRecording + Photography": 1200 }]);
		});

		it("should add the correct discount for VideoRecording + Photography in 2021", () => {
				const result = calculateDiscounts(["Photography", "VideoRecording"], 2021);
				expect(result).toEqual([{ "2021 VideoRecording + Photography": 1300 }]);
		});

		it("should add multiple discounts when both combinations apply", () => {
				const result = calculateDiscounts(["WeddingSession", "Photography", "VideoRecording"], 2021);
				expect(result).toEqual([
						{ "2021 Photography & WeddingSession": 300 },
						{ "2021 VideoRecording + Photography": 1300 }
				]);
		});
});

describe('validateDiscounts', () => {

		it('should not throw an error when no duplicates exist', () => {
				const discounts = [
						{ "item1": 10 },
						{ "item2": 20 },
						{ "item3": 15 }
				];

				expect(() => validateDiscounts(discounts)).not.toThrow();
		});

		it('should throw an error when there are duplicate keys', () => {
				const discounts = [
						{ "item1": 10 },
						{ "item1": 20 }, // Duplicate key
						{ "item3": 15 }
				];

				expect(() => validateDiscounts(discounts)).toThrowError("calculateDiscounts function returns duplicates. Please check the logic.");
		});

		it('should throw an error when there are multiple duplicates', () => {
				const discounts = [
						{ "item1": 10 },
						{ "item2": 20 },
						{ "item2": 25 }, // Duplicate key
						{ "item3": 30 },
						{ "item1": 40 }  // Another duplicate key
				];

				expect(() => validateDiscounts(discounts)).toThrowError("calculateDiscounts function returns duplicates. Please check the logic.");
		});

		it('should not throw an error for an empty array of discounts', () => {
				const discounts: Record<string, number>[] = [];

				expect(() => validateDiscounts(discounts)).not.toThrow();
		});
});
