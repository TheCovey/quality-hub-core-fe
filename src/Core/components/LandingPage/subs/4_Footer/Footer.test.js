import React from 'react'
import Footer from './Footer'
import * as rtl from '@testing-library/react'

afterEach(rtl.cleanup)

test('is rendering', () => {
    rtl.render(
        <Footer />
    )
})