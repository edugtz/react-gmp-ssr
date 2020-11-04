import React from 'react'

import styles from './SearchBar.module.scss'

const SearchBar = (props) => {
    return (
        <div className={styles['search-bar']}>
            <input
                value={props.searchValue}
                onKeyPress={props.handleKeyPress}
                onChange={(event) => props.handleOnChange(event)}
                type="text"
                placeholder="What do you want to watch?"
            />
        </div>
    )
}

export default SearchBar
