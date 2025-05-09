/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import AppShell from '../components/AppShell';

export function withAppShell(Component: React.ComponentType<any>) {
  return function (props: any) {
    return (
      <AppShell navigation={props.navigation}>
        <Component {...props} />
      </AppShell>
    );
  };
}
