import React from 'react';
import PropTypes from "prop-types"

import styles from './Popover.module.scss';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Popover = props => {
    return (
        <>
            {props.isPopoverOpen &&
                <div className={styles['popover-container']}>
                    <div className={styles['popover-content']}>
                        <div className={styles['close-icon-wrapper']}>
                            <span onClick={props.toggleOpenMovieOptions} className={styles['close-popover']}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </div>
                        <div onClick={props.onEditMovie} className={styles['popover-action-wrapper']}>
                            <p>Edit</p>
                        </div>
                        <div onClick={props.onDeleteMovie} className={styles['popover-action-wrapper']}>
                            <p>Delete</p>
                        </div>
                    </div>
                </div>
            }

        </>
    );
}

Popover.propTypes = {
    onEditMovie: PropTypes.func.isRequired,
    onDeleteMovie: PropTypes.func.isRequired,
    toggleOpenMovieOptions: PropTypes.func.isRequired,
    isPopoverOpen: PropTypes.bool.isRequired
}

export default Popover;