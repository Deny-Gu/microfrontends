import { lazy } from 'react';
import RemoteBoundary from './RemoteBoundary';

type Props = {
  remote: keyof typeof remotes;
  name: string;
};

const remotes = {
  sidebar: lazy(() => import('sidebar/App')),
  agents: lazy(() => import('agents/App')),
  incidents: lazy(() => import('incidents/App')),
};

const RemoteApp = ({ remote, name }: Props) => {
  const Remote = remotes[remote];

  return (
    <RemoteBoundary name={name} onRetry={() => window.location.reload()}>
      <Remote />
    </RemoteBoundary>
  );
};

export default RemoteApp;
