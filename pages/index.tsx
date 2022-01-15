import {
  Box,
  BoxProps,
  Button,
  Heading,
  HStack,
  Spacer,
  Text,
  chakra,
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
const ChakraBox = chakra(motion.div)

const GRAPHQL_ENDPOINT = 'https://api.spacex.land/graphql/'

type Launch = {
  id: string
  mission_name: string
}

const Launches = () => {
  const [launches, setLaunches] = useState<Launch[]>()
  useEffect(() => {
    async function fetchLaunches() {
      const response = await request(GRAPHQL_ENDPOINT, LAUNCHES_QUERY)

      setLaunches(response.launchesPast)
    }

    fetchLaunches()
  }, [])

  return (
    <Box mt="2">
      {launches?.map((launch) => (
        <Text key={launch.id}>{launch.mission_name}</Text>
      ))}
    </Box>
  )
}

type CompProps = {
  isVisible: boolean
  setShow: Dispatch<SetStateAction<boolean>>
}

const ToogleVisibilty = ({ isVisible, setShow }: CompProps) => {
  return (
    <HStack>
      <Button onClick={() => setShow((show) => !show)} size="sm">
        {isVisible ? 'Show' : 'Hide'}
      </Button>
    </HStack>
  )
}

const Home: NextPage = () => {
  const [show, setShow] = useState(true)

  return (
    <Box maxW="container.md" mx="auto" mt="8">
      <HStack>
        <Heading>Hello, GraphQL!</Heading>
        <Spacer />
        <ToogleVisibilty isVisible={show} setShow={setShow} />
      </HStack>
      <MotionBox animate={{ opacity: show ? 1 : 0 }} bg="whatsapp.100">
        <Launches />
      </MotionBox>
    </Box>
  )
}

export default Home
