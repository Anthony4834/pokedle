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

    React.useEffect(() => {
        console.log({
            params: {
                startDate: formatDate(getDateFromToday(7, 0, true)),
                endDate: formatDate(getDateFromToday(0, 0, true)),
            },
        })
        axios
            .get(`${BASE_QUERY}players/new`, {
                params: {
                    startDate: formatDate(getDateFromToday(7, 0, true)),
                    endDate: formatDate(getDateFromToday(-1, 0, true)),
                },
            })
            .then(({ data }) => {
                if (data.data.length > 0) {
                    setWeeklyPlayerData(data.data.slice(0, data.data.length - 1));
                    if(data.data.length > 1) {
                        setDailyPlayerData(data.data[data.data.length - 2])
                    }
                }                
                
            })
        axios
            .get(`${BASE_QUERY}success/stats`, {
                params: {
                    startDate: formatDate(getDateFromToday(7, 0, true)),
                    endDate: formatDate(getDateFromToday(0)),
                },
            })
            .then(({ data }) => {
                setWeeklyGameModeData(data)
            })
        axios
            .get(`${BASE_QUERY}success/stats`, {
                params: {
                    startDate: formatDate(getDateFromToday(0, 0, true)),
                },
            })
            .then(({ data }) => {
                setDailyGameModeData(data)
            })
        console.log({
            startDate: formatDate(getDateFromToday(0, 0, true)),

        })
    }, [])

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

                    {!!dailyGameModeData && !!dailyPlayerData && (
                        <BarChart
                            data={[
                                ['', 'Value'],
                                ...shapeDailyData(dailyGameModeData),
                                ['Players', dailyPlayerData[1][1]],
                                ['New Players', dailyPlayerData[1][0]],
                            ]}
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
