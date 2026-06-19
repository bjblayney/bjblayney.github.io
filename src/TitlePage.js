import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Link } from 'react-router-dom';
import {
  BookPage,
  BookTitle,
  BookSubtitle,
  BookAuthor,
  HorizontalRule,
  EditionTag,
  EnterLink,
  AQUA,
  CARD_BG,
} from './styles';

export default function TitlePage() {
  const fade = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 120, friction: 14 },
  });

  return (
    <BookPage>
      <animated.div
        style={{
          opacity: fade.opacity,
          transform: fade.y.to((y) => `translateY(${y}px)`),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
        }}
      >
        <BookTitle>The Bureau</BookTitle>
        <BookSubtitle>A Field Guide to Digital Projects</BookSubtitle>
        <BookAuthor>BJ Blayney</BookAuthor>
        <HorizontalRule />
        <EditionTag>First Edition &mdash; {new Date().getFullYear()}</EditionTag>
        <EnterLink as={Link} to="/contents">
          Enter
        </EnterLink>
        <div
          style={{
            marginTop: 48,
            display: 'flex',
            gap: 32,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Link
            to="/work"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.68rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: AQUA,
              textDecoration: 'none',
            }}
          >
            Work for Hire
          </Link>
          <Link
            to="/admin"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: CARD_BG,
              textDecoration: 'none',
            }}
          >
            Admin
          </Link>
        </div>
      </animated.div>
    </BookPage>
  );
}
