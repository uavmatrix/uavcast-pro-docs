import React, {useState} from 'react';
import clsx from 'clsx';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate, {translate} from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import {openSearch} from '@site/src/theme/SearchBar';
import Icon from '@site/src/components/Icon';
import {DataPath, FleetMini, GoalArt, UavcastMini} from '@site/src/components/Home/Illustrations';
import {AREA_BY_KEY, AREA_HOME} from '@site/src/data/navigation';
import {FEATURES, GOALS, POPULAR, PRODUCT_LINKS, RECENT, START_HERE, SUGGESTED_QUERIES, TROUBLESHOOTING, type HomeLink} from '@site/src/data/home';
import {useDocResolver} from '@site/src/hooks/useDocResolver';

function useResolved<T extends {to: readonly string[]}>(items: T[]) {
  const {resolve} = useDocResolver();
  return items.map((i) => ({...i, href: resolve(i.to, {homeOk: false})})).filter((i): i is T & {href: string} => !!i.href);
}

function SearchKbd() {
  return <kbd className="uvm-searchbtn__kbd">⌘K</kbd>;
}

function Hero() {
  const {siteConfig} = useDocusaurusContext();
  const version = siteConfig.customFields?.uavcastVersion as string;
  return (
    <section className="uvm-hero">
      <div className="uvm-wrap uvm-hero__grid">
        <div>
          <div className="uvm-eyebrow">
            <span className="uvm-eyebrow__dot" />
            <Translate id="home.eyebrow" values={{version}}>
              {'UAVmatrix documentation · UAVcast-Pro {version}'}
            </Translate>
          </div>
          <h1 className="uvm-hero__title">
            <Translate id="home.title">Build, fly and manage connected drones.</Translate>
          </h1>
          <p className="uvm-hero__sub">
            <Translate id="home.sub">
              Guides and reference for UAVcast-Pro on the drone’s companion computer and Fleet Manager in the browser, from first boot to a fleet streaming video and telemetry over 4G.
            </Translate>
          </p>
          <button type="button" className="uvm-bigsearch" onClick={() => openSearch()}>
            <Icon name="search" size={18} />
            <span className="uvm-bigsearch__ph">
              <Translate id="home.searchPlaceholder">Search guides, settings and error messages</Translate>
            </span>
            <SearchKbd />
          </button>
          <div className="uvm-chips">
            <span>
              <Translate id="home.popular">Popular:</Translate>
            </span>
            {SUGGESTED_QUERIES.slice(0, 4).map((s) => (
              <button key={s.q} type="button" className="uvm-chip" onClick={() => openSearch(s.q)}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <DataPath version={version} />
      </div>
    </section>
  );
}

function SectionHead({kicker, title, link}: {kicker: string; title?: string; link?: {href?: string; label: string}}) {
  return (
    <div className="uvm-sechead">
      <div>
        <h2 className={clsx('uvm-sechead__k', !title && 'uvm-sechead__k--only')}>{kicker}</h2>
        {title && <p className="uvm-sechead__t">{title}</p>}
      </div>
      {link?.href && (
        <Link to={link.href} className="uvm-sechead__a">
          {link.label} <Icon name="arrow" size={13} />
        </Link>
      )}
    </div>
  );
}

function Goals() {
  const {resolve} = useDocResolver();
  return (
    <section className="uvm-section">
      <div className="uvm-wrap">
        <SectionHead
          kicker={translate({id: 'home.goals.kicker', message: 'Start with your goal'})}
          title={translate({id: 'home.goals.title', message: 'Pick the path that matches what you’re doing'})}
        />
        <div className="uvm-goals">
          {GOALS.map((g) => {
            const links = g.links.map((l) => ({...l, href: resolve(l.to, {homeOk: false})})).filter((l) => l.href).slice(0, 4);
            const main = links[0]?.href ?? resolve(AREA_HOME[g.area], {areaFallback: g.area});
            return (
              <div key={g.key} className={clsx('uvm-goal', `uvm-area--${g.area}`)}>
                <div className="uvm-goal__art">
                  <GoalArt kind={g.key} />
                  <span className="uvm-goal__tag">{g.tag}</span>
                </div>
                <div className="uvm-goal__body">
                  <h3 className="uvm-goal__title">
                    {main ? (
                      <Link to={main} className="uvm-stretch">
                        {g.title}
                      </Link>
                    ) : (
                      g.title
                    )}
                  </h3>
                  <p>{g.body}</p>
                </div>
                {links.length > 0 && (
                  <ul className="uvm-goal__links">
                    {links.map((l) => (
                      <li key={l.id}>
                        <Link to={l.href!}>
                          {l.label}
                          <Icon name="arrow" size={13} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProductLinks({items}: {items: HomeLink[]}) {
  const links = useResolved(items);
  return (
    <ul className="uvm-plinks">
      {links.map((l) => (
        <li key={l.id}>
          <Link to={l.href}>
            <Icon name="right" size={13} />
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Products() {
  const {siteConfig} = useDocusaurusContext();
  const {resolve} = useDocResolver();
  const uavcast = resolve(['/uavcast-pro/'], {areaFallback: 'uavcast-pro'});
  const fleet = resolve(['/fleet-manager/'], {areaFallback: 'fleet-manager'});
  const features = useResolved(FEATURES);
  const version = siteConfig.customFields?.uavcastVersion as string;
  return (
    <section className="uvm-section">
      <div className="uvm-wrap">
        <SectionHead
          kicker={translate({id: 'home.products.kicker', message: 'Products'})}
          title={translate({id: 'home.products.title', message: 'Browse by product'})}
        />
        <div className="uvm-products">
          <div className="uvm-pcard uvm-area--uavcast-pro">
            <div className="uvm-pcard__preview">
              <UavcastMini />
            </div>
            <div className="uvm-pcard__body">
              <div className="uvm-pcard__kicker">
                <span className="uvm-dot" />
                <Translate id="home.uavcast.kicker">On the drone</Translate>
              </div>
              <h3>
                {uavcast ? (
                  <Link to={uavcast} className="uvm-stretch">
                    UAVcast-Pro
                  </Link>
                ) : (
                  'UAVcast-Pro'
                )}
                <span className="uvm-badge">v{version}</span>
              </h3>
              <p>
                <Translate id="home.uavcast.body">
                  Runs on the drone’s companion computer, such as a Raspberry Pi. Streams low-latency H.264 video and MAVLink telemetry to Mission Planner or QGroundControl over 4G/5G, Wi-Fi or a VPN.
                </Translate>
              </p>
              <ProductLinks items={PRODUCT_LINKS.uavcast} />
              {uavcast && (
                <span className="uvm-pcard__go">
                  <Translate id="home.uavcast.go">Explore UAVcast-Pro</Translate> <Icon name="arrow" size={14} />
                </span>
              )}
            </div>
          </div>
          <div className="uvm-pcard uvm-area--fleet-manager">
            <div className="uvm-pcard__preview">
              <FleetMini />
            </div>
            <div className="uvm-pcard__body">
              <div className="uvm-pcard__kicker">
                <span className="uvm-dot" />
                <Translate id="home.fleet.kicker">In the browser</Translate>
              </div>
              <h3>
                {fleet ? (
                  <Link to={fleet} className="uvm-stretch">
                    Fleet Manager
                  </Link>
                ) : (
                  'Fleet Manager'
                )}
                <span className="uvm-badge uvm-badge--new">
                  <Translate id="home.fleet.badge">New docs</Translate>
                </span>
              </h3>
              <p>
                <Translate id="home.fleet.body">
                  One place for your organization: pair drones with an 8-digit code, follow every flight on the live map, bind video and telemetry to ground stations and manage your team.
                </Translate>
              </p>
              <ProductLinks items={PRODUCT_LINKS.fleet} />
              {fleet && (
                <span className="uvm-pcard__go">
                  <Translate id="home.fleet.go">Explore Fleet Manager</Translate> <Icon name="arrow" size={14} />
                </span>
              )}
            </div>
          </div>
        </div>
        {features.length > 0 && (
          <div className="uvm-features">
            {features.map((f) => (
              <Link key={f.id} to={f.href} className="uvm-feature">
                <span className="uvm-feature__ico">
                  <Icon name={f.icon} />
                </span>
                <span className="uvm-feature__t">{f.label}</span>
                <span className="uvm-feature__d">{f.desc}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function StartHere() {
  const cards = useResolved(START_HERE);
  if (!cards.length) return null;
  return (
    <section className="uvm-section">
      <div className="uvm-wrap">
        <SectionHead
          kicker={translate({id: 'home.start.kicker', message: 'Start here'})}
          title={translate({id: 'home.start.title', message: 'New to UAVcast-Pro?'})}
        />
        <div className="uvm-paths">
          {cards.map((c) => (
            <Link key={c.key} to={c.href} className="uvm-path">
              <div className="uvm-path__meta">
                <Icon name={c.icon} size={13} />
                {c.meta}
              </div>
              <div className="uvm-path__ttl">
                {c.title} <Icon name="arrow" size={14} />
              </div>
              <p>{c.desc}</p>
              {c.steps && (
                <ol>
                  {c.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              )}
              {c.bullets && (
                <ul>
                  {c.bullets.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Popular() {
  const all = useResolved(POPULAR);
  const [tab, setTab] = useState<'all' | 'uavcast' | 'fleet'>('all');
  const {resolve} = useDocResolver();
  const guides = resolve(['/guides/'], {areaFallback: 'guides'});
  const items = all
    .filter((p) => (tab === 'all' ? true : tab === 'fleet' ? p.area === 'fleet-manager' : p.area !== 'fleet-manager'))
    .slice(0, 6);
  if (!all.length) return null;
  return (
    <div className="uvm-popular">
      <div className="uvm-sechead uvm-sechead--row">
        <h2 className="uvm-sechead__k uvm-sechead__k--only">
          <Translate id="home.popular.kicker">Popular articles</Translate>
        </h2>
        <div className="uvm-seg" role="group" aria-label={translate({id: 'home.popular.filter', message: 'Filter articles'})}>
          {(
            [
              ['all', translate({id: 'home.popular.all', message: 'All'})],
              ['uavcast', 'UAVcast-Pro'],
              ['fleet', 'Fleet Manager'],
            ] as const
          ).map(([k, label]) => (
            <button key={k} type="button" aria-pressed={tab === k} onClick={() => setTab(k)}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="uvm-glist">
        {items.map((p) => (
          <Link key={p.id} to={p.href} className="uvm-grow">
            <div>
              <div className="uvm-grow__t">{p.label}</div>
              <div className="uvm-grow__d">{p.desc}</div>
            </div>
            <span className={clsx('uvm-tag', `uvm-area--${p.area}`)}>
              <span className="uvm-dot" />
              {AREA_BY_KEY[p.area].label}
            </span>
          </Link>
        ))}
      </div>
      {guides && (
        <Link to={guides} className="uvm-more">
          <Translate id="home.popular.allGuides">All guides</Translate> <Icon name="arrow" size={13} />
        </Link>
      )}
    </div>
  );
}

function Troubleshooting() {
  const items = useResolved(TROUBLESHOOTING).slice(0, 6);
  const {resolve} = useDocResolver();
  const hub = resolve(['/troubleshooting/'], {areaFallback: 'troubleshooting'});
  const logs = resolve(['/troubleshooting/logs/', '/troubleshooting/collect-logs/'], {homeOk: false});
  if (!items.length) return null;
  return (
    <aside className="uvm-trouble uvm-area--troubleshooting">
      <div className="uvm-trouble__head">
        <span className="uvm-trouble__ico">
          <Icon name="life" />
        </span>
        <h2>
          <Translate id="home.trouble.title">Something’s not working?</Translate>
        </h2>
        {hub && (
          <Link to={hub} className="uvm-sechead__a">
            <Translate id="home.trouble.all">All fixes</Translate> <Icon name="arrow" size={13} />
          </Link>
        )}
      </div>
      <ul>
        {items.map((t) => (
          <li key={t.id}>
            <Link to={t.href}>
              <span>{t.label}</span>
              <Icon name="right" size={14} />
            </Link>
          </li>
        ))}
      </ul>
      <div className="uvm-trouble__foot">
        <Icon name="download" size={14} />
        <span>
          <Translate
            id="home.trouble.foot"
            values={{
              path: <b>{translate({id: 'home.trouble.path', message: 'Application › Logging', description: 'Menu path in the UAVcast-Pro web app; use the app’s own translated labels'})}</b>,
            }}>
            {'Contacting support? Attach the log archive from {path} in UAVcast-Pro.'}
          </Translate>{' '}
          {logs && (
            <Link to={logs}>
              <Translate id="home.trouble.how">How</Translate>
            </Link>
          )}
        </span>
      </div>
    </aside>
  );
}

function CopyValue({value}: {value: string}) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="uvm-copyval"
      onClick={() => {
        void navigator.clipboard?.writeText(value).then(() => {
          setDone(true);
          setTimeout(() => setDone(false), 1600);
        });
      }}
      aria-label={translate({id: 'home.copy', message: 'Copy {value}'}, {value})}>
      <span className="uvm-mono">{value}</span>
      <Icon name={done ? 'check' : 'copy'} size={13} />
    </button>
  );
}

function Support() {
  const {siteConfig} = useDocusaurusContext();
  const email = siteConfig.customFields?.supportEmail as string;
  const discord = siteConfig.customFields?.discordUrl as string;
  const {resolve} = useDocResolver();
  const fmSupport = resolve(['/fleet-manager/support/'], {homeOk: false});
  return (
    <section className="uvm-section">
      <div className="uvm-wrap">
        <div className="uvm-support">
          <div className="uvm-support__intro">
            <div className="uvm-label uvm-support__k">
              <Translate id="home.support.kicker">Contact support</Translate>
            </div>
            <h2>
              <Translate id="home.support.title">Still stuck? Talk to the people who build it.</Translate>
            </h2>
            <p>
              <Translate id="home.support.body">Support is handled by the UAVcast-Pro developers. Include your UAVcast-Pro version and the log archive, and we can usually answer in one reply.</Translate>
            </p>
          </div>
          <div className="uvm-support__ch">
            <div className="uvm-channel">
              <Icon name="mail" />
              <div className="uvm-channel__t">
                <Translate id="home.support.email">Email</Translate>
              </div>
              <p>
                <Translate id="home.support.emailBody">License, installation and flight issues. Attach your logfiles.</Translate>
              </p>
              <CopyValue value={email} />
            </div>
            <div className="uvm-channel">
              <Icon name="chat" />
              <div className="uvm-channel__t">
                <Translate id="home.support.discord">Discord community</Translate>
              </div>
              <p>
                <Translate id="home.support.discordBody">Ask other pilots, share setups and get release news first.</Translate>
              </p>
              <a className="uvm-channel__a" href={discord} target="_blank" rel="noopener">
                <Translate id="home.support.join">Join the server</Translate> <Icon name="ext" size={13} />
              </a>
            </div>
            <div className="uvm-channel">
              <Icon name="map" />
              <div className="uvm-channel__t">
                <Translate id="home.support.fm">In Fleet Manager</Translate>
              </div>
              <p>
                <Translate id="home.support.fmBody">Owners and admins get help from FleetBot and support tickets inside the app.</Translate>
              </p>
              {fmSupport ? (
                <Link className="uvm-channel__a" to={fmSupport}>
                  <Translate id="home.support.fmLink">Fleet Manager support</Translate> <Icon name="arrow" size={13} />
                </Link>
              ) : (
                <a className="uvm-channel__a" href={siteConfig.customFields?.fleetManagerUrl as string} target="_blank" rel="noopener">
                  fleet-manager.uavmatrix.com <Icon name="ext" size={13} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Recent() {
  const {resolve} = useDocResolver();
  const {i18n} = useDocusaurusContext();
  const changelog = resolve(['/uavcast-pro/changelog/', '/reference/changelog/', '/changelog/'], {homeOk: false});
  const fmt = new Intl.DateTimeFormat(i18n.localeConfigs[i18n.currentLocale]?.htmlLang ?? 'en', {day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC'});
  return (
    <section className="uvm-section">
      <div className="uvm-wrap">
        <SectionHead
          kicker={translate({id: 'home.recent.kicker', message: 'Recent changes'})}
          link={{href: changelog, label: translate({id: 'home.recent.all', message: 'Full changelog'})}}
        />
        <ol className="uvm-recent">
          {RECENT.map((r) => (
            <li key={r.date + r.label}>
              <time dateTime={r.date}>{fmt.format(new Date(`${r.date}T00:00:00Z`))}</time>
              <span className={clsx('uvm-recent__v', r.label === 'Fleet Manager' ? 'uvm-area--fleet-manager' : 'uvm-area--uavcast-pro')}>
                <span className="uvm-dot" />
                {r.label === 'Fleet Manager' ? 'Fleet Manager' : `UAVcast-Pro ${r.label}`}
              </span>
              <p>{r.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function JsonLd() {
  const {siteConfig, i18n} = useDocusaurusContext();
  const logo = `${siteConfig.url}${useBaseUrl('/img/logo.webp')}`;
  const home = `${siteConfig.url}${useBaseUrl('/')}`;
  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://uavmatrix.com/#organization',
      name: 'UAVmatrix',
      url: 'https://uavmatrix.com',
      logo,
      sameAs: ['https://github.com/uavmatrix', siteConfig.customFields?.discordUrl],
      contactPoint: {'@type': 'ContactPoint', email: siteConfig.customFields?.supportEmail, contactType: 'customer support'},
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${home}#website`,
      name: 'UAVmatrix Docs',
      url: home,
      inLanguage: i18n.localeConfigs[i18n.currentLocale]?.htmlLang,
      publisher: {'@id': 'https://uavmatrix.com/#organization'},
      potentialAction: {
        '@type': 'SearchAction',
        target: {'@type': 'EntryPoint', urlTemplate: `${home}search/?q={search_term_string}`},
        'query-input': 'required name=search_term_string',
      },
    },
  ];
  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Head>
  );
}

export default function Home() {
  const title = translate({id: 'home.metaTitle', message: 'UAVmatrix Docs: UAVcast-Pro and Fleet Manager documentation'});
  const description = translate({
    id: 'home.metaDescription',
    message:
      'Install UAVcast-Pro, stream drone video and MAVLink telemetry over 4G/LTE to Mission Planner or QGroundControl, and manage your fleet with UAVmatrix Fleet Manager.',
  });
  return (
    <Layout description={description} wrapperClassName="uvm-home">
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
      </Head>
      <JsonLd />
      <main>
        <Hero />
        <Goals />
        <Products />
        <StartHere />
        <section className="uvm-section">
          <div className="uvm-wrap uvm-split">
            <Popular />
            <Troubleshooting />
          </div>
        </section>
        <Support />
        <Recent />
      </main>
    </Layout>
  );
}
