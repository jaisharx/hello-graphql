import {
  Box,
  BoxProps,
  Button,
  Heading,
  HStack,
  Spacer,
  Spinner,
  Text,
} from '@chakra-ui/react'
import { request, gql } from 'graphql-request'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import type { Dispatch, SetStateAction } from 'react'
import type { NextPage } from 'next'

const LAUNCHES_QUERY = gql`
  {
    launchesPast(limit: 10) {
      id
      mission_name
    }
  }
`

const MotionBox = motion<BoxProps>(Box)

const GRAPHQL_ENDPOINT = 'https://api.spacex.land/graphql/'

type Launch = {
  id: string
  mission_name: string
}

type CompProps = {
  isVisible: boolean
  isLoading: boolean
  setShow: Dispatch<SetStateAction<boolean>>
}

const ToogleVisibilty = ({ isVisible, isLoading, setShow }: CompProps) => {
  return (
    <HStack>
      {isLoading ? (
        <Spinner />
      ) : (
        <Button onClick={() => setShow((show) => !show)} size="sm">
          {isVisible ? 'Hide' : 'Show'}
        </Button>
      )}
    </HStack>
  )
}

const Home: NextPage = () => {
  const [launches, setLaunches] = useState<Launch[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [show, setShow] = useState(true)

  useEffect(() => {
    async function fetchLaunches() {
      const response = await request(GRAPHQL_ENDPOINT, LAUNCHES_QUERY)

      setIsLoading(false)
      setLaunches(response.launchesPast)
    }

    fetchLaunches()
  }, [])

  return (
    <Box maxW="container.md" mx="auto" mt="8">
      <HStack>
        <Heading>Hello, GraphQL!</Heading>
        <Spacer />
        <ToogleVisibilty
          isVisible={show}
          isLoading={isLoading}
          setShow={setShow}
        />
      </HStack>
      <MotionBox animate={{ opacity: show ? 1 : 0 }}>
        <Box mt="2">
          {launches?.map((launch) => (
            <Text key={launch.id}>{launch.mission_name}</Text>
          ))}
        </Box>
      </MotionBox>
    </Box>
  )
}

export default Home
