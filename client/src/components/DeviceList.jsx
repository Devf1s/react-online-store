import React from 'react';
import { useSelector } from 'react-redux';
import DeviceItem from './DeviceItem';

const DeviceList = () => {
	const { devices } = useSelector((state) => state.device);

	return (
		<div className="flex md:flex-wrap justify-between gap-5">
			{devices.map(device => (
				<DeviceItem key={device.id} device={device} />
			))}
		</div>
	)
}
export default DeviceList;