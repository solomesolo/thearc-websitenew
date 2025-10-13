import React, { Component, ErrorInfo, ReactNode, memo } from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './AppRoutes';
import { CountryProvider } from './contexts/CountryContext';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="container mt-5">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">🚨 Application Error</h4>
            <p>Something went wrong with the application.</p>
            <hr />
            <p className="mb-0">
              <strong>Error:</strong> {this.state.error?.message}
            </p>
            <button 
              className="btn btn-primary mt-3"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = memo(() => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <CountryProvider>
          <AppRoutes />
        </CountryProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
});

export default App;
