import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, FormEvent } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
	OptionType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	const [FormState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleForm = (key: keyof ArticleStateType, select: OptionType) => {
		setFormState((prev) => ({ ...prev, [key]: select }));
	};

	const hundleSubmit = (event: FormEvent) => {
		event.preventDefault();
		setArticleState(FormState);
	};

	const hundleReset = () => {
		setArticleState(defaultArticleState);
		setFormState(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				formState={FormState}
				onFontFamilySelect={(value) => handleForm('fontFamilyOption', value)}
				onFontSizeSelect={(value) => handleForm('fontSizeOption', value)}
				onFontColorSelect={(value) => handleForm('fontColor', value)}
				onBackgroundColorSelect={(value) =>
					handleForm('backgroundColor', value)
				}
				onContentWidthSelect={(value) => handleForm('contentWidth', value)}
				onSubmit={hundleSubmit}
				onReset={hundleReset}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
