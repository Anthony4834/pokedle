import axios from 'axios'
import React from 'react'
import Modal from '../Modal/Modal'
import { BASE_QUERY } from '../page/page'
import { BarChart } from '../stats/BarChart'
import { LineChart } from '../stats/LineChart'
import { PieChart } from '../stats/PieChart'
import { formatDate, getDateFromToday, shapeDailyData, shapeDataPie } from './stats-utils'
import './statsModal.css'


export const StatsModal = ({ updateMetric, mobile, metric }) => {
    const [dailyPlayerData, setDailyPlayerData] = React.useState()
    const [weeklyPlayerData, setWeeklyPlayerData] = React.useState([])
    const [dailyGameModeData, setDailyGameModeData] = React.useState()
    const [weeklyGameModeData, setWeeklyGameModeData] =
        React.useState(undefined)

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    const [timeFrame, setTimeFrame] = React.useState(8);

    React.useEffect(() => {
        if(!timeFrame || isNaN(timeFrame) || timeFrame < 1) return;
        //new players
        axios
            .get(`${BASE_QUERY}players/new`, {
                params: {
                    startDate: formatDate(getDateFromToday(timeFrame - 1, 0, true)),
                    endDate: formatDate(getDateFromToday(0, 0, true)),
                },
            })
            .then(({ data }) => {
                if (data.data.length > 0) {
                    setWeeklyPlayerData(data.data);
                    console.log(data.data)
                }                
                
            })
        
        //weekly stats
        axios
            .get(`${BASE_QUERY}success/stats`, {
                params: {
                    startDate: formatDate(getDateFromToday(timeFrame - 1, 0, true)),
                    endDate: formatDate(getDateFromToday(0)),
                },
            })
            .then(({ data }) => {
                setWeeklyGameModeData(data)
            })

        //daily stats
        axios
            .get(`${BASE_QUERY}success/stats`, {
                params: {
                    startDate: formatDate(getDateFromToday(timeFrame - 1, 0, true)),
                },
            })
            .then(({ data }) => {
                setDailyGameModeData(data)
            })
    }, [timeFrame])

    const isLoading = () =>
        weeklyGameModeData === undefined || weeklyPlayerData === undefined

    const modalProps = {
        className: 'statsModal',
        target: (
            <img
                className='modalTargetIcon'
                src={'https://img.icons8.com/?size=256&id=47341&format=png'}
                alt='statistics'
            ></img>
        ),
    }

    return (
        <Modal
            {...modalProps}
            body={
                <div
                    className='stats-modal-content'
                    style={{
                        width: '45vw',
                        height: '800px',
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '10px',
                        overflowY: 'scroll',
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <p>Analytics</p>
                    </div>
                    <div style={{marginLeft: '5%', display: 'flex', alignItems: 'center', columnGap: '3%'}}>
                        <p style={{fontSize: '11pt'}}>Time Frame (days)</p>
                        <input placeholder={timeFrame} style={{fontSize: '11pt'}} type='number' onChange={(e) => setTimeFrame(e.target.value)} />
                    </div>
                    {!!dailyGameModeData && !!weeklyPlayerData && (
                        <BarChart
                            data={[
                                ['', 'Value'],
                                ...shapeDailyData(dailyGameModeData),
                                ['Players', weeklyPlayerData.reduce((accumulator, currentValue) => {
                                    // Extract the subarray [1][0] and add it to the accumulator
                                    return accumulator + currentValue[1][0];
                                }, 0)],
                                ['New Players', weeklyPlayerData.reduce((accumulator, currentValue) => {
                                    // Extract the subarray [1][1] and add it to the accumulator
                                    return accumulator + currentValue[1][1];
                                }, 0)],                            ]}
                            
                            header={'Quick stats since ' + formatDate(getDateFromToday(timeFrame - 1, 0, true))}
                        />
                    )}
                    {weeklyPlayerData.length >= 1 && (
                        <LineChart
                            data={[
                                ['Day', 'New Players', 'Total Players'],
                                ...weeklyPlayerData.map(item => [
                                    item[0],
                                    item[1][0],
                                    item[1][1],
                                ]),
                            ]}
                        />
                    )}
                    {!!weeklyGameModeData && (
                        <PieChart
                            data={shapeDataPie(
                                weeklyGameModeData.windowGameModePlayCounts,
                            )}
                        />
                    )}
                </div>
            }
        />
    )
}
