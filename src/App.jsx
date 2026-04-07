import React, { useState } from 'react';
import { TOPICS } from './data.js';
import Landing from './components/Landing.jsx';
import Dashboard from './components/Dashboard.jsx';

export default function App() {
  const [stage, setStage] = useState('landing');
  const [roleId, setRoleId] = useState('large_fi');
  const [topicId, setTopicId] = useState('agentic');
  const [sliders, setSliders] = useState(() => {
    const init = {};
    TOPICS.forEach((t) => {
      init[t.id] = {};
      t.variables.forEach((v) => (init[t.id][v.id] = v.default));
    });
    return init;
  });

  if (stage === 'landing') {
    return (
      <Landing
        roleId={roleId}
        setRoleId={setRoleId}
        onEnter={() => {
          setStage('app');
          window.scrollTo(0, 0);
        }}
      />
    );
  }
  return (
    <Dashboard
      roleId={roleId}
      setRoleId={setRoleId}
      topicId={topicId}
      setTopicId={setTopicId}
      sliders={sliders}
      setSliders={setSliders}
      onHome={() => setStage('landing')}
    />
  );
}
