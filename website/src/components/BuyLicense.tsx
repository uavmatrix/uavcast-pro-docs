import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate, {translate} from '@docusaurus/Translate';
import Icon from '@site/src/components/Icon';
import {STORE_BUY_PATH, STORE_PLANS_PATH, storeUrl} from '@site/src/data/store';

/**
 * Locale-aware store links. Clicks are tracked site-wide as docs_outbound_click
 * with destination 'store' (src/analytics: any link to uavmatrix.com).
 */
export function useStoreLinks(): {buy: string; plans: string} {
  const {i18n} = useDocusaurusContext();
  return {buy: storeUrl(i18n.currentLocale, STORE_BUY_PATH), plans: storeUrl(i18n.currentLocale, STORE_PLANS_PATH)};
}

const buyLabel = () => translate({id: 'buy.cta', message: 'Buy UAVcast-Pro'});
const plansLabel = () => translate({id: 'buy.plans', message: 'See plans and pricing'});

/** Primary "Buy UAVcast-Pro" button. */
export function BuyButton({className, label}: {className?: string; label?: string}) {
  const {buy} = useStoreLinks();
  return (
    <a href={buy} className={clsx('uvm-btn uvm-btn--primary uvm-buy__btn', className)} target="_blank" rel="noopener">
      {label ?? buyLabel()}
      <Icon name="ext" size={13} />
    </a>
  );
}

/** Secondary "See plans and pricing" link. */
export function PlansLink({className}: {className?: string}) {
  const {plans} = useStoreLinks();
  return (
    <a href={plans} className={clsx('uvm-buy__plans', className)} target="_blank" rel="noopener">
      {plansLabel()}
      <Icon name="arrow" size={13} />
    </a>
  );
}

/** Home hero: buy button and plans link, next to the install command. */
export function BuyHero() {
  return (
    <div className="uvm-buy uvm-buy--hero">
      <BuyButton />
      <PlansLink />
    </div>
  );
}

/**
 * <BuyLicense /> in MDX: a compact "you need a license" box with the buy
 * button and the plans link.
 * - variant="activate" (default): before activating a license.
 * - variant="fleet": Fleet Manager is included with the license.
 */
export default function BuyLicense({variant = 'activate'}: {variant?: 'activate' | 'fleet'}) {
  return (
    <aside className="uvm-buy uvm-buy--box" aria-label={translate({id: 'buy.boxAria', message: 'Buy a UAVcast-Pro license'})}>
      <span className="uvm-buy__ico" aria-hidden="true">
        <Icon name="key" size={16} />
      </span>
      <p className="uvm-buy__text">
        {variant === 'fleet' ? (
          <Translate id="buy.fleetText">Fleet Manager is included with a UAVcast-Pro license. Each drone you pair needs one.</Translate>
        ) : (
          <Translate id="buy.activateText">You need a UAVcast-Pro license to activate the drone. Buy one in the UAVmatrix store.</Translate>
        )}
      </p>
      <div className="uvm-buy__actions">
        <BuyButton />
        <PlansLink />
      </div>
    </aside>
  );
}
