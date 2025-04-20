import { timezones } from '../data/cityTimezones';
import type { CitySearchItem } from '../types/citySearchItem';

export const citySearchList: CitySearchItem[] = Object.entries(timezones.zones).map(
	([zone, data]) => {
		const countryCode = data.countries[0];
		const countryName = timezones.countries[countryCode]?.name || countryCode;

		const zoneParts = zone.split('/');
		const cityName = zoneParts[1]?.replace(/_/g, ' ') || zone;

		return {
			timezone: zone,
			city: cityName,
			country: countryName,
			lat: data.lat,
			long: data.long,
			comment: data.comments,
		};
	}
);
