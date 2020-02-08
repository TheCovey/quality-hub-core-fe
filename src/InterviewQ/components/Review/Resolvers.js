import { gql } from 'apollo-boost';

export const CREATE_REVIEW = gql`
  mutation createReview( $uniqueBooking: String! $rating: Int! $review: String!) { 
    createReview(
      uniqueBooking: $uniqueBooking 
      rating: $rating 
      review: $review
    ){
      id
      rating
      review
  }
}`;

export const GET_SEEKER_BOOKINGS = gql`
	query getSeekerHistory($seeker_id: String!) {
		bookingsBySeeker(seeker_id: $seeker_id) {
			id
			year
			month
			day
			hour
			minute
			price
			coach {
				id
				first_name
				last_name
				# post {
				# 	id
				# 	price
				# }
			}
			uniquecheck
			report {
				id
				strengths
				growthAreas
				suggestions
				additionalComments
			}
			review {
				id
				rating
				review
			}
		}
	}
`;