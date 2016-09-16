import React from 'react';

export default function ({key, user, content}) {
  debugger;
  return (
    <li key={key}>
      <p>{user.displayName}: {content}</p>
    </li>
  );
}
