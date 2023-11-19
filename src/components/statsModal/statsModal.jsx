import axios from 'axios'
import React, { useEffect } from 'react'
import Modal from '../Modal/Modal'
import { BASE_QUERY } from '../page/page'
import { LineChart } from '../stats/LineChart'
import { PieChart } from '../stats/PieChart'
import { shapeDataPie } from './stats-utils'
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
    const [weeklyPlayerData, setWeeklyPlayerData] = React.useState([])
    const [weeklyGameModeData, setWeeklyGameModeData] =
        React.useState(undefined)

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    React.useEffect(() => {
        axios
            .get(`${BASE_QUERY}players/new`, {
                params: {
                    "startDate": "2023-11-11",
                },
            })
            .then((res) => {
                console.log(res);
                setWeeklyPlayerData([])
            })
        axios
            .get(`${BASE_QUERY}success/stats`, {
                params: {
                    "startDate": "2023-10-18",
                },
            })
            .then(({ data }) => {
                setWeeklyGameModeData(data)
            })
    }, [])
    useEffect(() => {
        console.log({weeklyPlayerData})
    }, [weeklyPlayerData])
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
        )
    }

    return <Modal {...modalProps} body={(
            <div style={{width: '45vw', height: '800px'}}>

                {!!weeklyPlayerData.length === 7 && (
                    <LineChart data={[["Day", "New Players"], ...weeklyPlayerData]} />
                )}
                {!!weeklyGameModeData && (
                    <PieChart data={shapeDataPie(weeklyGameModeData.windowGameModePlayCounts)} />
                )}
            </div>
    )} />
}
