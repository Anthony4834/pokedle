import React, { useState, useRef, useEffect } from 'react'
import './Modal.css'

const Modal = ({mobile, updateMetric, reset}) => {
    const [isOpen, setIsOpen] = useState(false)
    const modalRef = useRef(null)

    useEffect(() => {
        // Attach event listener when the modal is open
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    const handleToggleModal = () => {
        setIsOpen(prevState => !prevState)
    }

    const handleClickOutside = event => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            // Click occurred outside the modal content, so close the modal
            setIsOpen(false)
        }
    }

    return (
        <div>
            <img onClick={handleToggleModal} className='settingsIcon' src={require("../../static/gear.png")}></img>

            {isOpen && (
            <div className='modal-overlay'>
                <div className='modal' ref={modalRef}>
                <span className='close-btn' onClick={handleToggleModal}>
                    &times;
                </span>
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
                    <li className='align-left' onClick={() => reset()}>
                    reset
                    </li>
                </ul>
                </div>
            </div>
            )}
        </div>
    )
}

export default Modal
