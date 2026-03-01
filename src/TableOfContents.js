import React from 'react';
import { useTrail, animated } from '@react-spring/web';
import { Link } from 'react-router-dom';
import bookData from './bookData';
import {
  BookPage,
  BackLink,
  TOCHeading,
  TOCList,
  TOCEntry,
  TOCNumber,
  TOCTitle,
  TOCDotLeader,
  TOCAction,
} from './styles';

export default function TableOfContents() {
  const trail = useTrail(bookData.length, {
    from: { opacity: 0, y: 12 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 22 },
  });

  return (
    <BookPage>
      <BackLink as={Link} to="/">Title Page</BackLink>
      <TOCHeading style={{ marginTop: 24 }}>Contents</TOCHeading>
      <TOCList>
        {trail.map((style, i) => {
          const chapter = bookData[i];
          const action = chapter.type === 'project' ? 'visit' : 'view';
          return (
            <animated.div
              key={chapter.id}
              style={{
                opacity: style.opacity,
                transform: style.y.to((y) => `translateY(${y}px)`),
              }}
            >
              <TOCEntry>
                <Link to={`/chapter/${chapter.id}`}>
                  <TOCNumber>{String(chapter.chapter).padStart(2, '0')}</TOCNumber>
                  <TOCTitle>{chapter.title}</TOCTitle>
                  <TOCDotLeader />
                  <TOCAction>{action}</TOCAction>
                </Link>
              </TOCEntry>
            </animated.div>
          );
        })}
      </TOCList>
    </BookPage>
  );
}
