import {ServiceType} from "./types/ServiceType";
import {ServiceYear} from "./types/ServiceYear";

export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: { type: "Select" | "Deselect"; service: ServiceType }
) => [];

export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear) => ({ basePrice: 0, finalPrice: 0 });
