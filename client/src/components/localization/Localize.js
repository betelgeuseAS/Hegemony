import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import localization from './localization';
import './Localize.sass';
import ukraine from '../../img/flag/ukraine.svg';
import russia from '../../img/flag/russia.svg';
import great_britain from '../../img/flag/great-britain.svg';

export const Localize = ({onSetLanguage}) => {
  return (
    <div className="localize">
      <span className={classNames('flag', { selected: localization.getLanguage() === 'uk' })} onClick={() => onSetLanguage('uk')}>
        <img src={ukraine} alt="ukraine"/>
      </span>
      <span className={classNames('flag', { selected: localization.getLanguage() === 'ru' })} onClick={() => onSetLanguage('ru')}>
        <img src={russia} alt="russia"/>
      </span>
      <span className={classNames('flag', { selected: localization.getLanguage() === 'en' })} onClick={() => onSetLanguage('en')}>
        <img src={great_britain} alt="great_britain"/>
      </span>
    </div>
  );
};

Localize.propTypes = {
  onSetLanguage: PropTypes.func.isRequired
};

Localize.defaultProps = {
  onSetLanguage: () => {},
};
