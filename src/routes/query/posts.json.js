import { client } from '$lib/utilities/apolloClient.js';
import { gql } from '@apollo/client/core/core.cjs.js';

export const post = async (request) => {
	const { limit } = request.body;

	try {
		const query = gql`
			query Posts($limit: Int!) {
				posts(limit: $limit) {
					posts {
						slug
					}
				}
			}
		`;
		const result = await client.query({
			query,
			variables: { limit }
		});

		return {
			body: JSON.stringify({ data: result })
		};
	} catch (err) {
		return {
			status: 500,
			error: 'Error retreiving data'
		};
	}
};
