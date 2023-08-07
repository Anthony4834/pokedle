import React from 'react'
import gearIcon from '../../static/gear.png'
import Modal, { ModalProps } from '../Modal/Modal'
import './settingsModal.css'

export const SettingsModal = ({ updateMetric }) => {
    const modalProps: ModalProps = {
        target: (
            <img
                className='modalTargetIcon'
                src={gearIcon}
                alt='settings'
            ></img>
        ),
        targetClassName: 'settingsModalTarget',
        body: (
            <ul className='settings-menu-options'>
                <li className='metric-switch-mobile'>
                    <label className='switch'>
                        <input
                            type='checkbox'
                            onChange={e => updateMetric(e)}
                        />
                        <span className='slider round'></span>
                        <span className='metric-label'>metric</span>
                    </label>
                </li>
            </ul>
        ),
    }

    return <Modal {...modalProps} />
}
