import React from 'react'
import PropTypes from 'prop-types'

import styles from './Modal.module.scss'

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Custom hook
function usePrevious(value) {
    const ref = React.useRef()
    React.useEffect(() => {
        ref.current = value
    })
    return ref.current
}

const Modal = (props) => {
    const prevIsModalOpen = usePrevious(props.isModalOpen)

    React.useEffect(() => {
        if (props.isModalOpen) {
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    React.useEffect(() => {
        if (prevIsModalOpen !== props.isModalOpen && props.isModalOpen) {
            document.body.style.overflow = 'hidden'
        } else document.body.style.overflow = 'unset'
    }, [props.isModalOpen])

    return (
        <>
            {props.isModalOpen && (
                <div className={styles.overlay}>
                    <div className={styles['modal-content']}>
                        <div className={styles['close-icon-wrapper']}>
                            <span
                                onClick={props.toggleModalOpen}
                                className={styles['close-modal']}
                            >
                                <FontAwesomeIcon data-testid="close-icon" icon={faTimes} />
                            </span>
                        </div>
                        {props.children}
                    </div>
                </div>
            )}
        </>
    )
}

Modal.propTypes = {
    toggleModalOpen: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
}

export default Modal
