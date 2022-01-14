import { useEffect, useState } from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import { request, gql } from 'graphql-request'
import type { NextPage } from 'next'

const LAUNCHES_QUERY = gql`
  {
    launchesPast(limit: 10) {
      id
      mission_name
    }
  }
`

const GRAPHQL_ENDPOINT = 'https://api.spacex.land/graphql/'

type Launch = {
  id: string
  mission_name: string
}

const Home: NextPage = () => {
  const [launches, setLaunches] = useState<Launch[]>()

  useEffect(() => {
    async function fetchLaunches() {
      const response = await request(GRAPHQL_ENDPOINT, LAUNCHES_QUERY)

      setLaunches(response.launchesPast)
    }

    fetchLaunches()
  }, [])

  return (
    <Box maxW="container.md" mx="auto" mt="8">
      <Heading>Hello, GraphQL!</Heading>
      {launches?.map((launch) => (
        <Text key={launch.id}>{launch.mission_name}</Text>
      ))}
    </Box>
  )
}

export default Home
