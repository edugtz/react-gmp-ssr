import React from 'react'
import renderer from 'react-test-renderer'
import Footer from './Footer'

describe('Footer component', () => {
    it('should render correctly', () => {
        const component = renderer.create(<Footer />).toJSON()
        expect(component).toMatchSnapshot()
    })
})
