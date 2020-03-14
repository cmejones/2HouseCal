import React from 'react';

import { DateTimePicker } from 'react-widgets'

class DatePicker extends React.Component {
        constructor() {
        super();
        
        let { DateTimePicker } = ReactWidgets;
        let formatter = Globalize.dateFormatter({ date: 'short' })
        let widget = (
            <DateTimePicker
                editFormat={formatter} 
                defaultValue={new Date()}
                format={{ raw: 'MMM dd, yyyy' }}
                time={false}
            />
        )
    }

    render() {
        return (widget);
    };
}

export default DatePicker;
