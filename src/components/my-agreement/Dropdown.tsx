import { ArrowDownIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export interface IDropdownOption {
	label: string | number;
	labelValue: string;
}

interface IDropdownProps {
	name?: string;
	options: IDropdownOption[];
	required?: boolean;
	tabIndex?: number;
	className?: string;
	type?: string;
	placeHolder?: string;
	labelName?: string;
    selectedItem: string | number;
    setSelectedItem: Function;
	sid: string | undefined;
	setId: Function;
}

function Dropdown({
	labelName,
	name,
	options,
	placeHolder,
	type,
	required,
	className,
	tabIndex,
    selectedItem,
    setSelectedItem,
	sid,
	setId
}: IDropdownProps) {
	const [isFocused, setFocused] = useState<boolean>(false);
	// const [selectedItem, setSelectedItem] = useState<number | string>();
	const wrapperRef = useRef<any>(null);

	useEffect(() => {
		function handleClickOutside(event: any) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				setFocused(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [wrapperRef]);

	const onValueChange = (selectedValue: string | number, selectedId: string) => {
		setSelectedItem(selectedValue);
		setId(selectedId);
		setFocused(false);
	};

	useEffect(() => {
		setFocused(false);
	}, [selectedItem]);

	const onClear = (e: any) => {
		e.stopPropagation();
		setSelectedItem(placeHolder);
		setFocused(false);
	};

	return (
		<div 
            className="border-[#979797] relative"
            ref={wrapperRef} 
        >
			<div className="flex flex-row items-center">
				<span className="text-xl font-medium text-ci-dark-gray mb-2">{labelName}</span>
				{/* {required && (
					<span className="text-[20px] text-[#FF0000] ml-2 top-0 ">*</span>
				)} */}
			</div>
			<div
				tabIndex={tabIndex}
				className={
					`w-full text-xl font-medium text-ci-black h-[60px] border-2 border-ci-dark-gray rounded-lg drop-shadow-input pl-3 transition relative flex items-center hover:cursor-pointer ${isFocused? 'rounded-b-[0]': ''}`
				}
				onClick={() => setFocused(!isFocused)}
            >
				<span className='mr-auto'>{selectedItem ?? placeHolder}</span>
                <div className='mr-2'>
                    <ArrowDownIcon />
                </div>
			</div>
			{isFocused && (
				<ul className="items-center gap-4 block absolute w-full border-2 border-[#ECECEC] shadow-lg">
					{options.map(({ label, labelValue }) => (
						<li
							onClick={() => onValueChange(label, labelValue)}
							className="h-[50px] z-50 text-xl font-medium rounded-sm shadow-[inset_1px_0px_0px_rgba(0,0,0,0.2) bg-white drop-shadow-input pl-3 place-items-center hover:bg-[#ECECEC] hover:cursor-pointer
                            focus:outline-0 focus:drop-shadow-none transition relative flex">
							{label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default Dropdown;

Dropdown.defaultProps = {
	name: '',
	type: '',
	className: '',
	placeHolder: '',
	required: false,
	tabIndex: 0,
	labelName: '',
};
