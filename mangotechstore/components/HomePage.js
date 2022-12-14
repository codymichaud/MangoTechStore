import styles from '../styles/HomePage.module.css'
import React from "react";
import { useTheme as useNextTheme } from 'next-themes'
import { useTheme } from '@nextui-org/react';
import { Card, Loading, Col, Text, Grid, Row, Button, Progress } from '@nextui-org/react';
import axios from 'axios';
import history from "history";
import {streamImage} from '../../mangotechstore/public/mq3.jpg';


export default function HomePage() {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [channelID, setChannelID] = React.useState('857435911');
    const [accessToken, setAccessToken] = React.useState('tmdtj8bc9eq383gql7uykjtm1r6lkg');
    const [channelInfo, setChannelInfo] = React.useState(null);
    const [channelName, setChannelName] = React.useState('Spit Roast GanG');
    const [streams, setStreams] = React.useState(null);
    const [clientID, setClientID] = React.useState('vyohv0woocxlcesczlgrmeksszijqa');
    const [userInfo, setUserInfo] = React.useState(null);
    const [streamFollowers, setStreamFollowers] = React.useState(null);

    React.useEffect(() => {
        if (channelInfo === null){
            const getChannelInfo = axios.get(`https://api.twitch.tv/helix/channels?broadcaster_id=${channelID}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Client-Id': `${clientID}`,
                }
            })
            getChannelInfo.then(res => {
                console.log('heres some channel data', res)
                setChannelInfo(res.data.data[0]);
            })
        }
        console.log('channel info', channelInfo);
    })

    React.useEffect(() => {
        if (userInfo === null) {
            const getUserInfo = axios.get(`https://api.twitch.tv/helix/users?id=${channelID}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Client-Id': `${clientID}`,
                }
            })
            getUserInfo.then(resp => {
                console.log('heres some user data', resp);
                setUserInfo(resp.data.data[0]);
            })
        }
        console.log('user info', userInfo);
    })
    React.useEffect(() => {
        if (streams === null) {
            const getStreams = axios.get(`https://api.twitch.tv/helix/videos?user_id=${channelID}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Client-Id': `${clientID}`,
                }
            })
            getStreams.then(respo => {
                console.log('sum stream info', respo)
                setStreams(respo.data.data);
            })
        }
        console.log('stream info', streams);
    })

    React.useEffect(() => {
        if (streamFollowers === null) {
            const getFollowers = axios.get(`https://api.twitch.tv/helix/users/follows?to_id=${channelID}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Client-Id': `${clientID}`,
                }
            })
            getFollowers.then(respos => {
                console.log('sum stream info', respos)
                setStreamFollowers(respos.data.data);
            })
        }
    })
        
    const latestStream = () => {
        const dayjs = require('dayjs')
        console.log('checking for latest stream', streams);
        if (streams === null) {
            return true;
        }
        const newStream = streams[0];
        console.log('new stream', newStream);
        return (
            <Card isPressable css={{ w: "100%", h: "400px", mt: '4rem', mb: '3rem' }}>
            <Card.Body css={{ p: 0 }}>
              <Card.Image
                src={newStream.thumbnail_url}
                width="100%"
                height="90%"
                objectFit="cover"
                alt="Card example background"
              />
            </Card.Body>
            <Card.Footer
              isBlurred
              css={{
                position: "absolute",
                bgBlur: "#ffffff66",
                borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                bottom: 0,
                zIndex: 1,
              }}
            >
              <Col sm={12}>
                <Text color="#000" size={14}>
                    {dayjs(newStream.created_at).format('dddd MMMM D, YYYY')}
                </Text>
                <Text color="#000" size={14} css={{ mt: '5px' }}>
                    {newStream.title}
                </Text>
              </Col>
            </Card.Footer>
          </Card>
        )
    }

    const streamGoals = () => {
        if (streamFollowers === null || streams === null) {
            return true;
        }
        const newStream = streams[0];
        console.log('checking progress', streamFollowers.length * 10)
        return (
            <Card isPressable css={{ w: "100%", h: "400px", mt: '2.5rem', mb: '3rem', ml: '2.5rem', mr: '2.5rem' }}>
                <Card.Header css={{ position: "absolute", zIndex: 1, top: 5, ml: '2px' }}>
                    <Text className='text-base' size={12} weight="bold" transform="uppercase" color="#9E9E9E">
                        Help us reach our goals!
                    </Text>
                </Card.Header>
                <Card.Body>
                    <Grid.Container gap={2} css={{ mt: '1.5rem' }}>
                        <Grid xs={12}>
                            <Col>
                                <Text className='text-base' size={12} weight="bold" transform="uppercase" color="#9E9E9E">
                                    Subscribers (Lets hit 10!!) {`${streamFollowers.length} / 10`}
                                </Text>
                                <Progress shadow color="warning" value={streamFollowers.length * 10} css={{ mt: '3px' }} />
                            </Col>
                        </Grid>
                        <Grid xs={12}>
                            <Col>
                                <Text className='text-base' size={12} weight="bold" transform="uppercase" color="#9E9E9E">
                                    Latest Stream Views (Lets hit 10!!) {`${newStream.view_count} / 10`}
                                </Text>
                                <Progress shadow color="error" value={newStream.view_count * 10} css={{ mt: '3px' }} />
                            </Col>
                        </Grid>
                        <Grid xs={12}>
                            <Col>
                                <Text className='text-base' size={12} weight="bold" transform="uppercase" color="#9E9E9E">
                                    Last Stream Views (Lets hit 10!!) {`${newStream.view_count} / 10`}
                                </Text>
                                <Progress shadow color="error" value={newStream.view_count * 10} css={{ mt: '3px' }} />
                            </Col>
                        </Grid>
                    </Grid.Container>
                </Card.Body>
            </Card>
        )
    }

    
        
    

    
    
    if (error === '404') {
        history.push('/404');
    }
    if (loading === true) {
    return (
        <Loading className='align-items-center' color='secondary' type='points-opacity' />
    )
   }

    return (
        <div className={styles.homePage}>
            <Grid.Container justify="center">
                <Grid xs={4}>
                    <Card
                    css={{
                        mt: '2.5rem',
                        ml: '2.5rem',
                        mr: '2.5rem',
                        height: '25rem',

                    }}
                    >
                        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5, ml: '2px' }}>
                            <Col>
                                <Text className='text-base' size={12} weight="bold" transform="uppercase" color="#9E9E9E">
                                    Welcome to
                                </Text>
                                <Text 
                                    className='text-4xl'
                                h3 
                                css={{
                                textGradient: "45deg, $yellow600 -20%, $red600 100%",
                                }}
                                weight="bold"
                                >
                                    {channelName}
                                </Text>
                            </Col>
                        </Card.Header>
                        <Card.Body>
                            
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={4}>
                    {latestStream()}
                </Grid>
                <Grid xs={4}>
                    {streamGoals()}
                </Grid>
            </Grid.Container>
        </div>
    )
}