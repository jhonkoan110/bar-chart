import React, { Component, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: unknown | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(err: Error): State {
    return { hasError: true, error: err };
  }

  public componentDidCatch(error: Error) {
    this.setState({ error });
  }

  public render() {
    if (this.state.hasError) {
      return <h1>BarChart Error: {String(this.state.error)}</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
