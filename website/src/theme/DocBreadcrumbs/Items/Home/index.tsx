import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {translate} from '@docusaurus/Translate';

export default function HomeBreadcrumbItem() {
  const home = useBaseUrl('/');
  return (
    <li className="breadcrumbs__item">
      <Link className="breadcrumbs__link" href={home}>
        {translate({id: 'breadcrumbs.docs', message: 'Docs'})}
      </Link>
    </li>
  );
}
