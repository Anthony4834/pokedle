import React, { useEffect, useRef, useState } from 'react'
import './Modal.css'

const Modal = ({ className = '', target, body }) => {
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
        if (!modalRef?.current?.contains(event.target)) {
            // Click occurred outside the modal content, so close the modal
            setIsOpen(false)
        }
    }

    return (
        <div>
            <div
                className={`modalTarget ${className}-target`}
                onClick={handleToggleModal}
            >
                {target}
            </div>

            {isOpen && (
                <div className='modal-overlay'>
                    <div className={`modal ${className}`} ref={modalRef}>
                        <span className='close-btn' onClick={handleToggleModal}>
                            &times;
                        </span>
                        <div className={`modalBody ${className}-body`}>
                            {body}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Modal
