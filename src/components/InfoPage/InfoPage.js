import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const InfoPage = () => (
  
  <div>
    <h2>CREATE EVENT</h2>
    <div>
      <input placeholder="Event Name" />
    </div>
    <div>
      <input placeholder="Date" />
    </div>
    <div>
      <input placeholder="Place" />
    </div>
    <div>
      <input placeholder="Host Info" />
    </div>
    <div>
      <input placeholder="Comments" />
    </div>
    <div>
      <button>Invites</button>
    </div>
    <div>
      <button>Create</button>
    </div>
  </div>
);

export default InfoPage;
