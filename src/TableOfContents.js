import React from 'react';
import { useTrail, animated } from '@react-spring/web';
import { Link } from 'react-router-dom';
import bookData from './bookData';
import {
  WidePage,
  BackLink,
  TOCHeading,
  CardGrid,
  Card,
  FeaturedCard,
  CardLabel,
  CardTitle,
  FeaturedCardTitle,
  CardSubtitle,
  GroupCard,
  GroupLabel,
  GroupList,
  GroupItem,
} from './styles';

export default function TableOfContents() {
  const featured = bookData.filter((d) => d.priority === 'featured');
  const standard = bookData.filter((d) => d.priority === 'standard');
  const quizzes = bookData.filter((d) => d.group === 'quizzes');

  const totalItems = featured.length + standard.length + 1;
  const trail = useTrail(totalItems, {
    from: { opacity: 0, y: 14 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 22 },
  });

  const animStyle = (s) => ({
    opacity: s.opacity,
    transform: s.y.to((y) => `translateY(${y}px)`),
  });

  return (
    <WidePage>
      <BackLink as={Link} to="/">
        Title Page
      </BackLink>
      <TOCHeading style={{ marginTop: 24 }}>Contents</TOCHeading>

      <CardGrid>
        {featured.map((chapter, i) => {
          const dest =
            chapter.type === 'work' ? chapter.href : `/chapter/${chapter.id}`;
          return (
            <animated.div key={chapter.id} style={animStyle(trail[i])}>
              <FeaturedCard>
                <Link to={dest}>
                  <CardLabel>{chapter.label}</CardLabel>
                  <FeaturedCardTitle>{chapter.title}</FeaturedCardTitle>
                  <CardSubtitle>{chapter.subtitle}</CardSubtitle>
                </Link>
              </FeaturedCard>
            </animated.div>
          );
        })}
      </CardGrid>

      <CardGrid>
        {standard.map((chapter, i) => (
          <animated.div
            key={chapter.id}
            style={animStyle(trail[featured.length + i])}
          >
            <Card>
              <Link to={`/chapter/${chapter.id}`}>
                <CardLabel>{chapter.label}</CardLabel>
                <CardTitle>{chapter.title}</CardTitle>
                <CardSubtitle>{chapter.subtitle}</CardSubtitle>
              </Link>
            </Card>
          </animated.div>
        ))}
      </CardGrid>

      <animated.div
        style={animStyle(trail[featured.length + standard.length])}
      >
        <GroupCard>
          <GroupLabel>Quizzes</GroupLabel>
          <GroupList>
            {quizzes.map((q) => (
              <GroupItem as={Link} key={q.id} to={`/chapter/${q.id}`}>
                {q.title}
              </GroupItem>
            ))}
          </GroupList>
        </GroupCard>
      </animated.div>
    </WidePage>
  );
}
