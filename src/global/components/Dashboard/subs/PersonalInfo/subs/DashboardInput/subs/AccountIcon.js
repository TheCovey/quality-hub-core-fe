import React from 'react';

import Icon from '../../../../../../../icons/Icon';
import { ICONS } from '../../../../../../../icons/iconConstants';

export default function AccountIcon({ userKey }) {
	return userKey && userKey.includes('linkedin') ? (
		<Icon icon={ICONS.LINKEDIN} width={24} height={24} color='#5f6368' />
	) : userKey.includes('github') ? (
		<Icon icon={ICONS.GITHUB} width={24} height={24} color='#5f6368' />
	) : userKey.includes('personal') ? (
		<Icon icon={ICONS.PERSONAL} width={24} height={24} color='#5f6368' />
	) : userKey.includes('twitter') ? (
		<Icon icon={ICONS.TWITTER} width={24} height={24} color='#5f6368' />
	) : userKey.includes('portfolio') ? (
		<Icon icon={ICONS.PORTFOLIO} width={24} height={24} color='#5f6368' />
	) : userKey.includes('blog') ? (
		<Icon icon={ICONS.BLOG} width={24} height={24} color='#5f6368' />
	) : null;
}
