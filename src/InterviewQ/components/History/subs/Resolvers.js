import { gql } from 'apollo-boost';

export const UPDATE_REVIEW = gql`
  mutation updateReview($id:  String!, $rating: Int, $review: String) {
    updateReview(id: $id, rating: $rating, review: $review) {
      id
      rating
      review
    }
  }
`