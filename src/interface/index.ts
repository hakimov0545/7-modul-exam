export interface ICompany {
	id: number | string;
	title: string;
	description?: string;
	image?: string;
	website?: string;
}

export interface IJob {
	id: string;
	title: string;
	description: string;
	technologies: string[];
	location?: string;
	salary: string;
	phone?: string;
	email?: string;
	telegram?: string;
	instagram?: string;
	companyId: number;
}
