import React from 'react'
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Pagination from './Pagination'

const MainPage = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        axios.get(`https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${page}`).then((r) => {
            setLoading(false)
            setData(r.data)
        }).catch((e) => {
            setLoading(true)
            console.log(e);
        })
    }, [page])

    // console.log(page);

    return (
        <div>
            <Box bg={"rgb(230,230,230)"} w='80%' p={4} color='white' m={"auto"}>
                <Box w='90%' p={4} color='white' m={"auto"}>
                    <Heading as='h1' size='lg' fontFamily={"inherit"} color="black">
                        Most Starred Repos
                    </Heading>
                </Box>
                <Box>
                    <button disabled={page == 1} onClick={() => setPage(p => p - 1)}>Prev</button>
                    <Pagination lastpage={4} currentPage={page} onPageChange={setPage} />
                    <button onClick={() => setPage(p => p + 1)}>Next</button>
                </Box>
                {loading ?
                    <h1 style={{ color: "black" }}>Loading.....</h1>
                    :
                    <Box bg={"rgb(232,232,227)"} w='90%' p={4} color='black' m={"auto"} >
                        {data.items?.map((e) =>
                            <Box w='100%' p={4} color='black' m={"auto"}>
                                <Accordion allowToggle>
                                    <AccordionItem>
                                        <h2>
                                            <AccordionButton>
                                                <SimpleGrid columns={[1, null, 2]} spacing='10px'>
                                                    <Box w='80%' p={4} color='black'>
                                                        <img style={{ borderRadius: "5px" }} src={e.owner.avatar_url} alt="avtar" />
                                                    </Box>
                                                    <Box p={4} color='black' display={"flex"}>
                                                        <Box p={4} color='black'>
                                                            <Heading as='h6' size='md' mt="10px">
                                                                {e.full_name}
                                                            </Heading>
                                                            <Heading as='h6' size='xs' mt="20px">
                                                                {e.description}
                                                            </Heading>
                                                            <Box color='black' display={"flex"} mt="20px" >
                                                                <Text fontSize='xs'>No. of Star's  {e.stargazers_count}</Text>
                                                                <Text fontSize='xs'>No. Of issue's {e.open_issues_count}</Text>
                                                                <Text fontSize='xs'>Last push at {e.pushed_at} by {e.owner.login}</Text>
                                                            </Box>
                                                        </Box>
                                                        <Box w='20%' h={10} p={4} color='white' marginTop="80px">
                                                            <AccordionIcon w={10} h={10} color={'black'} />
                                                        </Box>
                                                    </Box>
                                                </SimpleGrid>
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                            <a href={e.html_url}>
                                                <img src={`https://github-readme-streak-stats.herokuapp.com/?user=${e.owner.login}&stroke=ffffff&background=1c1917&ring=0891b2&fire=0891b2&currStreakNum=ffffff&currStreakLabel=0891b2&sideNums=ffffff&sideLabels=ffffff&dates=ffffff&hide_border=true`} />
                                            </a>
                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>
                            </Box>
                        )}
                    </Box>
                }
                <Box>
                    <button disabled={page == 1} onClick={() => setPage(p => p - 1)}>Prev</button>
                    <Pagination lastpage={4} currentPage={page} onPageChange={setPage} />
                    <button onClick={() => setPage(p => p + 1)}>Next</button>
                </Box>
            </Box>
        </div>
    )
}

export default MainPage
