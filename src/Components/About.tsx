import * as React from 'react';

export const About = (props: { trigger: boolean }) => {
  return (props.trigger) ? (
    <div>
      <p>Desenvolvido por gabrigomez - 2023</p>
    </div>
  ) : <></>
}