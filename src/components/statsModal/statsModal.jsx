import React from 'react'
import Modal from '../Modal/Modal'
import './statsModal.css'

export const StatsModal = ({ updateMetric, mobile, metric }) => {
    const modalProps = {
        className: 'statsModal',
        target: (
            <img
                className='modalTargetIcon'
                src={'https://img.icons8.com/?size=256&id=47341&format=png'}
                alt='statistics'
            ></img>
        ),
        body: (
            <div>
                
            </div>
        ),
    }

    return <Modal {...modalProps} />
}
