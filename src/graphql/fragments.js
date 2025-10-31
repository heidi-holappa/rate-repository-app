import {gql} from "@apollo/client";

export const REPOSITORY_FIELDS = gql`
   fragment RepositoryFields on Repository {
     id
     description
     fullName
     language
     stargazersCount
     forksCount
     ratingAverage
     reviewCount
     ownerAvatarUrl
     url
  }
 `

 export const USER_FIELDS = gql`
   fragment UserFields on User {
      id
      username
   }
`

export const REVIEW_FIELDS = gql`
   fragment ReviewFields on Review {
      id
      text
      rating
      createdAt
      user {
         ...UserFields
      }
   }
   ${USER_FIELDS}
` 