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