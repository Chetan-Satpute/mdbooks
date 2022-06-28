import React from "react";

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: "" };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    console.log(error.message);
    return { hasError: true, error: error.message };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <pre className="text-red-400">{this.state.error}</pre>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
