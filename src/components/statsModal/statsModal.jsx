import axios from 'axios'
import React from 'react'
import Modal from '../Modal/Modal'
import { BASE_QUERY } from '../page/page'
import { BarChart } from '../stats/BarChart'
import { LineChart } from '../stats/LineChart'
import { PieChart } from '../stats/PieChart'
import { getDateFromToday } from '../utl'
import { shapeDailyData, shapeDataPie } from './stats-utils'
import './statsModal.css'

const formatDate = date => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Adding 1 to month since it's zero-based
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
export const StatsModal = ({ updateMetric, mobile, metric }) => {
    const [dailyPlayerData, setDailyPlayerData] = React.useState()
    const [weeklyPlayerData, setWeeklyPlayerData] = React.useState([])
    const [dailyGameModeData, setDailyGameModeData] = React.useState()
    const [weeklyGameModeData, setWeeklyGameModeData] =
        React.useState(undefined)

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    React.useEffect(() => {
        axios
            .get(`${BASE_QUERY}players/new`, {
                params: {
                    startDate: formatDate(getDateFromToday(7)),
                    endDate: formatDate(new Date()),
                },
            })
            .then(({ data }) => {
                console.log(data.data)
                setWeeklyPlayerData(data.data)
                if (data.data.length > 0) {
                    setDailyPlayerData(data.data[data.data.length - 1])
                }
            })
        axios
            .get(`${BASE_QUERY}success/stats`, {
                params: {
                    startDate: formatDate(getDateFromToday(7)),
                    endDate: formatDate(new Date()),
                },
            })
            .then(({ data }) => {
                setWeeklyGameModeData(data)
            })
        axios
            .get(`${BASE_QUERY}success/stats`, {
                params: {
                    startDate: formatDate(getDateFromToday(1)),
                    endDate: formatDate(new Date()),
                },
            })
            .then(({ data }) => {
                setDailyGameModeData(data)
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
                                ['Item', 'Value'],
                                ...shapeDailyData(dailyGameModeData),
                                ['New Players', dailyPlayerData[1]],
                            ]}
                        />
                    )}
                    {weeklyPlayerData.length >= 1 && (
                        <LineChart
                            data={[['Day', 'New Players'], ...weeklyPlayerData]}
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
