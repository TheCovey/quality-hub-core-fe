import { gql } from 'apollo-boost'

export const COACH_BOOKINGS = gql`
  query coachBooking ($coachId: String!){
    bookingsByCoach(coach_id: $coachId){
     year
     month
     day
     hour
     minute
     coach{
       first_name
       email
       id
     }
     seeker{
       first_name
       last_name
       email
       id
     }
   }
     }
  `

  export const SEEKER_BOOKINGS = gql`
  query seekerBooking ($seekerId: String!){
    bookingsBySeeker(seeker_id: $seekerId){
     year
     month
     day
     hour
     minute
     coach{
       first_name
       last_name
       email
       id
     }
     seeker{
       first_name
       last_name
       email
       id
     }
   }
     }
  `

  export const ALL_BOOKINGS = gql`
						query allBookings($coachId: String!, $seekerId: String!) {
							bookingsByCoach(coach_id: $coachId) {
                uniquecheck
                id
								year
								month
								day
								hour
                minute
                interviewQuestions
                interviewGoals
                resumeURL
								coach {
                  first_name
                  last_name
									email
									id
								}
								seeker {
                  first_name
                  last_name
									email
									id
								}
							}
							bookingsBySeeker(seeker_id: $seekerId) {
                uniquecheck
                id
								year
								month
								day
								hour
                minute
                interviewGoals
                interviewQuestions
                resumeURL
								coach {
                  first_name
                  last_name
									email
									id
								}
								seeker {
                  first_name
                  last_name
									email
									id
								}
							}
						}
					`;