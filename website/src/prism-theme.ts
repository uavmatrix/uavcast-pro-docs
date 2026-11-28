import type {PrismTheme} from 'prism-react-renderer';

/** One Prism theme for both colour modes: every colour is a CSS variable. */
const theme: PrismTheme = {
  plain: {color: 'var(--code-ink)', backgroundColor: 'var(--code-bg)'},
  styles: [
    {types: ['comment', 'prolog', 'doctype', 'cdata'], style: {color: 'var(--code-com)', fontStyle: 'italic'}},
    {types: ['punctuation', 'operator'], style: {color: 'var(--muted)'}},
    {types: ['string', 'char', 'attr-value', 'inserted', 'regex', 'url'], style: {color: 'var(--code-str)'}},
    {types: ['keyword', 'selector', 'important', 'atrule', 'builtin', 'tag', 'property-access'], style: {color: 'var(--code-kw)'}},
    {types: ['function', 'class-name', 'attr-name'], style: {color: 'var(--code-fn)'}},
    {types: ['number', 'boolean', 'constant', 'symbol', 'variable', 'deleted'], style: {color: 'var(--code-num)'}},
    {types: ['property'], style: {color: 'var(--code-kw)'}},
    {types: ['parameter'], style: {color: 'var(--ink-2)'}},
  ],
};

export default theme;
