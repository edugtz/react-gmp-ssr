import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            errorMessage: ""
        };
    }

    componentDidCatch(error) {
        this.setState({ hasError: true, errorMessage: error.message });
    }

    render() {
        const { errorMessage, hasError } = this.state;

        if (hasError) {
            return <h1>{errorMessage}</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
