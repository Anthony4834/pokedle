import React from 'react'
import Modal from '../Modal/Modal'
import './settingsModal.css'

export const SettingsModal = ({ updateMetric, mobile, metric }) => {
    const modalProps = {
        className: 'settingsModal',
        target: (
            <img
                className='modalTargetIcon'
                src={'https://img.icons8.com/?size=512&id=364&format=png'}
                alt='settings'
            ></img>
        ),
        body: (
            <ul className='settings-menu-options'>
                {mobile && (
                    <li className='metric-switch-mobile'>
                        <label className='switch'>
                            <input
                                type='checkbox'
                                checked={metric}
                                onChange={e => updateMetric(e)}
                            />
                            <span className='slider round'></span>
                            <span className='metric-label'>metric</span>
                        </label>
                    </li>
                )}
            </ul>
        ),
    }

    return <Modal {...modalProps} />
}
