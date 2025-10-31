import { gql } from '@apollo/client';

import { REPOSITORY_FIELDS, USER_FIELDS, REVIEW_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
    query {
        repositories {
            edges {
                node {
                    ...RepositoryFields
                }
            }
        }
    }
    ${REPOSITORY_FIELDS}
`;

export const GET_REPOSITORY = gql`
    query Repository($id: ID!) {
        repository(id: $id) {
            ...RepositoryFields
        }
    }
    ${REPOSITORY_FIELDS}
`;


export const GET_ME = gql`
    query {
        me {
            ...UserFields
        }
    }
    ${USER_FIELDS}
`;


export const GET_REPOSITORY_REVIEWS = gql`
    query Repository($id: ID!) {
        repository(id: $id) {
            id
            reviews {
                edges {
                    node {
                        ...ReviewFields
                    }
                }
            }
        }
    }
    ${REVIEW_FIELDS}
`;