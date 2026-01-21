import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBed, FaCheckCircle, FaConciergeBell, FaUsers, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import '../../styles/homePage.css';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const rooms = [
    {
      id: 1,
      title: 'Standard Room',
      description: 'A comfortable and affordable room, perfect for solo travelers or short stays, offering all essential amenities.',
      image: '/images/rooms/standard-room.webp'
    },
    {
      id: 2,
      title: 'Deluxe Room',
      description: 'Spacious and stylish room with upgraded interiors, ideal for guests who enjoy extra comfort and relaxation.',
      image: '/images/rooms/deluxe-room.webp'
    },
    {
      id: 3,
      title: 'Family Room',
      description: 'Designed for families, this room offers extra space, multiple beds, and a cozy environment for everyone.',
      image: '/images/rooms/family-room.webp'
    },
    {
      id: 4,
      title: 'Executive Suite',
      description: 'Premium suite with separate living area, perfect for business travelers seeking luxury and comfort.',
      image: '/images/rooms/executive-suite.webp'
    },
    {
      id: 5,
      title: 'Honeymoon Suite',
      description: 'Romantic suite with elegant decor and special amenities, ideal for couples celebrating special moments.',
      image: '/images/rooms/honeymoon-suite.webp'
    },
    {
      id: 6,
      title: 'Presidential Suite',
      description: 'Our most luxurious accommodation with panoramic views, exclusive services, and world-class amenities.',
      image: '/images/rooms/presidential-suite.webp'
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % rooms.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + rooms.length) % rooms.length)
  }

  const getVisibleRooms = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      const index = (currentSlide + i) % rooms.length
      visible.push(rooms[index])
    }
    return visible
  }

  return (
    <div className="home w-full!">
      <section className="hero">
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-content">
          <h1 className="hero-title">Where Comfort Meets Elegance</h1>
          <h2 className="hero-subtitle">FinoraReach</h2>
          <Link to="/rooms">
            <button className="hero-btn">Book Now</button>
          </Link>
        </div>
      </section>

      <section className="about">
        <div className="about-container">
          <h2 className="about-title">FinoraReach</h2>
          <p className="about-description">
            FinoraReach is a modern, opulent hotel that will offer unmatched comfort, cosy hospitality, and life-changing experiences in Sri Lanka. FinoraReach provides well-designed, fashionable rooms with contemporary amenities for a comfortable and restful stay, whether on a work or pleasure vacation.
            High-quality services, individualised attention, and a peaceful setting that embodies Sri Lankan hospitality will be available to our clients. FinoraReach is the perfect place for travellers who like to enjoy efficiency and leisure at the same time because of its handy location and easily accessible main locations, which combine elegance, convenience, and tranquilly.
            Every aspect of FinoraReach is planned to make sure you have a fantastic, unforgettable, and stress free vacation.</p>
        </div>
      </section>

      <section className="stats">
        <div className="stat-item w-auto flex flex-col justify-center items-center">
          <FaBed className="stat-icon" />
          <h3 className="stat-number">6 +</h3>
          <p className="stat-label">Room Types</p>
        </div>
        <div className="stat-item w-auto flex flex-col justify-center items-center">
          <FaCheckCircle className="stat-icon" />
          <h3 className="stat-number">100 %</h3>
          <p className="stat-label">Secure Bookings</p>
        </div>
        <div className="stat-item w-auto flex flex-col justify-center items-center">
          <FaConciergeBell className="stat-icon" />
          <h3 className="stat-number">10 +</h3>
          <p className="stat-label">Facilities</p>
        </div>
        <div className="stat-item w-auto flex flex-col justify-center items-center">
          <FaUsers className="stat-icon" />
          <h3 className="stat-number">1 200 +</h3>
          <p className="stat-label">Happy Guests</p>
        </div>
      </section>

      <section className="rooms">
        <div className="rooms-header">
          <h2>Comfortable Stays for Every Guest</h2>
          <Link to="/rooms" className="see-all">See All Rooms</Link>
        </div>
        
        <div className="carousel-container">
          <button className="carousel-btn prev" onClick={prevSlide}>
            <FaChevronLeft />
          </button>
          
          <div className="rooms-carousel">
            {getVisibleRooms().map((room) => (
              <div className="room-card" key={room.id}>
                <div className="room-image-wrapper">
                  <img src={room.image} alt={room.title} className="room-image" />
                  <div className="room-info">
                    <h3>{room.title}</h3>
                    <p>{room.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="carousel-btn next" onClick={nextSlide}>
            <FaChevronRight />
          </button>
        </div>
      </section>

      <section className="dining">
        <div className="dining-content">
          <div className="dining-image-container">
            <img src="/images/home/dining.webp" alt="Dining Experience" className="dining-image" />
          </div>
          <div className="dining-text">
            <h2>Taste the Best at FinoraReach</h2>
            <p>
              At FinoraReach, we offer a delightful dining experience with a variety 
              of local and international cuisines. Our restaurant serves freshly prepared 
              meals using high-quality ingredients, while our beverage services include 
              refreshing drinks, hot beverages, and signature cocktails.
            </p>
            <p>
              Whether it's breakfast, lunch, or dinner, we ensure every meal is 
              flavorful and satisfying.
            </p>
            <ul className="dining-features">
              <li>• Multi cuisine restaurant</li>
              <li>• Fresh breakfast, lunch & dinner</li>
              <li>• Room service available </li>
              <li>• Beverage & refreshment options</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="gallery" style={{backgroundImage: 'url(/images/gallery/gallery-bg.webp)'}}>
        <div className="gallery-grid">
          <div className="gallery-item large">
            <img src="/images/gallery/gallery1.webp" alt="Gallery 1" />
            <Link to="/hotel-details" className="explore-btn">Explore More</Link>
          </div>
          <div className="gallery-column">
            <div className="gallery-item">
              <img src="/images/gallery/gallery2.webp" alt="Gallery 2" />
            </div>
            <div className="gallery-item">
              <img src="/images/gallery/gallery3.webp" alt="Gallery 3" />
            </div>
          </div>
          <div className="gallery-item large">
            <img src="/images/gallery/gallery4.webp" alt="Gallery 4" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage