import { gql } from 'apollo-boost';

export const UPDATE_POST = gql`
mutation updatePost(
  $id: ID! 
  $price: Int
  $position: String
  $company: String
  $industryName: String
  $description: String
  $tagString: String
  $isPublished: Boolean
) {
  updatePost(
    id: $id
    price: $price
    position: $position
    company: $company
    industryName: $industryName
    description: $description
    tagString: $tagString
    isPublished: $isPublished
  ) {
    id
    price
    position
    company
    industry{
      id
      name
    }
    description
    tags{
      id
      name
    }
    isPublished
  }
}
`

export const GET_INDUSTRIES = gql `
  query industries{
    industries{
    name
    id
  }
}
`

export const GET_COACH_POST = gql `
query coachPost ($coach_id: String!){
  postByCoach(coach_id: $coach_id) {
    coach{
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
    id
    company
    position
    description
    price
    isPublished
    industry{
      id
      name
    }
    tags{
      id
      name
    }
  }
}
`

export const REMOVE_TAG = gql`
  mutation ($id: ID!, $tagID: String!) {
    removeTagFromPost(id: $id, tagID: $tagID) {
      tags {
        id
        name
      }
    }
  }
`
export const GET_POSTS = gql`
	query {
		posts {
			id
		}
	}
`;

// GraphQL Mutation to delete post associated with user
export const DELETE_POST = gql`
	mutation {
		deletePost {
			id
		}
	}
`;