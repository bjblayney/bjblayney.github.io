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
    let anchor = null;
    if (React.isValidElement(name)) {
      // If the `name` itself is an anchor, use it
      if (name.type === 'a' && name.props && name.props.href) {
        anchor = name;
      } else if (name.props && name.props.children) {
        // Otherwise check if any child element is an anchor tag with an href
        anchor = React.Children.toArray(name.props.children).find(
          (child) => React.isValidElement(child) && child.type === 'a' && child.props.href
        );
      }

      if (anchor) {
        const href = anchor.props.href;
        const target = anchor.props.target;

        // If it's an internal/hash link, update the hash
        if (typeof href === 'string' && href.startsWith('#')) {
          window.location.hash = href;
        } else if (typeof href === 'string') {
          // For external links: if anchor wanted a new tab, open in new tab
          if (target === '_blank') {
            window.open(href, '_blank');
          } else {
            // otherwise navigate in current tab
            window.location.href = href;
          }
        }
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
        <Tree name="hello" />
        <Tree name="click here">
          <Tree name="pop quiz, hot shot!">
            <Tree
              name={
                <a
                  href="https://bjblayney.github.io/dev-reps/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#000000', textDecoration: 'underline' }}
                >
                  Daily Quiz v1.0
                </a>
              }
            />
            <Tree
              name={
                <a
                  href="https://bjblayney.github.io/can-geo-game/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#000000', textDecoration: 'underline' }}
                >
                  Geography Quiz v1.0
                </a>
              }
            />
            <Tree
              name={
                <a
                  href="https://bjblayney.github.io/french-verb-trainer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#000000', textDecoration: 'underline' }}
                >
                  French Canadian Verb Trainer v1.0
                </a>
              }
            />
            
            <Tree name="But you don't have to take my word for it!">
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 200,
                  padding: 10,
                }}
              >
                <img src="knowing.png" alt="Knowing" style={{ width: '100%', height: '100%' }} />
              </div>
            </Tree>
          </Tree>
        </Tree>
        <Tree
          name={
            <span>
              <a href="#/images" style={{ textDecoration: 'none', fontSize: '3rem', verticalAlign: 'middle' }}>
                📷
              </a>
            </span>
          }
        >
          <span></span>
        </Tree>
        <Tree
          name={
            <a
              href="https://bjblayney.github.io/pick-two/"
              target="_blank"
              style={{ color: '#000000', textDecoration: 'underline' }}
            >
              The Choice Paradox
            </a>
          }
        >
          <span></span>
        </Tree>
        <Tree
          name={
            <span>
              <a href="#/gradient"  style={{ color: '#000000', textDecoration: 'underline' }}>Gradient</a>
            </span>
          }
        >
          <span></span>
        </Tree>
      </Tree>
    </Container>
  );
}
