import { gql } from 'apollo-boost';

export const GET_AVAILABILITIES = gql`
query availabilities ($coach_id: String!){
  availabilitiesByCoach (coach_id: $coach_id){
    id
    year
    month
    day
    hour
    minute
    isOpen
    recurring
    uniquecheck
    coach{
      id
      first_name
      last_name
      post{
        price
      }
    }
  }
  }
  `

export const CREATE_BOOKING = gql`
  mutation createBooking (
    $year: Int!
    $month: Int!
    $day: Int!
    $hour: Int!
    $minute: Int!
    $coach: String!
    $availabilityA: String!
    $availabilityB: String!
    $pending: Boolean
    $confirmed: Boolean
    $interviewQuestions: String
    $interviewGoals: String
    $resumeURL: String
    $price: Int!
  ) {
    createBooking(
      year: $year
      month:  $month
      day: $day
      hour: $hour
      minute: $minute
      coach: $coach
      availabilityA: $availabilityA
      availabilityB: $availabilityB
      pending: $pending
      confirmed: $confirmed
      interviewQuestions: $interviewQuestions
      interviewGoals: $interviewGoals
      resumeURL : $resumeURL
      price: $price
    ) {
      id
      year
      month
      day
      hour
      minute
      price
      coach{
        id
      }
      seeker{
        id
      }
      pending
      confirmed
    }
  }
`