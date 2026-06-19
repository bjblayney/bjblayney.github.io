import React from 'react';
import { useSpring, useTrail, animated } from '@react-spring/web';
import { Link } from 'react-router-dom';
import {
  BookPage,
  BackLink,
  HorizontalRule,
  UMBER,
  AQUA,
  PAPER,
} from './styles';
import styled from 'styled-components';

const PageTitle = styled.h1`
  font-family: 'EB Garamond', serif;
  font-size: 2.6rem;
  font-weight: 700;
  color: ${PAPER};
  background: ${UMBER};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-align: center;
  padding: 10px 28px;
  margin: 0 auto 10px;
  width: fit-content;
  box-shadow: 4px 4px 0 ${AQUA};

  @media (max-width: 600px) {
    font-size: 2rem;
    padding: 8px 20px;
  }
`;

const PageSubtitle = styled.p`
  font-family: 'EB Garamond', serif;
  font-size: 1.1rem;
  font-style: italic;
  text-align: center;
  color: ${PAPER};
  background: ${AQUA};
  padding: 5px 16px;
  margin: 0 auto 32px;
  width: fit-content;
`;

const Intro = styled.p`
  font-family: 'EB Garamond', serif;
  font-size: 1.15rem;
  line-height: 1.8;
  color: ${UMBER};
  margin: 0;
`;

const SectionLabel = styled.p`
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: ${UMBER};
  margin: 0 0 24px;
`;

const SiteList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const SiteEntry = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid ${UMBER};

  &:first-child {
    border-top: 1px solid ${UMBER};
  }
`;

const SiteName = styled.h2`
  font-family: 'EB Garamond', serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: ${UMBER};
  margin: 0 0 4px;
`;

const SiteTagline = styled.p`
  font-family: 'Space Mono', monospace;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${AQUA};
  margin: 0 0 10px;
`;

const SiteDescription = styled.p`
  font-family: 'EB Garamond', serif;
  font-size: 1.05rem;
  line-height: 1.65;
  color: ${UMBER};
  margin: 0 0 14px;
`;

const SiteStack = styled.p`
  font-family: 'Space Mono', monospace;
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${AQUA};
  margin: 0;
`;

const VisitLink = styled.a`
  display: inline-block;
  font-family: 'Space Mono', monospace;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${AQUA};
  text-decoration: none;
  margin-top: 14px;
  transition: color 0.15s;

  &::after {
    content: '\\00a0\\2192';
  }

  &:hover {
    color: ${UMBER};
  }
`;

const CommissionBlock = styled.div`
  margin: 8px 0 0;
`;

const CommissionBody = styled.p`
  font-family: 'EB Garamond', serif;
  font-size: 1.15rem;
  line-height: 1.8;
  color: ${UMBER};
  margin: 0 0 24px;
`;

const EmailLink = styled.a`
  display: inline-block;
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${PAPER};
  background: ${UMBER};
  text-decoration: none;
  padding: 12px 28px;
  transition: background-color 0.15s;

  &:hover {
    background: ${AQUA};
  }

  &::before {
    content: '\\2192\\00a0';
  }
`;

const sites = [
  {
    id: 'homewise',
    name: 'Homewise',
    tagline: 'Mortgage brokerage platform',
    description:
      'The digital front door for a Canadian mortgage brokerage. Fully bilingual (EN/FR), with product analytics via PostHog and error tracking through Sentry. CI/CD on AWS CodeBuild.',
    stack: ['Next.js', 'MUI', 'i18next', 'PostHog', 'AWS'],
    url: 'https://thinkhomewise.com',
  },
  {
    id: 'homewise-real-estate',
    name: 'Homewise Real Estate',
    tagline: 'Real estate listings & neighbourhood data',
    description:
      'A map-driven property search tool with Leaflet and Google Maps layered views, Cognito-based auth, and schema validation via AJV. End-to-end tested with Cypress, deployed through AWS CodeBuild.',
    stack: ['React 18', 'MUI', 'Leaflet', 'Cognito', 'Cypress', 'AWS'],
    url: 'https://thinkhomewise.com/real-estate',
  },
  {
    id: 'sculpt-swagger',
    name: 'Sculpt & Swagger',
    tagline: 'Dance fitness studio',
    description:
      'Website for a dance fitness studio. Class schedules, instructor bios, and online booking — designed to reflect the energy of the brand.',
    stack: ['Next.js', 'Sanity CMS', 'Tailwind'],
    url: 'https://sculptandswagger.com',
  },
  {
    id: 'reddit-research',
    name: 'Reddit Research Assistant',
    tagline: 'Chrome extension for content research',
    description:
      'A browser extension that helps marketers and writers mine Reddit threads for content insights, audience language, and topic ideas.',
    stack: ['Chrome Extension', 'JavaScript'],
    url: 'https://chromewebstore.google.com/detail/reddit-research-assistant/koknmoejnkchdpghejlifncpeddfhhnl',
    linkLabel: 'View in Chrome Web Store',
  },
  {
    id: 'janus',
    name: 'Janus',
    tagline: 'Web analytics for small projects',
    description:
      'A full-stack analytics platform with a Tufte-inspired UI — high data-ink ratio, tables over charts, minimal chrome. Prisma over Postgres, Redis for caching and rate-limiting, JWT auth with token refresh, and transactional email via Resend. Frontend on Cloudflare Pages, backend secured with Helmet.',
    stack: ['Fastify', 'React', 'TypeScript', 'Vite', 'PostgreSQL', 'Redis'],
    url: 'https://addjanus.ca',
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
          <PageSubtitle>Ships that left the harbour</PageSubtitle>
        </div>

        <Intro>
          I design, build, and ship web products. Platforms, tools, extensions — brief to production. Here is the live work.
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
                      {site.linkLabel || 'Visit site'}
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
            Have a project? Send a note. No decks, no calls — just scope and a timeline.
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
