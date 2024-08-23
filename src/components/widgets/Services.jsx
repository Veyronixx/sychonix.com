import React from 'react';
import Card from '../../components/Card';
import data from './data';
import './services.css'; // Mengimpor file CSS untuk gaya komponen
import colorSharp from '../../assets/img/color-sharp.png'; // Mengimpor gambar latar belakang

const Services = () => {
  return (
    <section id="services"> {/* Section untuk menempatkan konten Services */}
      <h2>What you need to know about Us</h2>
      <p></p>
      <div className="container services__container" data-aos="fade-in">
        {data.map((item) => (
          <Card key={item.id} className="service light white-text">
            <div className="service__icon">{item.icon}</div>
            <div className="service__details">
              <h4>{item.title}</h4>
              <p style={{ color: 'white' }}>{item.desc}</p> {/* Menggunakan warna putih untuk teks */}
            </div>
          </Card>
        ))}
      </div>
      <img className="background-image-right" src={colorSharp} alt="Color Sharp Background" /> {/* Menambahkan gambar latar belakang */}
    </section>
  );
};

export default Services;
