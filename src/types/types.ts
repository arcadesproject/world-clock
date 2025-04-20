export type CountryTimezones = {
	name: string;
	abbr: string;
	zones: string[];
};

export type ZoneDetails = {
	name: string;
	lat: number;
	long: number;
	countries: string[];
	comments: string;
};

export type TimezoneData = {
	version: string;
	countries: Record<string, CountryTimezones>;
	zones: Record<string, ZoneDetails>;
};

export type CitySearchItem = {
	timezone: string;
	city: string;
	country: string;
	lat: number;
	long: number;
	comment?: string;
};