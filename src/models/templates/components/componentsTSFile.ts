export default `import React, { ReactNode } from 'react';
import styles from './TemplateName.module.css';

type TemplateNameProps = {
  children?: ReactNode
};

const TemplateName = (props: TemplateNameProps) => (
  <div className={styles.TemplateName}>
    TemplateName Component
  </div>
);

export default TemplateName;
`;
