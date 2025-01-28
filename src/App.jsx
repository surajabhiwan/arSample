import React, { useState } from 'react';
import QRScanner from './components/QRScanner';
import ARView from './components/ARView';

const App = () => {
  const [content, setContent] = useState(null);

  const handleScan = (data) => {
    if (data === 'qr-text') {
      setContent({ type: 'text', data: 'Hello AR!' });
    } else if (data === 'qr-image') {
      setContent({ type: 'image', data: '/images/example-image.jpg' });
    } else if (data === 'qr-video') {
      setContent({ type: 'video', data: document.createElement('video') });
    }
  };

  return (
    <div>
      <QRScanner onScan={handleScan} />
      <ARView content={content} />
    </div>
  );
};

export default App;