import fetch from 'node-fetch';
import { ApolloClient, HttpLink } from '@apollo/client/core/core.cjs.js';
import { InMemoryCache } from '@apollo/client/cache/cache.cjs.js';
import { GRAPHQL_ENDPOINT } from '$lib/config';

class Client {
	constructor() {
		if (Client._instance) {
			return Client._instance;
		}
		Client._instance = this;

		this.client = this.setupClient();
	}

	setupClient() {
		const link = new HttpLink({
			uri: GRAPHQL_ENDPOINT,
			fetch
		});
		const client = new ApolloClient({
			credentials: 'include',
			link,
			cache: new InMemoryCache()
		});
		return client;
	}
}

export const client = new Client().client;
