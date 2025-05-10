import  { Component, ReactNode } from 'react';
import { Alert, Button } from '@mantine/core';

type Props = {
    children?: ReactNode;
  };
  

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
      }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: any) {
    console.error('Error caught by ErrorBoundary:', error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Alert color="red" title="Something went wrong" radius="md" withCloseButton>
          <div>Were sorry, something broke. Please try again.</div>
          <Button mt="md" onClick={this.handleReload}>
            Reload Page
          </Button> 
        </Alert>
      );
    }

    return this.props.children;
  }
}
