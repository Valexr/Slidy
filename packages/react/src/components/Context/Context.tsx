import { createContext, useContext } from 'react';

import { i18nDefaults } from '../Slidy/i18n';
import { classNames } from '../Slidy/slidy.styles';

const initial = {
    i18n: i18nDefaults,
    classNames: classNames,
};

const SlidyContext = createContext(initial);

const useSlidy = () => useContext(SlidyContext);

export { SlidyContext, useSlidy };
