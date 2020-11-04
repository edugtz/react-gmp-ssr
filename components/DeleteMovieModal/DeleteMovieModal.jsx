import React from 'react';
import PropTypes from "prop-types"

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteMovieData } from '../../redux/actions/movieActions';

import Modal from '../Common/Modal/Modal';

import styles from './DeleteMovieModal.module.scss';

const DeleteMovieModal = props => {
    const onDeleteMovie = () => {
        props.deleteMovieData(props.movie)
            .then(() => {
                props.toggleModalOpen()
            })
            .catch(err => console.log(err))
    }

    return (
        <Modal {...props}>
            <div className={styles['delete-movie-container']}>
                <div className={styles['modal-header']}>
                    <h2 className={styles['modal-title']}>DELETE MOVIE</h2>
                </div>
                <div className={styles['modal-body']}>
                    <p>Are you sure you want to delete this movie?</p>
                </div>
                <div className={styles['modal-footer']}>
                    <button className={styles['submit-button']} onClick={onDeleteMovie}>CONFIRM</button>
                </div>
            </div>
        </Modal>
    );
}

DeleteMovieModal.propTypes = {
    toggleModalOpen: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ deleteMovieData }, dispatch);
};

export default connect(
    null,
    mapDispatchToProps
)(DeleteMovieModal);
