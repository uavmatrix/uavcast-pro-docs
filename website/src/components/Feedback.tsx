import React, {useEffect, useRef, useState} from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate, {translate} from '@docusaurus/Translate';
import Icon from '@site/src/components/Icon';
import {track} from '@site/src/analytics';

const KEY = 'uvm-feedback';

/**
 * "Was this page helpful?" Sends docs_feedback to PostHog: "Yes" right away;
 * "No" when the reader sends a comment, or without one when they leave the
 * page. The vote is remembered per page in localStorage. A prefilled GitHub
 * issue or email is offered for longer reports.
 */
export default function Feedback() {
  const {metadata} = useDoc();
  const {siteConfig} = useDocusaurusContext();
  const [vote, setVote] = useState<'up' | 'down' | null>(null);
  const [note, setNote] = useState('');
  const [sent, setSent] = useState(false);
  const pending = useRef(false);
  const path = metadata.permalink.replace(/\/?$/, "/");

  useEffect(() => {
    setSent(false);
    try {
      const all = JSON.parse(localStorage.getItem(KEY) ?? '{}');
      setVote(all[path] ?? null);
    } catch {
      /* storage unavailable */
    }
  }, [path]);

  // A "No" without a comment is still sent when the reader moves on.
  useEffect(() => {
    const flush = () => {
      if (!pending.current) return;
      pending.current = false;
      track('docs_feedback', {helpful: false, path}, {beacon: true});
    };
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, [path]);

  const remember = (v: 'up' | 'down') => {
    try {
      const all = JSON.parse(localStorage.getItem(KEY) ?? '{}');
      all[path] = v;
      localStorage.setItem(KEY, JSON.stringify(all));
    } catch {
      /* storage unavailable */
    }
  };

  const cast = (v: 'up' | 'down') => {
    if (v === vote) return;
    setVote(v);
    remember(v);
    if (v === 'up') {
      pending.current = false;
      track('docs_feedback', {helpful: true, path});
    } else {
      pending.current = true;
    }
  };

  const send = () => {
    pending.current = false;
    const comment = note.trim();
    track('docs_feedback', comment ? {helpful: false, comment: comment.slice(0, 2000), path} : {helpful: false, path});
    setSent(true);
  };

  const repo = siteConfig.customFields?.repo as string;
  const email = siteConfig.customFields?.supportEmail as string;
  const body = `Page: ${siteConfig.url}${path}\n\n${note}`;
  const issue = `${repo}/issues/new?title=${encodeURIComponent(`Docs feedback: ${metadata.title}`)}&body=${encodeURIComponent(body)}`;
  const mail = `mailto:${email}?subject=${encodeURIComponent(`Docs feedback: ${metadata.title}`)}&body=${encodeURIComponent(body)}`;

  return (
    <section className="uvm-feedback" id="uvm-feedback" aria-labelledby="uvm-feedback-q">
      <div className="uvm-feedback__row">
        <h2 className="uvm-feedback__q" id="uvm-feedback-q">
          <Translate id="feedback.question">Was this page helpful?</Translate>
        </h2>
        <div className="uvm-feedback__btns">
          <button type="button" aria-pressed={vote === 'up'} onClick={() => cast('up')}>
            <Icon name="thumbUp" size={14} />
            <Translate id="feedback.yes">Yes</Translate>
          </button>
          <button type="button" aria-pressed={vote === 'down'} onClick={() => cast('down')}>
            <Icon name="thumbDown" size={14} />
            <Translate id="feedback.no">No</Translate>
          </button>
        </div>
        {(vote === 'up' || sent) && (
          <span className="uvm-feedback__thanks" role="status">
            <Translate id="feedback.thanks">Thanks for letting us know.</Translate>
          </span>
        )}
      </div>
      {vote === 'down' && !sent && (
        <div className="uvm-feedback__more">
          <label htmlFor="uvm-feedback-note">
            <Translate id="feedback.what">What was missing or wrong? We read every report.</Translate>
          </label>
          <textarea
            id="uvm-feedback-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={2000}
            placeholder={translate({id: 'feedback.placeholder', message: 'For example: the setting has a different name in my version'})}
          />
          <div className="uvm-feedback__send">
            <button type="button" className="uvm-btn uvm-btn--primary" onClick={send}>
              <Translate id="feedback.send">Send feedback</Translate>
            </button>
            <span className="uvm-feedback__alt">
              <Translate id="feedback.or">or</Translate>{' '}
              <a href={issue} target="_blank" rel="noopener">
                <Translate id="feedback.issue">open a GitHub issue</Translate>
              </a>{' '}
              <Translate id="feedback.or2">/</Translate>{' '}
              <a href={mail}>
                <Translate id="feedback.email">email support</Translate>
              </a>
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
