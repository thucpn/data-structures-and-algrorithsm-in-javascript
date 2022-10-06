import { useState } from 'react';

const TooltipWrapper = ({ children }) => {
	const [show, setShow] = useState(false);

	return (
		<div className='tooltip-wrapper'>
			{show && <div className='tooltip'>Sample content</div>}
			<div onMouseOver={() => setShow(true)} onMouseLeave={() => setShow(false)}>
				{children}
			</div>
		</div>
	);
};

export default function Tooltip() {
	return (
		<div>
			<TooltipWrapper>
				<h1>Hover me</h1>
			</TooltipWrapper>
		</div>
	);
}
