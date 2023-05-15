import { useState } from 'react'
import { Tabs as AntTabs } from 'antd';

import Individual from './Individual';
import Corporate from './Corporate';

const { TabPane } = AntTabs;

function Signup() {
  const [key, setKey] = useState('bireysel');

  return (
    <div className="d-flex justify-content-center">

      <AntTabs defaultActiveKey={key} onChange={(k) => setKey(k)} className="my-3 p-3">
        <TabPane key="bireysel" tab="Individual">
          <Individual />
        </TabPane>

        <TabPane tab="Corporate" key="kurumsal">
          <Corporate />
        </TabPane>
      </AntTabs>

    </div>
  )
}

export default Signup












