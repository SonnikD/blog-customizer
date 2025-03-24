import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useClose } from './hook/useClose';

type ArticleParamsFormProps = {
	updateParams: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ updateParams }: ArticleParamsFormProps) => {
	const [isOpen, setOpen] = useState(false);
	const formRef = useRef<HTMLFormElement | null>(null);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	useClose({ ref: formRef, toggleOpen: setOpen });

	const handleForm = (key: keyof ArticleStateType, select: OptionType) => {
		setFormState((prev) => ({ ...prev, [key]: select }));
	};

	const hundleSubmit = (event: FormEvent) => {
		event.preventDefault();
		updateParams(formState);
	};

	const hundleReset = () => {
		updateParams(defaultArticleState);
		setFormState(defaultArticleState);
	};

	const handleFormOpen = () => {
		setOpen(!isOpen);
	};

	const onFontFamilySelect = (value: OptionType) => {
		handleForm('fontFamilyOption', value);
	};
	const onFontSizeSelect = (value: OptionType) => {
		handleForm('fontSizeOption', value);
	};
	const onFontColorSelect = (value: OptionType) => {
		handleForm('fontColor', value);
	};
	const onBackgroundColorSelect = (value: OptionType) => {
		handleForm('backgroundColor', value);
	};
	const onContentWidthSelect = (value: OptionType) => {
		handleForm('contentWidth', value);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleFormOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form ref={formRef} className={styles.form} onSubmit={hundleSubmit}>
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
							onClick={hundleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
