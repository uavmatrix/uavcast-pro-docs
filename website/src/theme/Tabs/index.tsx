import React from 'react';
import Tabs from '@theme-original/Tabs';
import type {Props} from '@theme/Tabs';
import {track} from '@site/src/analytics';

type TabChild = React.ReactElement<{value?: string; label?: string}>;

/** Adds docs_tab_selected {group, value} when a reader switches tabs. */
export default function TabsWrapper(props: Props) {
  const items = React.Children.toArray(props.children).filter(React.isValidElement) as TabChild[];
  const values = items.map((c) => c.props.value ?? String(c.props.label ?? ''));
  const group = props.groupId ?? props.queryString?.toString() ?? values.join('|');
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    const li = (e.target as HTMLElement).closest('[role="tab"]');
    const list = li?.parentElement;
    if (!li || !list || list.closest('.uvm-tabs-track') !== e.currentTarget) return;
    if (li.getAttribute('aria-selected') === 'true') return;
    const index = [...list.children].indexOf(li);
    const value = (props.values?.[index]?.value as string | undefined) ?? values[index];
    if (value) track('docs_tab_selected', {group, value});
  };
  return (
    <div className="uvm-tabs-track" onClickCapture={onClickCapture}>
      <Tabs {...props} />
    </div>
  );
}
