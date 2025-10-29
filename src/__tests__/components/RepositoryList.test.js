import { Text, View } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { RepositoryListContainer  } from "../../components/RepositoryList";


describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

        // Render the RepositoryListContainer with the test repositories
        render(<RepositoryListContainer repositories={repositories} />);
      
        // Get all repository items rendered
        const repositoryItems = screen.getAllByTestId('repositoryItem');
        
        // Check that the correct number of repository items are rendered
        expect(repositoryItems).toHaveLength(2);

        

        // Check the first repository item
        // Note: we use regex to make the text matching case-insensitive
        // and to match substrings
        expect(repositoryItems[0]).toHaveTextContent(/jaredpalmer\/formik/i);
        expect(repositoryItems[0]).toHaveTextContent(/Build forms in React, without the tears/i);
        expect(repositoryItems[0]).toHaveTextContent(/TypeScript/i);
        expect(repositoryItems[0]).toHaveTextContent(/21.9k/i); // stargazersCount
        expect(repositoryItems[0]).toHaveTextContent(/1.6k/i); // forksCount
        expect(repositoryItems[0]).toHaveTextContent(/88/i); // ratingAverage
        expect(repositoryItems[0]).toHaveTextContent(/3/i); // reviewCount

        // Check the second repository item
        expect(repositoryItems[1]).toHaveTextContent(/async-library\/react-async/i);
        expect(repositoryItems[1]).toHaveTextContent(/Flexible promise-based React data loader/i);
        expect(repositoryItems[1]).toHaveTextContent(/JavaScript/i);
        expect(repositoryItems[1]).toHaveTextContent(/1.8k/i); // stargazersCount
        expect(repositoryItems[1]).toHaveTextContent(/69/i); // forksCount
        expect(repositoryItems[1]).toHaveTextContent(/72/i); // ratingAverage
        expect(repositoryItems[1]).toHaveTextContent(/3/i); // reviewCount

    });
  });
});