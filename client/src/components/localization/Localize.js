import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { Button } from 'react-bootstrap';

import localization from './localization';

import './Localize.sass';

import ukraine from '../../img/flag/ukraine.svg';
import russia from '../../img/flag/russia.svg';
import great_britain from '../../img/flag/great-britain.svg';

class Localize extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     language: ''
  //   };
  //
  //   let language = localStorage.getItem('language');
  //   if (language) {
  //     localization.setLanguage(language);
  //   }
  // }
  //
  // setLanguage = (language) => {
  //   localization.setLanguage(language);
  //   this.setState({language});
  //   localStorage.setItem('language', language);
  // };

  render() {
    const {onSetLanguage} = this.props;
    return (
      <div className="localize">
        <h4>Localization</h4>

        {/*<Button variant="primary" onClick={() => onSetLanguage('en')}>English</Button>*/}
        {/*<Button variant="primary" onClick={() => onSetLanguage('uk')}>Українська</Button>*/}
        {/*<Button variant="primary" onClick={() => onSetLanguage('ru')}>Русский</Button>*/}

        <span className={classNames('flag', { selected: localization.getLanguage() === 'uk' })} onClick={() => onSetLanguage('uk')}>
          <img src={ukraine} alt="ukraine"/>
        </span>
        <span className={classNames('flag', { selected: localization.getLanguage() === 'ru' })} onClick={() => onSetLanguage('ru')}>
          <img src={russia} alt="russia"/>
        </span>
        <span className={classNames('flag', { selected: localization.getLanguage() === 'en' })} onClick={() => onSetLanguage('en')}>
          <img src={great_britain} alt="great_britain"/>
        </span>

        <p>{localization.language}</p>
      </div>
    );
  }
}

Localize.propTypes = {
  onSetLanguage: PropTypes.func.isRequired
};

Localize.defaultProps = {
  onSetLanguage: () => {},
};

export default Localize;