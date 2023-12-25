import React from 'react';

const defaultImages = [
    'https://source.unsplash.com/random/900x700/?burger',
    'https://source.unsplash.com/random/900x700/?pastry',
    'https://source.unsplash.com/random/900x700/?barbeque'
];

export default function Carousel({ images = defaultImages, id, imageSize = '300px' }) {
    return (
        <div>
            <div id={`carouselExampleFade-${id}`} className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner" id={`carousel-${id}`}>
                    {images.map((image, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <img src={image} className="d-block w-100" style={{ objectFit: 'cover', height: imageSize }} alt={`Carousel Image ${index + 1}`} />
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleFade-${id}`} data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleFade-${id}`} data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}
