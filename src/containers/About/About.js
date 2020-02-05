import React from 'react';

// @media (max-width: 959px) {
//   min-height: calc(100vh - 100px);
// }

function About() {
  return (
    <section style={{ height: '84vh', color: '#333' }}>
      <div style={{ margin: '20px 20px' }}>
        <h3>Google keep clone v1.0.0 is finished</h3>
        <p>Finally first version of google keep clone is available</p>
        <p>
          It was cool project for me where I could tested plenty of features and
          approaches
        </p>
        <h4 style={{ marginTop: '10px' }}>
          Basic features which I included in my version are:
        </h4>
        <ul
          style={{ display: 'flex', flexDirection: 'column', margin: '20px' }}
        >
          <li>
            Possible to create own account trough password and email or Google
            account
          </li>
          <li>Basic mobile version</li>
          <li>CRUD in notes</li>
          <li>
            <b>DRAG&DROP</b> feature
          </li>
          <li>
            Note could has such things:
            <ul
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '5px'
              }}
            >
              <li>Title</li>
              <li>Content of note or Bullet list</li>
              <li>Specific background color for grouping</li>
              <li>Tags</li>
              <li>Pinned or not</li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default About;
