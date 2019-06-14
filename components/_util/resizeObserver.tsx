import * as React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

interface ResizeObserverProps {
  children?: React.ReactNode;
  disabled?: boolean;
  onResize?: () => void;
}

class ReactResizeObserver extends React.Component<ResizeObserverProps, {}> {
  resizeObserver: ResizeObserver | null = null;
  ref: any;

  constructor(props: ResizeObserverProps) {
    super(props);
    this.ref = React.createRef();
  }
  componentDidMount() {
    this.onComponentUpdated();
  }

  componentDidUpdate() {
    this.onComponentUpdated();
  }

  componentWillUnmount() {
    this.destroyObserver();
  }

  onComponentUpdated() {
    const { disabled } = this.props;
    const element = this.ref.current;
    if (!this.resizeObserver && !disabled && element) {
      // Add resize observer
      this.resizeObserver = new ResizeObserver(this.onResize);
      this.resizeObserver.observe(element);
    } else if (disabled) {
      // Remove resize observer
      this.destroyObserver();
    }
  }

  onResize = () => {
    const { onResize } = this.props;
    if (onResize) {
      onResize();
    }
  };

  destroyObserver() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  render() {
    const { children = null } = this.props;
    if (children) {
      return React.cloneElement(children as React.ReactElement, { ref: this.ref });
    }
    return null;
  }
}

export default ReactResizeObserver;
