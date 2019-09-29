import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import localization from '../localization/localization';

import './DatePicker.sass';

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const fromMonth = new Date(currentYear, currentMonth);
// const toMonth = new Date(currentYear + 10, 11); //From current year and ++
const toMonth = new Date(currentYear - 9, 11); //From current year and --

function YearMonthForm({ date, localeUtils, onChange }) {
  // const months = localeUtils.getMonths();
  const months = localization.date.months;

  const years = [];
  //From current year and ++:
  // for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i++) {
  //   years.push(i);
  // }
  //From current year and --:
  for (let i = toMonth.getFullYear(); i <= fromMonth.getFullYear(); i++) {
    years.push(i);
  }

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <div className="DayPicker-Caption">
      <select className="form-control mb-1 datePickerSelect" name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => (
          <option key={month} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select className="form-control" name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: fromMonth
    };
  }

  handleYearMonthChange = (month) => {
    this.setState({ month });
  };

  render() {
    const {onDayPickerChange, date} = this.props;

    return (
      <>
        <DayPicker
          onDayClick={(date, {selected}) => onDayPickerChange(date, {selected})}
          selectedDays={date}
          locale={localization._language}
          // Without form in picker:
          // months={localization.date.months}
          weekdaysLong={localization.date.weekdays_long}
          weekdaysShort={localization.date.weekdays_short}
          showOutsideDays={true}
          enableOutsideDaysClick={true}

          // Show all months:
          // numberOfMonths={12}
          // pagedNavigation={true}

          // With form in picker:
          month={this.state.month}
          // From current year and ++:
          // fromMonth={fromMonth}
          // toMonth={toMonth}
          // From current year and ++:
          fromMonth={toMonth}
          toMonth={fromMonth}
          captionElement={({ date, localeUtils }) => (
            <YearMonthForm
              date={date}
              localeUtils={localeUtils}
              onChange={this.handleYearMonthChange}
            />
          )}
        />
        {date ? (
          <p className="ml-4">{localization.you_have_chosen} <span className="datePickerChooseDate">{date.toLocaleDateString()}</span></p>
        ) : (
          <p className="ml-4">{localization.choose_date}</p>
        )}
      </>
    );
  }
}

DatePicker.propTypes = {
  onDayPickerChange: PropTypes.func.isRequired,
};

DatePicker.defaultProps = {
  onDayPickerChange: () => {},
};

export default DatePicker;