import { gql } from 'apollo-boost';

//GraphQuail Mutation
export const EDIT_USER = gql`
	mutation update(
		$first_name: String
		$last_name: String
		$email: String
		$city: String
		$state: String
		$gender: String
		$personal_url: String
		$blog_url: String
		$twitter_url: String
		$linkedin_url: String
		$github_url: String
		$portfolio_url: String
		$bio: String
		# $payment_info: Boolean
	) {
		update(
			first_name: $first_name
			last_name: $last_name
			email: $email
			city: $city
			state: $state
			gender: $gender
			personal_url: $personal_url
			blog_url: $blog_url
			twitter_url: $twitter_url
			linkedin_url: $linkedin_url
			github_url: $github_url
			portfolio_url: $portfolio_url
			bio: $bio
			# payment_info: $payment_info
		) {
			id
			first_name
			last_name
			email
			city
			state
			gender
			personal_url
			blog_url
			twitter_url
			linkedin_url
			github_url
			portfolio_url
			bio
			# payment_info
		}
	}
`;
