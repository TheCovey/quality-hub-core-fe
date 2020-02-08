import React from 'react';
import Carousel from './Carousel';
import * as rtl from '@testing-library/react';

afterEach(rtl.cleanup);

test('is rendering', () => {
	rtl.render(<Carousel />);
});
