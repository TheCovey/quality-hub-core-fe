import { string, object } from 'yup';

export const userSchema = object({
	first_name: string().required('Please enter your first name'),
	last_name: string().required('Please enter your last name'),
	email: string()
		.email('Please enter a valid email address')
		.required('Please enter your email address'),
	city: string().required('Please enter your city'),
	state: string()
		.max(2, 'Please enter your state')
		.required('Please enter your state'),
	password: string()
		.min(6, 'Password must be at least 6 characters')
		.required('Please enter a password'),
	linkedin_url: string(),
	bio: string(),
	github_url: string(),
	personal_url: string(),
	portfolio_url: string(),
	twitter_url: string(),
});
