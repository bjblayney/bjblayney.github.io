import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import bookData from './bookData';
import ImageGallery from './ImageLayout';
import GradientBackground from './GradientBackground';
import {
  BookPage,
  ChapterLabel,
  ChapterTitle,
  ChapterSubtitle,
  ChapterBody,
  MetadataBlock,
  MetadataItem,
  FigureContainer,
  BackLink,
  ExternalLink,
  HorizontalRule,
} from './styles';

export default function ChapterPage() {
  const { id } = useParams();
  const chapter = bookData.find((c) => c.id === id);

  const fade = useSpring({
    from: { opacity: 0, y: 16 },
    to: { opacity: 1, y: 0 },
    config: { tension: 140, friction: 16 },
  });

  if (!chapter) {
    return <Navigate to="/contents" replace />;
  }

  return (
    <BookPage>
      <animated.div
        style={{
          opacity: fade.opacity,
          transform: fade.y.to((y) => `translateY(${y}px)`),
        }}
      >
        <BackLink as={Link} to="/contents">
          Back to Contents
        </BackLink>

        <div style={{ marginTop: 32 }}>
          <ChapterLabel>Chapter {String(chapter.chapter).padStart(2, '0')}</ChapterLabel>
          <ChapterTitle>{chapter.title}</ChapterTitle>
          {chapter.subtitle && <ChapterSubtitle>{chapter.subtitle}</ChapterSubtitle>}
        </div>

        <MetadataBlock>
          {chapter.techStack && (
            <MetadataItem>Stack: {chapter.techStack.join(', ')}</MetadataItem>
          )}
          {chapter.version && <MetadataItem>v{chapter.version}</MetadataItem>}
          {chapter.date && <MetadataItem>{chapter.date}</MetadataItem>}
        </MetadataBlock>

        <ChapterBody>
          <p>{chapter.description}</p>
        </ChapterBody>

        {chapter.type === 'project' && (
          <ExternalLink href={chapter.href} target="_blank" rel="noopener noreferrer">
            Visit Project
          </ExternalLink>
        )}

        {chapter.type === 'gallery' && (
          <FigureContainer>
            <ImageGallery embedded />
          </FigureContainer>
        )}

        {chapter.type === 'demo' && (
          <FigureContainer style={{ aspectRatio: '16 / 9' }}>
            <GradientBackground embedded />
          </FigureContainer>
        )}

        <HorizontalRule style={{ marginTop: 48 }} />

        <BackLink as={Link} to="/contents">
          Back to Contents
        </BackLink>
      </animated.div>
    </BookPage>
  );
}
