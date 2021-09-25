import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink
}   from "@apollo/client"

import App from "../App"
import React from 'react'

const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})



export default (
    <ApolloProvider client={client}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </ApolloProvider>
)