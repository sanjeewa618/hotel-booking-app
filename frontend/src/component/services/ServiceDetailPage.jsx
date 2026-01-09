import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ServiceDetailPage.css';

const ServiceDetailPage = () => {
    const { serviceName } = useParams();
    const navigate = useNavigate();

    const servicesData = {
        'air-conditioning': {
            title: 'Air Conditioning',
            subtitle: 'Climate-controlled rooms for your ultimate comfort',
            image: 'https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg?auto=compress&cs=tinysrgb&w=1200',
            description: 'Experience optimal comfort with our state-of-the-art climate control systems. Every room is equipped with individual temperature controls, ensuring your stay is perfectly tailored to your preferences.',
            features: [
                'Individual room temperature control',
                'Energy-efficient cooling systems',
                'Fresh air circulation',
                'Quiet operation for undisturbed rest',
                'Eco-friendly refrigerants',
                'Humidity control'
            ],
            benefits: [
                'Perfect comfort year-round',
                'Better sleep quality',
                'Allergy-friendly environment',
                'Energy efficient and sustainable'
            ]
        },
        'mini-bar': {
            title: 'Mini Bar',
            subtitle: 'Complimentary refreshments stocked daily',
            image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1200',
            description: 'Indulge in a curated selection of premium beverages and gourmet snacks, available at your convenience. Our mini bars are thoughtfully stocked with local and international favorites.',
            features: [
                'Premium spirits and wines',
                'Craft beers and soft drinks',
                'Gourmet snacks and chocolates',
                'Fresh juices and water',
                'Daily restocking service',
                'Complimentary welcome drinks'
            ],
            benefits: [
                'Convenience at your fingertips',
                'Quality beverages and snacks',
                'Perfect for unwinding',
                'No need to leave your room'
            ]
        },
        'secure-parking': {
            title: 'Secure Parking',
            subtitle: 'Free valet parking with 24/7 security',
            image: 'https://images.pexels.com/photos/776122/pexels-photo-776122.jpeg?auto=compress&cs=tinysrgb&w=1200',
            description: 'Your vehicle is in safe hands with our premium valet parking service. Our covered parking facility features round-the-clock security monitoring and professional valet staff.',
            features: [
                '24/7 CCTV surveillance',
                'Professional valet service',
                'Covered parking spaces',
                'Car wash service available',
                'EV charging stations',
                'Direct elevator access to rooms'
            ],
            benefits: [
                'Complete peace of mind',
                'No parking hassles',
                'Vehicle protection from weather',
                'Quick and easy access'
            ]
        },
        'high-speed-wifi': {
            title: 'High-Speed WiFi',
            subtitle: 'Lightning-fast internet throughout the property',
            image: 'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=1200',
            description: 'Stay connected with our complimentary high-speed wireless internet. Whether you\'re working remotely or streaming entertainment, our robust network ensures seamless connectivity.',
            features: [
                'Fiber-optic internet connection',
                'Coverage throughout the property',
                'Unlimited bandwidth',
                'Secure encrypted network',
                'Multiple device support',
                'Technical support available'
            ],
            benefits: [
                'Work from anywhere in hotel',
                'Stream HD content smoothly',
                'Stay connected with loved ones',
                'Secure business communications'
            ]
        },
        'spa-wellness': {
            title: 'Spa & Wellness',
            subtitle: 'Rejuvenating treatments and massage therapy',
            image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1200',
            description: 'Discover tranquility at our luxury spa. Our expert therapists offer a range of treatments designed to rejuvenate your body and mind, from traditional massages to modern wellness therapies.',
            features: [
                'Swedish and deep tissue massage',
                'Aromatherapy treatments',
                'Facial and body treatments',
                'Sauna and steam rooms',
                'Meditation and yoga sessions',
                'Couples spa packages'
            ],
            benefits: [
                'Complete relaxation and stress relief',
                'Improved circulation and flexibility',
                'Skin rejuvenation',
                'Enhanced overall wellbeing'
            ]
        },
        'fine-dining': {
            title: 'Fine Dining',
            subtitle: 'Award-winning restaurant with gourmet cuisine',
            image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1200',
            description: 'Savor exceptional culinary experiences at our award-winning restaurant. Our master chefs create exquisite dishes using the finest local and international ingredients.',
            features: [
                'Michelin-trained chefs',
                'Farm-to-table ingredients',
                'Extensive wine collection',
                'Private dining options',
                'Breakfast, lunch & dinner service',
                'Special dietary accommodations'
            ],
            benefits: [
                'World-class culinary experience',
                'Fresh and seasonal menus',
                'Elegant dining atmosphere',
                'Impeccable service'
            ]
        },
        'fitness-center': {
            title: 'Fitness Center',
            subtitle: 'State-of-the-art gym equipment available 24/7',
            image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1200',
            description: 'Maintain your fitness routine with our fully-equipped gym. Our fitness center features the latest cardio and strength training equipment, open 24 hours for your convenience.',
            features: [
                'Latest cardio machines',
                'Free weights and resistance equipment',
                'Personal training sessions',
                'Yoga and fitness classes',
                'Locker rooms with showers',
                'Complimentary towels and water'
            ],
            benefits: [
                'Never miss a workout',
                'Professional fitness guidance',
                'Variety of exercise options',
                'Convenient 24/7 access'
            ]
        },
        'swimming-pool': {
            title: 'Swimming Pool',
            subtitle: 'Olympic-sized pool with poolside bar service',
            image: 'https://images.pexels.com/photos/261181/pexels-photo-261181.jpeg?auto=compress&cs=tinysrgb&w=1200',
            description: 'Take a refreshing dip in our pristine Olympic-sized swimming pool. Surrounded by lush landscaping and comfortable loungers, it\'s the perfect spot to relax and unwind.',
            features: [
                'Olympic-sized heated pool',
                'Separate children\'s pool',
                'Poolside bar and restaurant',
                'Comfortable sun loungers',
                'Cabanas available for rent',
                'Lifeguard on duty'
            ],
            benefits: [
                'Perfect for exercise or relaxation',
                'Family-friendly environment',
                'Refreshing tropical setting',
                'Excellent dining options'
            ]
        },
        'room-service': {
            title: 'Room Service',
            subtitle: 'Gourmet meals delivered to your room anytime',
            image: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1200',
            description: 'Enjoy delicious meals in the comfort of your room with our 24-hour room service. From breakfast in bed to late-night snacks, we deliver exceptional dining experiences.',
            features: [
                '24/7 availability',
                'Full restaurant menu',
                'Quick delivery service',
                'Special occasion setups',
                'Dietary preferences accommodated',
                'Complimentary breakfast options'
            ],
            benefits: [
                'Ultimate convenience',
                'Privacy and comfort',
                'No time restrictions',
                'Restaurant-quality food'
            ]
        },
        'concierge': {
            title: 'Concierge',
            subtitle: 'Expert assistance for all your travel needs',
            image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1200',
            description: 'Our dedicated concierge team is here to make your stay unforgettable. From restaurant reservations to local recommendations, we handle every detail with expertise and care.',
            features: [
                'Local area recommendations',
                'Restaurant and show reservations',
                'Tour and activity bookings',
                'Transportation arrangements',
                'Translation services',
                'Special request handling'
            ],
            benefits: [
                'Local insider knowledge',
                'Personalized service',
                'Time-saving convenience',
                'Memorable experiences'
            ]
        },
        'business-center': {
            title: 'Business Center',
            subtitle: 'Fully equipped meeting rooms and facilities',
            image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1200',
            description: 'Conduct business seamlessly with our comprehensive business center. Featuring modern meeting rooms, high-speed internet, and the latest technology for productive work sessions.',
            features: [
                'Modern meeting rooms',
                'Video conferencing equipment',
                'High-speed printing and copying',
                'Secretarial services',
                'Private workstations',
                'Catering services available'
            ],
            benefits: [
                'Professional environment',
                'Latest business technology',
                'Flexible meeting spaces',
                'Support staff available'
            ]
        },
        'laundry-service': {
            title: 'Laundry Service',
            subtitle: 'Professional cleaning with same-day delivery',
            image: 'https://images.pexels.com/photos/5591581/pexels-photo-5591581.jpeg?auto=compress&cs=tinysrgb&w=1200',
            description: 'Keep your wardrobe fresh with our professional laundry and dry-cleaning service. We offer quick turnaround times and handle your garments with the utmost care.',
            features: [
                'Same-day service available',
                'Dry cleaning and pressing',
                'Shoe shine service',
                'Eco-friendly detergents',
                'Delicate fabric care',
                'Express service options'
            ],
            benefits: [
                'Always look your best',
                'Convenient and quick',
                'Professional quality',
                'Gentle on fabrics'
            ]
        }
    };

    const service = servicesData[serviceName];

    useEffect(() => {
        if (window.ScrollReveal) {
            const sr = window.ScrollReveal();
            
            sr.reveal('.service-detail-hero', {
                duration: 1000,
                origin: 'top',
                distance: '50px',
                easing: 'ease-in-out'
            });

            sr.reveal('.service-detail-content', {
                duration: 1000,
                origin: 'bottom',
                distance: '50px',
                delay: 200,
                easing: 'ease-in-out'
            });

            sr.reveal('.feature-card', {
                duration: 800,
                origin: 'bottom',
                distance: '30px',
                interval: 150,
                delay: 400,
                easing: 'ease-in-out'
            });

            sr.reveal('.benefit-item', {
                duration: 800,
                origin: 'left',
                distance: '30px',
                interval: 100,
                delay: 600,
                easing: 'ease-in-out'
            });
        }
    }, [serviceName]);

    if (!service) {
        return (
            <div className="service-not-found">
                <h2>Service not found</h2>
                <button onClick={() => navigate('/')} className="back-home-btn">
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="service-detail-page">
            {/* Hero Section */}
            <section className="service-detail-hero">
                <div className="service-hero-image-container">
                    <img src={service.image} alt={service.title} className="service-hero-image" />
                    <div className="service-hero-overlay"></div>
                </div>
                <div className="service-hero-content">
                    <h1 className="service-hero-title">{service.title}</h1>
                    <p className="service-hero-subtitle">{service.subtitle}</p>
                </div>
            </section>

            {/* Description Section */}
            <section className="service-detail-content">
                <div className="service-description-container">
                    <h2 className="section-heading">About This Service</h2>
                    <p className="service-description">{service.description}</p>
                </div>

                {/* Features Grid */}
                <div className="features-section">
                    <h2 className="section-heading">Features & Amenities</h2>
                    <div className="features-grid">
                        {service.features.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <div className="feature-icon">✓</div>
                                <p className="feature-text">{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="benefits-section">
                    <h2 className="section-heading">Benefits</h2>
                    <div className="benefits-list">
                        {service.benefits.map((benefit, index) => (
                            <div key={index} className="benefit-item">
                                <span className="benefit-icon">★</span>
                                <p className="benefit-text">{benefit}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="service-cta-section">
                    <h2 className="cta-heading">Ready to Experience Excellence?</h2>
                    <p className="cta-text">Book your stay now and enjoy all our premium services</p>
                    <div className="cta-buttons">
                        <button onClick={() => navigate('/rooms')} className="cta-btn cta-btn-primary">
                            Book Now
                        </button>
                        <button onClick={() => navigate('/')} className="cta-btn cta-btn-secondary">
                            Back to Home
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServiceDetailPage;
