import { gql } from 'apollo-boost';

export const CREATE_CHATUSER = gql`
  mutation createUser($userName: String!) { 
    createUser(
      userName: $userName 
    )
}`;

export const GET_QH_USER = gql`
  query {
    me{
    id
    first_name
    last_name
    chatActive
  }
}
`

// export const GET_RECIPIENT = gql`
//   query{
//     user{
//       first_name
//       last_name
//     }
//   }
// `

export const GET_USER = gql`
  query user($id: ID!){
    user(id: $id){
      image_url
      first_name
      last_name
    }
  }
`