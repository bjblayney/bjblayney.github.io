import React, { useRef, useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import useMeasure from 'react-use-measure';
import { Container, Title, Frame, Content, toggle } from './styles';
import * as Icons from './icons';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const Tree = React.memo(({ children, name, style, defaultOpen = false }) => {
  const [isOpen, setOpen] = useState(defaultOpen);
  const previous = usePrevious(isOpen);
  const [ref, { height: viewHeight }] = useMeasure();
  const { height, opacity, y } = useSpring({
    from: { height: 0, opacity: 0, y: 0 },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      y: isOpen ? 0 : 20,
    },
  });
  const Icon = Icons[`${children ? (isOpen ? 'Minus' : 'Plus') : 'Close'}SquareO`];

  // Click handler for the icon
  const handleClick = () => {
    if (React.isValidElement(name) && name.props.children) {
      // Check if any child element is an anchor tag with an href
      const anchor = React.Children.toArray(name.props.children).find(
        (child) => React.isValidElement(child) && child.type === 'a' && child.props.href
      );

      // If an anchor is found, use its href
      if (anchor) {
        window.location.hash = anchor.props.href;
      }
    }
    setOpen(!isOpen);
  };

  return (
    <Frame>
      <Icon style={{ ...toggle, opacity: children ? 1 : 0.3, width: `50px` }} onClick={handleClick} />
      <Title style={style}>{name}</Title>
      <Content
        style={{
          opacity,
          height: isOpen && previous === isOpen ? 'auto' : height,
        }}
      >
        <animated.div ref={ref} style={{ y }} children={children} />
      </Content>
    </Frame>
  );
});

export default function App() {
  const year = new Date().getFullYear();
  return (
    <Container>
      <Tree name={`bj blayney ${year}`}>
        <Tree name="Hello" />
        <Tree name="click here">
          <Tree name="why did you click?">
            <Tree name="child 1" style={{ color: '#37ceff' }} />
            <Tree name="child 2" style={{ color: '#37ceff' }} />
            <Tree name="child 3" style={{ color: '#37ceff' }} />
            <Tree name="custom content">
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 200,
                  padding: 10,
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'black',
                    borderRadius: 5,
                  }}
                />
              </div>
            </Tree>
          </Tree>
        </Tree>
        <Tree
          name={
            <span style={{ fontSize: `3rem` }}>
              <a href="#/images" style={{ fontSize: `3rem`, textDecoration: 'none' }}>
                📷
              </a>
            </span>
          }
        >
          <span></span>
        </Tree>
        <Tree
          name={
            <span>
              <a href="#/gradient">Gradient</a>
            </span>
          }
        >
          <span></span>
        </Tree>
      </Tree>
    </Container>
  );
}
