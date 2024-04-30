import React, { useMemo, useState } from 'react';
import spacetime from 'spacetime';
import TimezoneSelect, { allTimezones } from 'react-timezone-select';
import type { ITimezone } from 'react-timezone-select';

export type ISelectStyle = 'react-select' | 'select';

const timezones = {
  ...allTimezones,
  'America/Lima': 'Pittsburgh',
  'Europe/Berlin': 'Frankfurt',
};

const App = () => {
  const [selectedTimezone, setSelectedTimezone] = React.useState<ITimezone>('');

  const [datetime, setDatetime] = useState(spacetime.now());

  useMemo(() => {
    const tzValue = typeof selectedTimezone === 'string' ? selectedTimezone : selectedTimezone.value;
    setDatetime(datetime.goto(tzValue));
  }, [selectedTimezone]);

  const selectOptions = {
    timezones,
  };

  return (
    <div className="wrapper">
      <div className="header">
        <h2>react-timezone-select</h2>
      </div>
      <div className="select-wrapper">
        <TimezoneSelect
          value={selectedTimezone}
          onChange={setSelectedTimezone}
          {...selectOptions}
        />
      </div>
      <div className="code">
        <div>
          Current Date / Time in{' '}
          {typeof selectedTimezone === 'string'
            ? selectedTimezone.split('/')[1]
            : selectedTimezone.value.split('/')[1]}
          : <pre>{datetime.unixFmt('dd.MM.YY HH:mm:ss')}</pre>
        </div>
        <pre>{JSON.stringify(selectedTimezone, null, 2)}</pre>
      </div>
    </div>
  );
};

export default App;
