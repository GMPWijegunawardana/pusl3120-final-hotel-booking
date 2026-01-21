import React, { useState, useEffect } from 'react';
import { getRooms } from '../../services/roomService';
import '../../styles/aboutPage.css';

const AboutPage = () => {
  const [showMoreRooms, setShowMoreRooms] = useState(false);
  const [showMoreFacilities, setShowMoreFacilities] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const data = await getRooms();
      setRooms(data);
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImageForRoom = (type) => {
    const imageMap = {
      'Standard Room': '3.webp',
      'Deluxe Room': '4.webp',
      'Family Room': '5.webp',
      'Executive Suite': '20.webp',
      'Honeymoon Suite': '21.webp',
      'Presidential Suite': '22.webp'
    };
    return imageMap[type] || '3.webp';
  };

  const initialRooms = rooms.slice(0, 3);
  const additionalRooms = rooms.slice(3, 6);

  const allFacilities = [
    { img: "6.webp", title: "Infinity Pool", desc: "A stunning rooftop escape where the water meets the sky, perfect for a peaceful dip while watching the city's golden sunset." },
    { img: "7.webp", title: "Luxury Spa", desc: "Step into a world of pure calm and let our expert therapists melt your stress away with soothing oils and ancient healing touches." },
    { img: "8.webp", title: "Elite Gym", desc: "Stay energized even while traveling in our modern fitness space, fully equipped for everything from a light stretch to an intense workout." },
    { img: "9.webp", title: "Yoga Studio", desc: "A quiet, sun-lit sanctuary designed for you to find your inner balance and breathe deeply amidst the hustle of the day." },
    { img: "10.webp", title: "Sky Bar & Lounge", desc: "The perfect spot to unwind with a handcrafted drink and good company, all while enjoying a breathtaking 360-degree view of the city lights." },
    { img: "11.webp", title: "Valet Parking", desc: "Start your stay with ease. Our dedicated team is always ready to take care of your vehicle, so you can head straight to your room." },
    { img: "12.webp", title: "Kids Club", desc: "A vibrant and safe playground where your little ones can explore, create, and make new friends under our caring supervision." },
    { img: "13.webp", title: "Cinema Lounge", desc: "Your private movie retreat. Cozy up in plush seating and enjoy your favorite films with professional sound and a classic theater feel." },
    { img: "23.webp", title: "Business Hub", desc: "A quiet, high-tech corner designed for focus, making it easy for digital nomads and professionals to get things done without distractions." },
    { img: "24.webp", title: "Organic Rooftop Garden", desc: "A green breath of fresh air in the city, where we grow our own fresh herbs and greens to bring farm-to-table flavors to your plate." },
    { img: "25.webp", title: "Heated Outdoor Hot Tub", desc: "Imagine soaking in warm, bubbly water on your private balcony, looking up at the stars after a long day of exploring." },
    { img: "26.webp", title: "Ayurvedic Sanctuary", desc: "Experience the true spirit of Sri Lanka with ancient herbal treatments that nourish your body and soul using time-honored local secrets." }
  ];

  const initialFacilities = allFacilities.slice(0, 4);
  const additionalFacilities = allFacilities.slice(4, 12);

  const renderRoomCard = (room, index, isAdditional = false) => (
    <div className={`card ${isAdditional ? 'additional-card' : ''}`} key={room._id || index}>
      <img src={`/images/about/${getImageForRoom(room.type)}`} alt={room.type} />
      <div className="room-details-overlay">
        <div className="room-header">
          <span className="room-category">{room.type}</span>
          <span className="room-price-tag">Starting from LKR {room.price?.toLocaleString()}</span>
        </div>
        <div className="room-amenities">
          <span>🏨 Room #{room.roomNumber}</span>
          {room.hotel && <span>📍 {room.hotel.name}</span>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="about-container">
      {/* 1. Header Section */}
      <h1 className="main-title">Experience FinoraReach</h1>

      {/* 2. Hero Section */}
      <div className="hero-section">
        <div className="hero-text">
          <h1 className="brand-name">FinoraReach</h1>
          <h3>Where Island Tradition Meets Modern Luxury.</h3>
          <p>
            At FinoraReach, we believe that true hospitality is about more than just a place to sleep. 
            It’s about the warmth of a smile, the comfort of a home, and the beauty of our Sri Lankan heritage 
            brought to life with a modern touch. What began as a dream to offer a more thoughtful way to travel 
            has grown into a sanctuary where every guest can find their own rhythm of peace and luxury.
          </p>
          <br/>
          <p>
          Every corner of our hotel tells a story, from the hand-carved wooden finishes to the way the evening 
          breeze flows through our open corridors. Our spaces are designed specifically to connect you with 
          the nature around us, ensuring that your stay is a refreshing experience for your soul.
          </p>
          
          <div className="hero-details-box">
            <div className="detail-item">
              <h4>A Personal Touch</h4>
              <p>Our team is here to do more than just help; we’re here to make you feel at home. From small requests to special plans, we focus on the little things that make your stay uniquely yours.</p>
            </div>
            <div className="detail-item">
              <h4>Kind to Nature</h4>
              <p>We believe in luxury that doesn't cost the earth. By using solar power and choosing eco-friendly ways, we do our part to keep our beautiful island surroundings just as nature intended.</p>
            </div>
          </div>
          
          <div className="icon-badge-row">
            <div className="badge-icon-item">
              <img src="/images/about/17.svg" alt="Top Rated" className="badge-custom-img" />
              <span>Top Rated</span>
            </div>
            <div className="badge-icon-item">
              <img src="/images/about/18.svg" alt="Eco Safe" className="badge-custom-img" />
              <span>Eco-Safe</span>
            </div>
            <div className="badge-icon-item">
              <img src="/images/about/19.svg" alt="Premium Service" className="badge-custom-img" />
              <span>Premium Service</span>
            </div>
          </div>
        </div>

        <div className="hero-image-large">
          <img src="/images/about/1.webp" alt="FinoraReach Luxury View" />
          
          <div className="right-side-filler">
            <div className="filler-box">
              <h4>Premier Urban Sanctuary</h4>
              <p>
                Situated in the most serene part of the city, FinoraReach offers an unmatched escape 
                from the urban hustle. Our strategic location ensures that while you are just minutes 
                away from major landmarks, you can still enjoy the peaceful rustle of leaves and the 
                calm island breeze from your balcony.
              </p>
            </div>

            <div className="filler-box">
              <h4>Authentic Sri Lankan Heritage</h4>
              <p>
                Every architectural detail at FinoraReach is a tribute to our rich heritage. 
                From hand-carved motifs to the use of local sustainable timber, we offer an 
                authentic experience that blends traditional Sri Lankan aesthetics with the 
                sophisticated comforts of modern 21st-century luxury.
              </p>
            </div>

            <div className="filler-box">
              <h4>Elite Hospitality Standards</h4>
              <p>
                We pride ourselves on a service culture that anticipates your needs before you 
                even voice them. Our staff is dedicated to providing a bespoke experience, 
                ensuring that whether it's a private dinner or a customized travel itinerary, 
                your stay is defined by excellence and personal care.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Legacy & Stats */}
      <div className="legacy-section">
        <div className="legacy-image">
          <img src="/images/about/2.webp" alt="Our Legacy Exterior" />
        </div>
        <div className="legacy-text">
          <h2>Our Story</h2>
          <p className="subtitle">The Journey of FinoraReach</p>
          <p>
          For over a decade, we have been more than just a destination; we have been a part of 
          thousands of personal stories. Established with a deep love for Sri Lanka’s natural 
          beauty, FinoraReach has evolved from a boutique retreat into a premier luxury landmark.
          </p> 
          <p>We started with just a few rooms and a big heart. Even today, as we grow, we treat 
             every guest with that same small-hotel intimacy. Our evolution wasn't just about 
             building more rooms, but about perfecting the art of the 'perfect stay'.</p> 
          
          <div className="legacy-highlights">
            <div className="highlight-item">
              <h4>Our Island Spirit:</h4>
              <p>For over ten years, we’ve stayed true to the genuine warmth of Sri Lankan culture. It’s not just a job for us; it’s about making sure the spirit of our island’s kindness is felt in everything we do.</p>
            </div>
            <div className="highlight-item">
              <h4>What We Stand For:</h4>
              <p>Being honest, doing our best, and staying true to our roots are the things that guide us. We believe in keeping things authentic so that your experience with us feels real and memorable.</p>
            </div>
          </div>

          <div className="legacy-stats">
            <div className="stat-item"><h3>150+</h3><span>Luxury Rooms</span></div>
            <div className="stat-item"><h3>10+</h3><span>Years of Care</span></div>
            <div className="stat-item"><h3>100%</h3><span>Happy Guests</span></div>
          </div>

          <div className="legacy-bottom-row">
            <div className="legacy-quote-box">
              <p>"We believe in luxury that doesn't cost the earth. By using solar power and choosing 
                  eco-friendly ways, we do our part to keep our beautiful island surroundings just 
                  as nature intended."</p>
              <span> The FinoraReach Way</span>
            </div>
            <div className="signature-tags">
              <span>✦ Our Kitchen Experts</span>
              <span>✦ At the Heart of It All</span>
              <span>✦ Caring for Nature</span>
              <span>✦ Safe & Secure, Always</span>
              <span>✦ Fast, Free Connectivity</span>
              <span>✦ Easy Airport Pickups</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Rooms Grid */}
      <section className="section-grid">
        <div className="section-header">
          <div className="section-title-area">
            <h2>Our Signature Accommodations</h2>
            <p className="section-description-para">
              At FinoraReach, every room is a meticulously crafted masterpiece of comfort and timeless elegance. We have designed our living spaces to be more than just a place to sleep; they are your private sanctuary in the heart of the city, offering a perfect blend of modern luxury and local charm. From hand-picked premium linens to smart ambient lighting and soundproofing, we ensure every detail caters to your absolute relaxation.
            </p>
            <p className="section-description-para">
              Whether you are seeking a cozy corner for a focused business trip or a lavish, expansive suite for a memorable family getaway, our diverse range of accommodations offers world-class amenities, high-speed connectivity, and breathtaking views that redefine the art of staying well. We invite you to discover a space where every element is tailored to provide an unparalleled experience of tranquility.
            </p>
            
            <div className="button-container-right">
              <button className="see-all-btn-outline" onClick={() => setShowMoreRooms(!showMoreRooms)}>
                {showMoreRooms ? "Show Less" : "See All Rooms"}
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid-3">
            <div className="text-center py-10 col-span-3">
              <div className="text-xl text-gray-600">Loading rooms...</div>
            </div>
          </div>
        ) : rooms.length === 0 ? (
          <div className="grid-3">
            <div className="text-center py-10 col-span-3">
              <div className="text-xl text-gray-600">No rooms available at the moment.</div>
            </div>
          </div>
        ) : (
          <div className="grid-3">
            {initialRooms.map((room, index) => renderRoomCard(room, index))}
            {showMoreRooms && additionalRooms.map((room, index) => renderRoomCard(room, index, true))}
          </div>
        )}

        <div className="room-standards-row">
            <div className="standard-item">
                <span>🛡️</span>
                <p><strong>Strict Hygiene:</strong> Deep cleaned and sanitized daily for your safety.</p>
            </div>
            <div className="standard-item">
                <span>🛏️</span>
                <p><strong>Premium Comfort:</strong> Orthopedic mattresses and 400 thread count sheets.</p>
            </div>
            <div className="standard-item">
                <span>☕</span>
                <p><strong>In-Room Refreshments:</strong> Gourmet coffee and organic Ceylon tea selection.</p>
            </div>
        </div>
      </section>

      {/* Wellness & Events */}
      <div className="extra-details-row">
          <div className="detail-card-long">
              <h2>Wellness & Renewal</h2>
              <p>In a world that never stops moving, we invite you to find your stillness. 
               Our wellness center is more than just a spa; it is a sanctuary where time 
               slows down to match your heartbeat. We have carefully woven together the 
               soulful traditions of ancient Ayurvedic healing with the gentle touch of 
               modern therapy to melt away the weight of daily life. Whether it’s the 
               calming scent of locally sourced herbal oils or a treatment that eases 
               your tired muscles, every moment here is crafted to help you breathe a 
               little deeper and return to the world with a renewed sense of self.
              </p>
          </div>
          <div className="detail-card-long">
              <h2>Memorable Events</h2>
              <p>Life is a collection of beautiful milestones, and at FinoraReach, we turn
                  those moments into forever memories. Whether you are dreaming of a fairytale 
                  wedding under the soft glow of our chandeliers or hosting a milestone corporate 
                  gathering, we provide more than just a venue we provide a heartbeat for your 
                  celebration. Our dedicated planners don’t just coordinate; they care for your 
                  vision with grace and precision. From the first toast to the final dance, 
                  we handle every fine detail so that you can simply be present, celebrate with your loved ones, 
                  and cherish every second of your special day.
              </p>
          </div>
      </div>

      {/* Facilities section */}
      <section className="section-grid spacing-top">
        <div className="section-header">
          <div className="section-title-area">
            <h2>Unmatched Guest Facilities</h2>
            
            <p className="section-description-para">
            At FinoraReach, we believe that world-class hospitality is defined by the seamless 
            integration of luxury and comfort. Our facilities are thoughtfully curated to serve as 
            an extension of your lifestyle, offering a sanctuary where you can escape the pace of 
            the city. From the moment you step into our serene environments, you are invited to 
            immerse yourself in experiences that rejuvenate both the body and the soul.
            </p>
            <p className="section-description-para">
            Whether you are seeking the invigorating energy of our state-of-the-art Elite Gym or 
            the tranquil stillness of our rooftop infinity pool, every corner of our property is 
            designed with your well-being in mind. Our luxury spa offers a retreat into ancient 
            healing traditions, while our dedicated yoga studios provide a space for mindfulness 
            amidst the clouds. We pride ourselves on anticipating your needs before they arise, 
            ensuring that every facility—from valet parking to our cinema lounge—operates with 
            grace and precision.
            </p>
            <p className="section-description-para">
            Our commitment to excellence extends to every guest, offering specialized spaces like 
            our vibrant Kids Club for younger explorers and sophisticated business hubs for the 
            modern professional. At FinoraReach, our facilities are not just amenities; they are 
            the backdrop to your most cherished memories. We invite you to explore, relax, and 
            discover a level of service that remains truly unmatched in the heart of the city.
            </p>
  
            <div className="button-container-right">
              <button className="see-all-btn-outline" onClick={() => setShowMoreFacilities(!showMoreFacilities)}>
                {showMoreFacilities ? "Show Less" : "See More"}
              </button>
            </div>
          </div>
        </div>

        <div className="grid-4">
          {initialFacilities.map((item, index) => (
            <div className="facility-card" key={index}>
              <img src={`/images/about/${item.img}`} alt={item.title} />
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
          {showMoreFacilities && additionalFacilities.map((item, index) => (
            <div className="facility-card additional-card" key={index}>
              <img src={`/images/about/${item.img}`} alt={item.title} />
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Buffet Section */}
      <section className="buffet-section">
        
        <div className="section-header"> 
          <h2>A Feast for Every Moment</h2>
        </div>
        <p className="buffet-sub">
        Dining at FinoraReach is more than just a meal; it is a celebration of our island’s 
        vibrant spirit. We take great pride in our kitchen, where our chefs blend the 
        authentic spices of traditional Sri Lankan home-cooking with sophisticated global 
        flavors. Every dish tells a story of local heritage, prepared with hand-picked 
        ingredients sourced directly from our island’s farmers and fishermen.
        </p>
        <p className="buffet-sub">
        Whether you are joining us for a sun-drenched breakfast featuring our famous 
        live hopper station or a quiet dinner under the soft glow of our lounge, you 
        will find a spread that feels personal and crafted with care. Our buffet is 
        designed to be a sensory journey—from the rich, aromatic curries that remind 
        you of home to the delicate artistry of our international pastry selection.
        </p>
        <p className="buffet-sub">
        We invite you to pull up a chair, relax, and let our team take care of the rest. 
        With an inviting atmosphere and views that capture the heart of the city, we 
        ensure that every moment spent at our table is filled with warmth, laughter, 
        and unforgettable flavors. This is where good food meets great company, 
        right here in the heart of FinoraReach.
        </p>
        
        <div className="grid-3 buffet-grid-top">
          <div className="buffet-card">
            <div className="buffet-img-container">
              <img src="/images/about/14.webp" alt="Breakfast Buffet" />
              <div className="buffet-overlay">
                <ul>
                  <li>Sri Lankan Traditional</li>
                  <li>Fresh Morning Classics</li>
                  <li>Live Egg Station</li>
                </ul>
              </div>
            </div>
            <div className="buffet-info">
              <h3>Morning Spread</h3>
              <p>Start your morning with a little bit of everything—from island fruits to warm pastries.</p>
              <span className="time-slot">07:00 AM - 10:30 AM</span>
            </div>
          </div>

          <div className="buffet-card">
            <div className="buffet-img-container">
              <img src="/images/about/15.webp" alt="Lunch Buffet" />
              <div className="buffet-overlay">
                <ul>
                  <li>Authentic Rice & Curry</li>
                  <li>Fresh Seafood</li>
                  <li>Healthy Salad Bar</li>
                </ul>
              </div>
            </div>
            <div className="buffet-info">
              <h3>Island Flavors</h3>
              <p>Taste the true soul of Sri Lanka with hand-picked local spices and fresh catch.</p>
              <span className="time-slot">12:30 PM - 03:00 PM</span>
            </div>
          </div>

          <div className="buffet-card">
            <div className="buffet-img-container">
              <img src="/images/about/16.webp" alt="Dinner Buffet" />
              <div className="buffet-overlay">
                <ul>
                  <li>Global Favorites</li>
                  <li>Indian Tandoori</li>
                  <li>Handcrafted Desserts</li>
                </ul>
              </div>
            </div>
            <div className="buffet-info">
              <h3>Nightly Feast</h3>
              <p>As the stars come out, join us for a journey of global flavors and handcrafted sweets.</p>
              <span className="time-slot">07:30 PM - 10:30 PM</span>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="awards-validation-section">
        <div className="section-header">
          <h2 className="awards-main-title">A Legacy of Excellence & Trust</h2>
          <p className="humanized-sub-para">
            At FinoraReach, we don’t just measure success by the number of guests we host, 
            but by the smiles we create and the standards we uphold. Over the years, our 
            dedication to preserving Sri Lankan hospitality while embracing world-class 
            luxury has earned us prestigious recognitions from the global travel community. 
            These honors reflect our team’s tireless passion for making every stay 
            feel like a homecoming.
          </p>
        </div>
        
        <div className="awards-badge-grid">
          
          <div className="award-card">
            <div className="award-icon-wrapper">
              <img src="/images/about/27.webp" alt="TripAdvisor Travelers' Choice" />
            </div>
            <div className="award-info">
              <h4>TripAdvisor Travelers' Choice 2024</h4>
              <p>
                This recognition is truly special to us because it comes directly from you—our guests. 
                Being ranked among the top hotels worldwide is a testament to the consistent 
                warmth and personalized care that defines the FinoraReach experience, day after day.
              </p>
            </div>
          </div>

          <div className="award-card">
            <div className="award-icon-wrapper">
              <img src="/images/about/28.webp" alt="Eco-Hospitality Award" />
            </div>
            <div className="award-info">
              <h4>Sustainable Tourism Gold Medal</h4>
              <p>
                We believe that luxury should never come at the cost of our beautiful island. 
                This award celebrates our commitment to eco-friendly practices, from solar energy 
                to zero-plastic initiatives, ensuring that your stay is as kind to nature as it is to your soul.
              </p>
            </div>
          </div>

          <div className="award-card">
            <div className="award-icon-wrapper">
              <img src="/images/about/29.webp" alt="Service Excellence" />
            </div>
            <div className="award-info">
              <h4>Elite Service Excellence Award</h4>
              <p>
                Awarded for maintaining the highest hospitality standards in the region. 
                From our 24-hour concierge to the intricate details in our housekeeping, 
                this honor recognizes our promise to provide a seamless, world-class service 
                that anticipates your every need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <div className="location-info-section">
        <h2>Visit Our Paradise</h2>
        <p>Nestled within the vibrant heart of Homagama, Sri Lanka, FinoraReach stands as a hidden sanctuary where the pulse of the city meets the quiet whispers of nature. Though conveniently situated near the urban center, our retreat is thoughtfully secluded from the city’s hum, offering a rare harmony of effortless accessibility and profound serenity. It is a place where the convenience of modern life fades into a tranquil island escape.
        </p>
        
        <div className="location-details-footer">
           <p>📍 No. 123, Highlevel Road, Homagama, Sri Lanka.</p>
           <p>📞 +94 77685432 | ✉️ finorareach@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;