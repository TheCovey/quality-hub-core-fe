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
    coach{
      id
    }
  }
  }
  `

  export const CREATE_AVAILABILITY = gql`
  mutation createAvailability(
      $hour: Int!
      $minute: Int!
      # $coach: String!
      $year: Int!
      $month: Int!
      $day: Int!
      # $isOpen: Boolean!
      $recurring: Boolean!
  ) {
    createAvailability(
      hour: $hour
      minute: $minute
      # coach: $coach
      year: $year
      month: $month
      day: $day
      # isOpen: $isOpen
      recurring: $recurring
    ) {
      id
      uniquecheck
      hour
      minute
      coach{
        id
      }
      year
      month
      day
      # isOpen
      recurring
    }
  }
  `

  export const DELETE_AVAILABILITY = gql`
    mutation deleteAvailability(
      $uniquecheck: String!
    ) { deleteAvailability(
        uniquecheck: $uniquecheck
    ) {
      id
    }
  }
  `

  export const AVAIL_BY_UNIQUE = gql`
    query availabilityByUniquecheck($uniquecheck: String!){
      availabilityByUniquecheck(uniquecheck: $uniquecheck){
        id
      }
    }
  `