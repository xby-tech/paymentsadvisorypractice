import React, { useEffect, useRef, useState } from 'react';
import { TOPICS, ROLES } from './data.js';
import Landing from './components/Landing.jsx';
import Dashboard from './components/Dashboard.jsx';
import Legal from './components/Legal.jsx';

const defaultSliders = () => {
  const init = {};
  TOPICS.forEach((t) => {
    init[t.id] = {};
    t.variables.forEach((v) => (init[t.id][v.id] = v.default));
  });
  return init;
};

function decodeHash() {
  const h = window.location.hash.replace(/^#/, '');
  if (!h) return null;
  const [path, query] = h.split('?');
  const parts = path.split('/').filter(Boolean);
  const out = { topicId: null, roleId: null, sliderOverrides: {} };
  if (parts[0]) out.topicId = decodeURIComponent(parts[0]);
  if (parts[1]) out.roleId = decodeURIComponent(parts[1]);
  if (query) {
    query.split('&').forEach((kv) => {
      const [k, v] = kv.split('=');
      if (k && v !== undefined) out.sliderOverrides[decodeURIComponent(k)] = Number(decodeURIComponent(v));
    });
  }
  return out;
}

function encodeHash(topicId, roleId, topicSliders, topic) {
  const overrides = [];
  topic.variables.forEach((v) => {
    const cur = topicSliders[v.id];
    if (Math.abs(cur - v.default) > 1e-6) {
      overrides.push(`${encodeURIComponent(v.id)}=${encodeURIComponent(Number(cur.toFixed(4)))}`);
    }
  });
  let hash = `#${encodeURIComponent(topicId)}/${encodeURIComponent(roleId)}`;
  if (overrides.length) hash += `?${overrides.join('&')}`;
  return hash;
}

export default function App() {
  const initial = (() => {
    const decoded = typeof window !== 'undefined' ? decodeHash() : null;
    const sliders = defaultSliders();
    let topicId = 'agentic';
    let roleId = 'large_fi';
    let stage = 'landing';
    if (decoded) {
      if (decoded.topicId && TOPICS.find((t) => t.id === decoded.topicId)) {
        topicId = decoded.topicId;
        stage = 'app';
      }
      if (decoded.roleId && ROLES.find((r) => r.id === decoded.roleId)) roleId = decoded.roleId;
      const topic = TOPICS.find((t) => t.id === topicId);
      if (topic) {
        topic.variables.forEach((v) => {
          if (decoded.sliderOverrides[v.id] !== undefined && Number.isFinite(decoded.sliderOverrides[v.id])) {
            sliders[topic.id][v.id] = decoded.sliderOverrides[v.id];
          }
        });
      }
    }
    return { stage, topicId, roleId, sliders };
  })();

  const [stage, setStage] = useState(initial.stage);
  const [roleId, setRoleId] = useState(initial.roleId);
  const [topicId, setTopicId] = useState(initial.topicId);
  const [sliders, setSliders] = useState(initial.sliders);

  const skipNextHash = useRef(false);
  useEffect(() => {
    if (stage !== 'app') return;
    if (skipNextHash.current) {
      skipNextHash.current = false;
      return;
    }
    const topic = TOPICS.find((t) => t.id === topicId);
    if (!topic) return;
    const newHash = encodeHash(topicId, roleId, sliders[topicId], topic);
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, '', newHash);
    }
  }, [stage, topicId, roleId, sliders]);

  const goLegal = () => {
    setStage('legal');
    window.scrollTo(0, 0);
  };

  if (stage === 'legal') {
    return (
      <Legal
        onHome={() => {
          setStage('landing');
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  if (stage === 'landing') {
    return (
      <Landing
        roleId={roleId}
        setRoleId={setRoleId}
        onEnter={() => {
          setStage('app');
          window.scrollTo(0, 0);
        }}
        onLegal={goLegal}
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
      onLegal={goLegal}
    />
  );
}
