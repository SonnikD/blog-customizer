import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	formState: ArticleStateType;
	onFontFamilySelect: (select: OptionType) => void;
	onFontSizeSelect: (select: OptionType) => void;
	onFontColorSelect: (select: OptionType) => void;
	onBackgroundColorSelect: (select: OptionType) => void;
	onContentWidthSelect: (select: OptionType) => void;
	onSubmit: (event: FormEvent) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	formState,
	onFontFamilySelect,
	onFontSizeSelect,
	onFontColorSelect,
	onBackgroundColorSelect,
	onContentWidthSelect,
	onSubmit,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setOpen] = useState(false);
	const formRef = useRef<HTMLFormElement | null>(null);

	useEffect(() => {
		const closeOnOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', closeOnOutside);

		return () => {
			document.removeEventListener('mousedown', closeOnOutside);
		};
	}, []);

	const handleFormOpen = () => {
		setOpen(!isOpen);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleFormOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form ref={formRef} className={styles.form} onSubmit={onSubmit}>
					<Text size={31} uppercase={true} weight={800} as={'h2'}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={onFontFamilySelect}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='font size'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={onFontSizeSelect}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={onFontColorSelect}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={onBackgroundColorSelect}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={onContentWidthSelect}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={onReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
