
import React from 'react';
import Layout from '../components/layout/Layout';

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero section */}
      <section className="bg-movie-primary text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About MovieLens</h1>
            <p className="text-xl text-white/80">
              The ultimate destination for movie lovers to discover, explore, and enjoy the world of cinema.
            </p>
          </div>
        </div>
      </section>

      {/* Mission section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                At MovieLens, we're passionate about connecting people with the movies and TV shows they'll love. We believe that great stories have the power to inspire, entertain, and bring people together.
              </p>
              <p className="text-muted-foreground">
                Our mission is to create the best platform for discovering content, making it easy for you to find your next favorite film or series. Whether you're a casual viewer or a dedicated cinephile, we're here to enhance your entertainment experience.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2056&q=80" 
                alt="Theater"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-movie-secondary/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-movie-secondary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Extensive Database</h3>
              <p className="text-muted-foreground">
                Access information on thousands of movies and TV shows, from classics to the latest releases, powered by The Movie Database (TMDb).
              </p>
            </div>
            <div className="bg-background p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-movie-secondary/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-movie-secondary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalized Experience</h3>
              <p className="text-muted-foreground">
                Save your favorite movies and TV shows, create personalized watchlists, and get recommendations based on your preferences.
              </p>
            </div>
            <div className="bg-background p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-movie-secondary/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-movie-secondary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L22 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Multi-Platform</h3>
              <p className="text-muted-foreground">
                Enjoy MovieLens on any device with our responsive design, allowing you to discover content on the go, anytime and anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground">
              We're a dedicated group of movie enthusiasts, developers, and designers working together to create the best movie discovery platform.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="Team Member"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">James Wilson</h3>
              <p className="text-movie-secondary">Founder & CEO</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/women/44.jpg" 
                  alt="Team Member"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">Sarah Johnson</h3>
              <p className="text-movie-secondary">Head of Design</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/men/67.jpg" 
                  alt="Team Member"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">David Chen</h3>
              <p className="text-movie-secondary">Lead Developer</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/women/17.jpg" 
                  alt="Team Member"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">Emma Rodriguez</h3>
              <p className="text-movie-secondary">Content Manager</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Partners</h2>
          <div className="flex flex-wrap justify-center items-center gap-12">
            <div className="grayscale hover:grayscale-0 transition-all">
              <img 
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" 
                alt="TMDB"
                className="h-12"
              />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all">
              <svg className="h-8" viewBox="0 0 124 34" fill="currentColor">
                <path d="M36.04 7.36h4.32l5.82 13.3 5.79-13.3h4.24v18.48h-3.31V12.15l-5.16 11.56h-3.28L39.3 12.15v13.69h-3.29Zm21.07 0h14.14v3.45H60.4v4.12h8.97v3.45H60.4v4.01h10.97v3.45H57.11V7.36Zm36.57 0h3.54v18.48h-3.54l-9.95-12.59v12.59h-3.54V7.36h3.54l9.95 12.59V7.36ZM27.28.85v33.3H0V.85h27.28ZM18 16.52c0-5.32-3.19-7.62-9.54-8.76l-.57-.1v17.54l.37-.06c7.09-1.2 9.74-3.56 9.74-8.62Z"></path>
              </svg>
            </div>
            <div className="grayscale hover:grayscale-0 transition-all">
              <svg className="h-6" viewBox="0 0 183 40" fill="currentColor">
                <path d="M0 19.63V0h183v40H0"></path>
                <path fill="#fff" d="M18.04 9.89h5.51l3.93 6.7 3.93-6.7h5.4v20.22h-5.4v-9.72l-3.93 6.71h-.11l-3.93-6.71v9.72h-5.4V9.89m21.87 0h5.62v14.76h8.13v5.46H39.91V9.89m15.86 0h15.1v5.05H61.2v2.54h9.15v4.84H61.2v2.78h9.83v5.01h-15.3V9.89m17.23 0h8.69c6.03 0 9.55 3.53 9.55 10.05v.06c0 6.52-3.61 10.11-9.72 10.11h-8.52V9.89m5.4 5.05v10.17h3.23c2.66 0 4.26-1.71 4.26-5.05v-.06c0-3.29-1.6-5.05-4.26-5.05h-3.23m16.96-5.05h5.46v20.22h-5.46V9.89m8.46 0h5.08l8.07 10.63V9.89h5.4v20.22h-4.73L121.41 19v11.11H116V9.89m26.56-.23h5.01l8.24 20.45h-5.69l-1.4-3.7h-7.49l-1.4 3.7h-5.57l8.3-20.45m4.84 5.97l-2.15 5.63h4.33l-2.18-5.63"></path>
              </svg>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
