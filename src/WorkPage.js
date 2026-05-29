import React from 'react';
import { useSpring, useTrail, animated } from '@react-spring/web';
import { Link } from 'react-router-dom';
import {
  BookPage,
  BackLink,
  HorizontalRule,
  ExternalLink,
} from './styles';
import styled from 'styled-components';

const CREAM = '#FAF6F0';
const INK = '#2C2C2C';
const BROWN = '#8B4513';
const TAN = '#D4C5A9';

const PageTitle = styled.h1`
  font-family: 'EB Garamond', serif;
  font-size: 2.6rem;
  font-weight: 700;
  color: ${INK};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-align: center;
  margin: 0 0 10px;

  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

const PageSubtitle = styled.p`
  font-family: 'EB Garamond', serif;
  font-size: 1.2rem;
  font-style: italic;
  text-align: center;
  color: ${BROWN};
  margin: 0 0 32px;
`;

const Intro = styled.p`
  font-family: 'EB Garamond', serif;
  font-size: 1.15rem;
  line-height: 1.8;
  color: ${INK};
  margin: 0;
`;

const SectionLabel = styled.p`
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: ${TAN};
  margin: 0 0 24px;
`;

const SiteList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const SiteEntry = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid ${TAN};

  &:first-child {
    border-top: 1px solid ${TAN};
  }
`;

const SiteName = styled.h2`
  font-family: 'EB Garamond', serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: ${INK};
  margin: 0 0 4px;
`;

const SiteTagline = styled.p`
  font-family: 'Space Mono', monospace;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${BROWN};
  margin: 0 0 10px;
`;

const SiteDescription = styled.p`
  font-family: 'EB Garamond', serif;
  font-size: 1.05rem;
  line-height: 1.65;
  color: #555;
  margin: 0 0 14px;
`;

const SiteStack = styled.p`
  font-family: 'Space Mono', monospace;
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${TAN};
  margin: 0;
`;

const VisitLink = styled.a`
  display: inline-block;
  font-family: 'Space Mono', monospace;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${BROWN};
  text-decoration: none;
  margin-top: 14px;
  transition: color 0.15s;

  &::after {
    content: '\\00a0\\2192';
  }

  &:hover {
    color: ${INK};
  }
`;

const CommissionBlock = styled.div`
  margin: 8px 0 0;
`;

const CommissionBody = styled.p`
  font-family: 'EB Garamond', serif;
  font-size: 1.15rem;
  line-height: 1.8;
  color: ${INK};
  margin: 0 0 24px;
`;

const EmailLink = styled.a`
  display: inline-block;
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${BROWN};
  text-decoration: none;
  padding: 12px 28px;
  border: 1px solid ${TAN};
  transition: border-color 0.2s, background-color 0.2s;

  &:hover {
    border-color: ${BROWN};
    background-color: rgba(139, 69, 19, 0.04);
  }

  &::before {
    content: '\\2192\\00a0';
  }
`;

const sites = [
  {
    id: 'sculpt-swagger',
    name: 'Sculpt & Swagger',
    tagline: 'Chrome extension landing page',
    description:
      'A product marketing site for a Chrome extension. Clean single-page layout designed to convert visitors into installs.',
    stack: ['React', 'CSS'],
    url: '#', // TODO: replace with live URL
  },
  {
    id: 'thinkhomewise',
    name: 'Think Homewise',
    tagline: 'Real estate research platform',
    description:
      'A homebuying research tool for Canadians. Surfaces neighbourhood data, school ratings, and commute estimates to help buyers make confident decisions.',
    stack: ['React', 'Firebase'],
    url: 'https://thinkhomewise.com',
  },
  {
    id: 'janus',
    name: 'Janus',
    tagline: 'TODO: add tagline',
    description:
      'TODO: add a one-line description of what Janus does and who it is for.',
    stack: [],
    url: '#', // TODO: replace with live URL
  },
];

export default function WorkPage() {
  const fade = useSpring({
    from: { opacity: 0, y: 16 },
    to: { opacity: 1, y: 0 },
    config: { tension: 140, friction: 16 },
  });

  const trail = useTrail(sites.length, {
    from: { opacity: 0, y: 10 },
    to: { opacity: 1, y: 0 },
    delay: 200,
    config: { tension: 180, friction: 20 },
  });

  return (
    <BookPage>
      <animated.div
        style={{
          opacity: fade.opacity,
          transform: fade.y.to((y) => `translateY(${y}px)`),
        }}
      >
        <BackLink as={Link} to="/contents">Back to Contents</BackLink>

        <div style={{ marginTop: 40, marginBottom: 32, textAlign: 'center' }}>
          <PageTitle>Work for Hire</PageTitle>
          <PageSubtitle>Websites, tools, and interfaces</PageSubtitle>
        </div>

        <Intro>
          I build for the web — clean, purposeful, and fast to ship. Whether you need
          a landing page to launch a product, a web app for your customers, or a
          portfolio to represent your work, I take projects from brief to live.
          Below is a record of sites currently in the world.
        </Intro>

        <HorizontalRule style={{ maxWidth: '100%', margin: '36px 0' }} />

        <SectionLabel>Live work</SectionLabel>

        <SiteList>
          {trail.map((style, i) => {
            const site = sites[i];
            return (
              <animated.div
                key={site.id}
                style={{
                  opacity: style.opacity,
                  transform: style.y.to((y) => `translateY(${y}px)`),
                }}
              >
                <SiteEntry>
                  <SiteName>{site.name}</SiteName>
                  <SiteTagline>{site.tagline}</SiteTagline>
                  <SiteDescription>{site.description}</SiteDescription>
                  {site.stack.length > 0 && (
                    <SiteStack>Stack: {site.stack.join(', ')}</SiteStack>
                  )}
                  {site.url !== '#' && (
                    <VisitLink
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit site
                    </VisitLink>
                  )}
                </SiteEntry>
              </animated.div>
            );
          })}
        </SiteList>

        <HorizontalRule style={{ maxWidth: '100%', margin: '40px 0 36px' }} />

        <SectionLabel>Commission a site</SectionLabel>

        <CommissionBlock>
          <CommissionBody>
            I work with individuals and small businesses. If you have a project in
            mind — a new site, a rebuild, or something you haven't quite named yet —
            send me a note and we can talk scope and timeline. No pitch decks required.
          </CommissionBody>
          <EmailLink href="mailto:bj.blayney@gmail.com">
            Get in touch
          </EmailLink>
        </CommissionBlock>

        <HorizontalRule style={{ maxWidth: '100%', margin: '48px 0 32px' }} />

        <BackLink as={Link} to="/contents">Back to Contents</BackLink>
      </animated.div>
    </BookPage>
  );
}
