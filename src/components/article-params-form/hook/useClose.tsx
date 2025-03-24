import { useEffect } from 'react';

type useCloseType = {
	ref: React.RefObject<HTMLFormElement>;
	toggleOpen: (value: boolean) => void;
};

export const useClose = ({ ref, toggleOpen }: useCloseType) => {
	useEffect(() => {
		const closeOnOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				toggleOpen(false);
			}
		};

		document.addEventListener('mousedown', closeOnOutside);

		return () => {
			document.removeEventListener('mousedown', closeOnOutside);
		};
	}, []);
};
