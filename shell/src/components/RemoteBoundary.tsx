import { Component, Suspense } from 'react';
import type { ReactNode } from 'react';

type Props = {
  name: string;
  children: ReactNode;
  onRetry: () => void;
};

class RemoteBoundary extends Component<Props, { failed: boolean }> {
  state = {
    failed: false,
  };

  static getDerivedStateFromError() {
    return {
      failed: true,
    };
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="remote-boundary">
          <p role="alert">Не удалось открыть «{this.props.name}».</p>
          <button
            type="button"
            className="remote-boundary__reload"
            onClick={this.props.onRetry}
          >
            Обновить
          </button>
        </div>
      );
    }

    return (
      <Suspense
        fallback={
          <div className="remote-boundary">
            <p role="status">Загрузка: {this.props.name}…</p>
          </div>
        }
      >
        {this.props.children}
      </Suspense>
    );
  }
}

export default RemoteBoundary;
