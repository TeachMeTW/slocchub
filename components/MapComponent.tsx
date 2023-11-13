// MapBoxComponent.tsx
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import LocationUploadForm from './LocationUploadForm';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

const MapBoxComponent: React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current as HTMLElement,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [-74.5, 40],
            zoom: 9,
        });

        return () => map.remove();
    }, []);

    return <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />;
};

export default MapBoxComponent;
