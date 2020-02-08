import { gql } from 'apollo-boost';

export const GET_POSTS = gql`
	query GET_POSTS(
		$industry: String
		$price: String
		$orderBy: String
		$tags: String
		$ids: [String]
	) {
		posts(
			industry: $industry
			price: $price
			orderBy: $orderBy
			tags: $tags
			ids: $ids
		) {
			id
			price
			position
			description
			company
			industry {
				id
				name
			}
			tags {
				id
				name
			}
			coach {
				id
				first_name
				last_name
				city
				state
				image_url
				personal_url
				blog_url
				twitter_url
				portfolio_url
				linkedin_url
				github_url
			}
		}
	}
`;

export const GET_USER = gql`
	query {
		me {
			id
			first_name
			last_name
			post {
				id
			}
		}
	}
`;

export const GET_INDUSTRIES = gql`
	query {
		industries {
			name
		}
	}
`;

export const GET_USERS = gql`
	query($tags: String) {
		users(keywords: $tags) {
			id
		}
	}
`;