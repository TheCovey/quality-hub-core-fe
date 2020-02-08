import { gql } from 'apollo-boost';

export const GET_USER = gql`
	query {
		me {
			id
			first_name
			last_name
			linkedin_url
			twitter_url
			city
			state
			image_url
			post {
				id
				description
			}
		}
	}
`;

export const INDUSTRIES = gql`
	query {
		industries {
			name
		}
	}
`;

export const ADD_POST = gql`
	mutation createPost(
		$price: Int!
		$position: String!
		$industryName: String!
		$description: String!
		$tagString: String
		$company: String!
		$isPublished: Boolean!
	) {
		createPost(
			price: $price
			position: $position
			industryName: $industryName
			description: $description
			tagString: $tagString
			company: $company
			isPublished: $isPublished
		) {
			id
			price
			position
			industry {
				id
				name
			}
			description
			tags {
				id
				name
			}
			company
			isPublished
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