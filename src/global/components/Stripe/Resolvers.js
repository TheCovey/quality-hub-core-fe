import { gql } from 'apollo-boost';

export const PAYMENT = gql`
	mutation PAYMENT($amount: Int!, $source: String!, $coach: String!) {
		stripeDirectCharge(
			amount: $amount
			source: $source
			coachId: $coach
			currency: "USD"
		) {
			success
			error
		}
	}
`;
