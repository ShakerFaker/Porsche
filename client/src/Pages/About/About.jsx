import React, { useEffect } from 'react';
import L from 'leaflet';
import './About.css';
import { Link } from 'react-scroll';
import CEOImage from '../../assets/Nagar.jpg';
import CTOImage from '../../assets/alaaa.jpg';
//import COOImage from '../../assets/Sarah.jpeg';
import CarsImage from '../../assets/Cars.jpeg';
import MissionImage from '../../assets/vision.jpg';
import CompanyImage from '../../assets/company.jpg';
import historyImage from '../../assets/history.jpg';

import { animateScroll as scroll } from 'react-scroll';


const About = () => {

  useEffect(() => {
    // Initialize Leaflet map
    const map = L.map('map').setView([30.00417318726246, 31.70047198330851], 80); 
  
    // Add MapTiler tile layer with your API key
    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=XPCJOcO6HcGe592vRv18', {
      attribution: '&copy; <a href="https://www.maptiler.com/">MapTiler</a> contributors'
    }).addTo(map);
  
    // Add marker for company's location
    L.marker([30.00417318726246, 31.70047198330851]).addTo(map)
      .bindPopup('Company Name')
      .openPopup();
  
    // Clean up the map instance when the component unmounts
    return () => {
      map.remove();
    };
  }, []); 

  const teamMembers = [
    { name: 'Abdelrahman El-Nagar', role: 'CEO', linkedin: 'https://www.linkedin.com/in/abdelrahman-elnagar/', image: CEOImage },
    { name: 'Alaa Ashraf', role: 'CTO', linkedin: 'https://www.linkedin.com/in/alaa-ashraf-5067a2229/', image: CTOImage },
    { name: 'Sarah El-Feel', role: 'COO', linkedin: 'https://www.linkedin.com/in/sarahelfeel/' },
    { name: 'Mohammad Moharram', role: 'CFO', linkedin: 'https://www.linkedin.com/in/mohammad-moharram-84ab6127b/'},
    { name: 'Shaker Faker', role: 'CMO', linkedin: 'https://github.com/ShakerFaker', }
  ];

  return (
    <div className="about-container">
      <section className="company-history">
        <div className="section-content">
          <div className="section-image">
            <img src={CompanyImage} alt="CompanyImage" />
          </div>
          <div className="section-text">
            <h2>About Porsche</h2>
            <p>The Porsche website serves as an immersive gateway into the world of luxury automotive excellence,
           offering a seamless digital experience that reflects the brand's ethos of sophistication and innovation. 
           Navigating the website reveals a sleek and intuitive interface, designed to effortlessly guide visitors through Porsche's extensive lineup of cars,
           services, and experiences. From the iconic 911 to the versatile Cayenne SUV and the groundbreaking Taycan electric sports car, each model is showcased with
           stunning visuals and comprehensive details, allowing enthusiasts to explore every aspect of their favorite Porsche vehicles. Beyond product information,
           the website also provides access to exclusive content, including news, events, and behind-the-scenes stories, giving visitors a deeper insight into the Porsche lifestyle.
           With its user-friendly design and rich multimedia content, the Porsche website offers an immersive digital journey that captivates and inspires automotive enthusiasts around the globe..</p>
          </div>
        </div>
      </section>

      <section className="mission-statement">
        <div className="section-content">
          <div className="section-image">
            <img src={MissionImage} alt="MissionImage" />
          </div>
          <div className="section-text">
            <h2>Our Mission and Vision</h2>
            <p>Porsche’s mission and vision are deeply rooted in a legacy of innovation, performance, and excellence. 
           The company’s mission is to develop and deliver high-quality sports cars that combine tradition with cutting-edge technology, 
           ensuring that every Porsche offers a unique driving experience marked by exceptional performance and unmatched craftsmanship.
           Porsche's vision extends beyond producing luxury vehicles; it aims to lead the automotive industry in sustainability and innovation,
           pioneering advancements in electric mobility and intelligent driving solutions. With a steadfast commitment to engineering excellence
           and a forward-looking approach, Porsche envisions a future where its cars continue to set the benchmark for automotive performance,
           luxury, and environmental responsibility.</p>
          </div>
        </div>
      </section>

      <section className="car-statement">
        <div className="section-content">
          <div className="section-image">
            <img src={CarsImage} alt="CarsImage" />
          </div>
          <div className="section-text">
            <h2>Our Cars</h2>
            <p>Porsche epitomizes automotive elegance and unmatched performance, making it the quintessential choice for discerning drivers.
           Every Porsche model exudes a timeless sophistication, characterized by sleek lines, meticulous craftsmanship, 
           and an attention to detail that elevates it above the competition. The performance of a Porsche is nothing short of extraordinary;
           with precision engineering, powerful engines, and advanced technology, each car delivers a driving experience that is both 
           exhilarating and refined. Whether navigating city streets or conquering the racetrack, a Porsche performs with agility and responsiveness
           that sets the standard for sports cars. This blend of elegance and performance cements Porsche's status as the best car,
           a true symbol of luxury and automotive excellence.</p>
          </div>
        </div>
      </section>

      <section className="History-statement">
        <div className="section-content">
          <div className="section-image">
            <img src={historyImage} alt="historyImage" />
          </div>
          <div className="section-text">
            <h2>Our History</h2>
            <p>Porsche, a renowned German automobile manufacturer, was founded in 1931 by Ferdinand Porsche. Initially a consulting firm,
           Porsche's first major project was the design of the Volkswagen Beetle, one of the most successful car designs of all time.
           In 1948, Porsche produced its first car, the 356, a model that established its reputation for high-performance sports cars.
           The company continued to innovate, introducing the iconic 911 in 1964, which became a benchmark for sports car design and performance
           . Throughout the decades, Porsche has expanded its lineup to include a range of sports cars, SUVs, and electric vehicles, 
           all while maintaining a commitment to engineering excellence and racing success. Today, Porsche remains a symbol of luxury, 
           performance, and innovative automotive engineering.</p>
          </div>
        </div>
      </section>

      <section className="team">
        <h2>Our Team</h2>
        <div className="team-members">
          {teamMembers.map((member, index) => (
            <div className="team-member" key={index}>
              <div className="team-member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="team-member-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn Profile
                </a>
              </div>
            </div>
          ))}
        </div>
        
        
        
      </section>
      <Link

        to="company-history"
        spy={true}
        smooth={true}
        offset={200}
        duration={500}
      >
        Company History
      </Link>
      <Link

        to="mission-statement"
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
      >
        Mission Statement
      </Link>
      <Link

        to="car-statement"
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
      >
        Car Statement
      </Link>
      <Link

        to="History-statement"
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
      >
        History Statement
      </Link>
      <Link

        to="team"
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
      >
        Team
      </Link>
      <h2>Our Location</h2> 
        <div className="map-container">
        
          <div id="map" style={{ height: '400px' }}></div>
        </div>
    </div>
  );
};

export default About;
