import React from 'react';

const Services = () => {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Our Services</h1>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Programming Languages</h2>
        <ul className="list-disc list-inside">
          <li>Angular</li>
          <li>Node.js</li>
          <li>React.js</li>
          <li>Ionic</li>
          <li>MySQL</li>
          <li>MongoDB</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Services We Provide</h2>
        <ul className="list-disc list-inside">
          <li>Web development using Angular, React.js, and Node.js</li>
          <li>Mobile application development with Ionic</li>
          <li>Database management with MySQL and MongoDB</li>
          <li>Comprehensive project management solutions</li>
        </ul>
      </section>
    </main>
  );
};

export default Services;
