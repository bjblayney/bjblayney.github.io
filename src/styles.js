import styled, { css } from 'styled-components';

// -- Block print palette --
export const TAUPE = '#C4B5A2';
export const UMBER = '#2D1B0E';
export const AQUA = '#1A5E63';
export const PAPER = '#FAFAF5';
export const CARD_BG = '#D6CBBA';

// -- Letterpress deboss --
export const deboss = css`
  text-shadow:
    0 1px 0 rgba(250, 250, 245, 0.35),
    0 -1px 0 rgba(45, 27, 14, 0.1);
`;

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

export const WidePage = styled(BookPage)`
  max-width: 780px;
`;

// ------- Title Page -------

export const BookTitle = styled.h1`
  font-family: 'EB Garamond', serif;
  font-size: 4rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-align: center;
  color: ${PAPER};
  background: ${UMBER};
  padding: 14px 32px;
  margin: 0 0 6px;
  box-shadow: 5px 5px 0 ${AQUA};

  @media (max-width: 600px) {
    font-size: 2.6rem;
    padding: 10px 20px;
    box-shadow: 4px 4px 0 ${AQUA};
  }
`;

export const BookSubtitle = styled.p`
  font-family: 'EB Garamond', serif;
  font-size: 1.2rem;
  font-style: italic;
  text-align: center;
  color: ${PAPER};
  background: ${AQUA};
  padding: 6px 20px;
  margin: 8px 0 24px;
`;

export const BookAuthor = styled.p`
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${UMBER};
  margin: 0 0 32px;
`;

export const HorizontalRule = styled.hr`
  border: none;
  height: 3px;
  background: ${UMBER};
  margin: 24px auto;
  max-width: 80px;
`;

export const EditionTag = styled.p`
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${UMBER};
  margin: 0;
`;

export const EnterLink = styled.a`
  display: inline-block;
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${PAPER};
  background: ${UMBER};
  text-decoration: none;
  margin-top: 48px;
  padding: 12px 36px;
  transition: background-color 0.15s;

  &:hover {
    background: ${AQUA};
  }
`;

// ------- Table of Contents — Card Layout -------

export const TOCHeading = styled.h2`
  font-family: 'EB Garamond', serif;
  font-size: 2.2rem;
  font-weight: 700;
  text-align: center;
  color: ${PAPER};
  background: ${UMBER};
  padding: 8px 28px;
  margin: 0 auto 40px;
  width: fit-content;
  letter-spacing: 0.06em;
  box-shadow: 4px 4px 0 ${AQUA};
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const cardBase = css`
  position: relative;
  background: ${PAPER};
  border: 2px solid ${UMBER};
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
  box-shadow: 3px 3px 0 ${AQUA};

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 0 ${AQUA};
  }

  a {
    text-decoration: none;
    color: inherit;
    display: block;
    height: 100%;
  }
`;

export const Card = styled.div`
  ${cardBase}
  border-top: 6px solid ${UMBER};
  padding: 24px 24px 20px;
`;

export const FeaturedCard = styled.div`
  ${cardBase}
  border-top: 10px solid ${UMBER};
  padding: 28px 28px 24px;
`;

export const CardLabel = styled.span`
  display: inline-block;
  font-family: 'Space Mono', monospace;
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${PAPER};
  background: ${AQUA};
  padding: 3px 8px;
  margin-bottom: 12px;
`;

export const CardTitle = styled.h3`
  font-family: 'EB Garamond', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${UMBER};
  margin: 0 0 6px;
  line-height: 1.2;
`;

export const FeaturedCardTitle = styled(CardTitle)`
  font-size: 1.8rem;
  margin-bottom: 8px;
`;

export const CardSubtitle = styled.p`
  font-family: 'EB Garamond', serif;
  font-size: 1rem;
  font-style: italic;
  color: ${AQUA};
  margin: 0;
  line-height: 1.4;
`;

export const GroupCard = styled.div`
  background: ${CARD_BG};
  padding: 24px;
  border: 1px solid ${UMBER};
`;

export const GroupLabel = styled.span`
  display: inline-block;
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${UMBER};
  margin-bottom: 14px;
`;

export const GroupList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px 28px;
`;

export const GroupItem = styled.a`
  font-family: 'EB Garamond', serif;
  font-size: 1.05rem;
  color: ${UMBER};
  text-decoration: none;
  transition: color 0.15s;

  &:hover {
    color: ${AQUA};
  }

  &::after {
    content: '\\00a0\\2192';
    font-size: 0.85rem;
  }
`;

// ------- Chapter Page -------

export const ChapterLabel = styled.p`
  display: inline-block;
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${PAPER};
  background: ${AQUA};
  padding: 3px 10px;
  margin: 0 0 12px;
`;

export const ChapterTitle = styled.h1`
  font-family: 'EB Garamond', serif;
  font-size: 2.6rem;
  font-weight: 700;
  color: ${UMBER};
  margin: 0 0 6px;
  line-height: 1.15;
  ${deboss}

  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

export const ChapterSubtitle = styled.p`
  font-family: 'EB Garamond', serif;
  font-size: 1.15rem;
  font-style: italic;
  color: ${AQUA};
  margin: 0 0 28px;
`;

export const ChapterBody = styled.div`
  font-family: 'EB Garamond', serif;
  font-size: 1.15rem;
  line-height: 1.75;
  color: ${UMBER};
  margin-bottom: 32px;
`;

export const MetadataBlock = styled.div`
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: ${UMBER};
  letter-spacing: 0.04em;
  border-top: 2px solid ${UMBER};
  border-bottom: 2px solid ${UMBER};
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
  border: 2px solid ${UMBER};
  overflow: hidden;
`;

export const BackLink = styled.a`
  display: inline-block;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${AQUA};
  text-decoration: none;
  transition: color 0.15s;

  &:hover {
    color: ${UMBER};
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
  color: ${PAPER};
  background: ${UMBER};
  text-decoration: none;
  padding: 12px 28px;
  border: none;
  transition: background-color 0.15s;

  &:hover {
    background: ${AQUA};
  }

  &::after {
    content: '\\00a0\\2192';
  }
`;
