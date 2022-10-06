import { useState } from 'react';

export default function Dropwdown() {
	const [open, setOpen] = useState(false);
	return (
		<div style={{ position: 'relative' }}>
			<button onClick={() => setOpen((prev) => !prev)}>Dropdown V</button>
			{open && (
				<div className='dropdown-container'>
					<div className='dropdown' onClick={() => setOpen(false)}>
						Option 1
					</div>
					<div className='dropdown' onClick={() => setOpen(false)}>
						Option 2
					</div>
					<div className='dropdown' onClick={() => setOpen(false)}>
						Option 3
					</div>
				</div>
			)}
		</div>
	);
}
