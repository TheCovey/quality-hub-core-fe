import { gql } from 'apollo-boost';

export const CREATE_REPORT = gql`
	mutation CreateReport(
		$uniqueBooking: String!
		$strengths: String!
		$growthAreas: String!
		$suggestions: String!
		$comments: String
		$isSent: Boolean!
	) {
		createReport(
			uniqueBooking: $uniqueBooking
			strengths: $strengths
			growthAreas: $growthAreas
			suggestions: $suggestions
			additionalComments: $comments
			isSent: $isSent
		) {
			id
			booking {
				uniquecheck
			}
		}
	}
`;
