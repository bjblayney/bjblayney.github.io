import styled from 'styled-components';

// -- Book palette --
const CREAM = '#FAF6F0';
const INK = '#2C2C2C';
const BROWN = '#8B4513';
const TAN = '#D4C5A9';

// ------- Layout -------

export const BookPage = styled.div`
  max-width: 640px;
  margin: 0 auto;
  padding: 60px 32px 80px;
  min-height: 100vh;

  @media (max-width: 600px) {
    padding: 40px 20px 60px;
  }
`;

// ------- Title Page -------

export const BookTitle = styled.h1`
  font-family: 'EB Garamond', serif;
  font-size: 3.2rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-align: center;
  color: ${INK};
  margin: 0 0 12px;

  @media (max-width: 600px) {
    font-size: 2.4rem;
  }
`;

export const BookSubtitle = styled.p`
  font-family: 'EB Garamond', serif;
  font-size: 1.3rem;
  font-style: italic;
  text-align: center;
  color: ${BROWN};
  margin: 0 0 24px;
  letter-spacing: 0.02em;
`;

export const BookAuthor = styled.p`
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${INK};
  margin: 0 0 32px;
`;

export const HorizontalRule = styled.hr`
  border: none;
  border-top: 1px solid ${TAN};
  margin: 24px auto;
  max-width: 200px;
`;

export const EditionTag = styled.p`
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${TAN};
  margin: 0;
`;

export const EnterLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${BROWN};
  text-decoration: none;
  margin-top: 48px;
  padding: 12px 0;
  margin-left: auto;
  margin-right: auto;
  transition: color 0.2s;

  &::before {
    content: '\\2767';
    font-size: 1.1rem;
    color: ${TAN};
    transition: color 0.2s;
  }

  &::after {
    content: '\\2767';
    font-size: 1.1rem;
    color: ${TAN};
    transform: scaleX(-1);
    transition: color 0.2s;
  }

  &:hover {
    color: ${INK};

    &::before,
    &::after {
      color: ${BROWN};
    }
  }
`;

// ------- Table of Contents -------

export const TOCHeading = styled.h2`
  font-family: 'EB Garamond', serif;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  color: ${INK};
  margin: 0 0 40px;
  letter-spacing: 0.06em;
`;

export const TOCList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const TOCEntry = styled.li`
  margin-bottom: 16px;

  a {
    display: flex;
    align-items: baseline;
    text-decoration: none;
    color: ${INK};
    transition: color 0.15s;
    gap: 12px;

    &:hover {
      color: ${BROWN};
    }
  }
`;

export const TOCNumber = styled.span`
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  flex-shrink: 0;
  min-width: 28px;
  color: ${BROWN};
`;

export const TOCTitle = styled.span`
  font-family: 'EB Garamond', serif;
  font-size: 1.2rem;
  flex-shrink: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 1.05rem;
  }
`;

export const TOCDotLeader = styled.span`
  flex: 1;
  border-bottom: 1px dotted ${TAN};
  margin: 0 8px;
  position: relative;
  top: -4px;
  min-width: 20px;
`;

export const TOCAction = styled.span`
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  flex-shrink: 0;
  color: ${BROWN};
`;

// ------- Chapter Page -------

export const ChapterLabel = styled.p`
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${BROWN};
  margin: 0 0 8px;
`;

export const ChapterTitle = styled.h1`
  font-family: 'EB Garamond', serif;
  font-size: 2.4rem;
  font-weight: 700;
  color: ${INK};
  margin: 0 0 6px;
  line-height: 1.2;

  @media (max-width: 600px) {
    font-size: 1.9rem;
  }
`;

export const ChapterSubtitle = styled.p`
  font-family: 'EB Garamond', serif;
  font-size: 1.15rem;
  font-style: italic;
  color: ${BROWN};
  margin: 0 0 28px;
`;

export const ChapterBody = styled.div`
  font-family: 'EB Garamond', serif;
  font-size: 1.15rem;
  line-height: 1.75;
  color: ${INK};
  margin-bottom: 32px;
`;

export const MetadataBlock = styled.div`
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: #7A7A7A;
  letter-spacing: 0.04em;
  border-top: 1px solid ${TAN};
  border-bottom: 1px solid ${TAN};
  padding: 12px 0;
  margin-bottom: 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
`;

export const MetadataItem = styled.span`
  text-transform: uppercase;
`;

export const FigureContainer = styled.div`
  margin: 24px 0;
  border: 1px solid ${TAN};
  border-radius: 2px;
  overflow: hidden;
`;

export const BackLink = styled.a`
  display: inline-block;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${BROWN};
  text-decoration: none;
  transition: color 0.15s;

  &:hover {
    color: ${INK};
  }

  &::before {
    content: '\\2190\\00a0';
  }
`;

export const ExternalLink = styled.a`
  display: inline-block;
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${BROWN};
  text-decoration: none;
  padding: 10px 24px;
  border: 1px solid ${TAN};
  transition: border-color 0.2s, background-color 0.2s;

  &:hover {
    border-color: ${BROWN};
    background-color: rgba(139, 69, 19, 0.04);
  }

  &::after {
    content: '\\00a0\\2192';
  }
`;
