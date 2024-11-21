import React from 'react';

const imageUrls = [ "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg", "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png", "https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg", "https://upload.wikimedia.org/wikipedia/commons/3/3b/Javascript_Logo.png",  "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg"
];

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to Information Technology!</h1>
        <div className="grid grid-cols-3 gap-4"> {imageUrls.map((url, index) => ( <img key={index} src={url} alt={`Technology Logo ${index + 1}`} className="w-48 h-48 object-contain rounded-lg shadow-lg" /> ))} </div>
      </main>
      
    </div>
  );
};

export default Home;
