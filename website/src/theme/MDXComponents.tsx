import MDXComponents from '@theme-original/MDXComponents';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Steps from '@site/src/components/mdx/Steps';
import Screenshot from '@site/src/components/mdx/Screenshot';
import SymptomTable from '@site/src/components/mdx/SymptomTable';
import {Card, CardGrid} from '@site/src/components/mdx/Card';
import UiSketch from '@site/src/components/mdx/UiSketch';
import InstallCommand from '@site/src/components/InstallCommand';

/** Components available in every MDX file without an import. */
export default {
  ...MDXComponents,
  Tabs,
  TabItem,
  Steps,
  Screenshot,
  SymptomTable,
  Card,
  CardGrid,
  UiSketch,
  InstallCommand,
};
