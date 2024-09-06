import {ServiceType} from "../types/ServiceType";

export const updateSelectedServices = (
		previouslySelectedServices: ServiceType[],
		action: { type: "Select" | "Deselect"; service: ServiceType }
): ServiceType[] => {
		const { type, service } = action;
		const isSelected = previouslySelectedServices.includes(service);

		if (type === "Select" && !isSelected) {
				return validateRelatedServices([...previouslySelectedServices, service]);
		}

		if (type === "Deselect" && isSelected) {
				return validateRelatedServices(previouslySelectedServices.filter(s => s !== service));
		}

		//log.error("Not supported operation", type)
		return previouslySelectedServices;
};

const validateRelatedServices = (selectedServices: ServiceType[]): ServiceType[] => {
		const hasVideo = selectedServices.includes("VideoRecording");
		const hasPhotography = selectedServices.includes("Photography");

		return selectedServices.filter(service =>
				(service !== "BlurayPackage" || hasVideo) &&
				(service !== "TwoDayEvent" || hasPhotography || hasVideo)
		);
};



