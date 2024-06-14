import { useEffect, useState, useRef } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Spinner } from "flowbite-react";
import ResponsiveNav from "../components/ResponsiveNav";
import PropTypes from "prop-types";
import useWindowSize from "../Hooks/useWindowSize";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN_PUB;

export default function IncidentsPage({ selectedIncident }) {
  const size = useWindowSize();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await axios.get("/api/incident");
        const incidentsWithCoords = await Promise.all(
          res.data.map(async (incident) => {
            if (incident.latitude && incident.longitude) {
              return incident;
            } else {
              const response = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                  incident.location
                )}.json?access_token=${mapboxgl.accessToken}`
              );
              const coordinates =
                response.data.features[0]?.geometry?.coordinates;
              return {
                ...incident,
                latitude: coordinates[1],
                longitude: coordinates[0],
              };
            }
          })
        );
        setIncidents(incidentsWithCoords);
      } catch (error) {
        setError("Failed to fetch incidents. Please try again later.");
        console.error("Error fetching incidents:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIncidents();
  }, []);

  useEffect(() => {
    if (!loading && incidents.length > 0 && mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [37.9062, -0.0236],
        zoom: 6,
      });

      incidents.forEach((incident) => {
        if (incident.latitude && incident.longitude) {
          new mapboxgl.Marker()
            .setLngLat([incident.longitude, incident.latitude])
            .setPopup(
              new mapboxgl.Popup().setHTML(`
                <h3>${incident.type}</h3>
                <p>${incident.description}</p>
                <p><strong>Location:</strong> ${incident.location}</p>
                <p><strong>Date:</strong> ${new Date(
                  incident.date
                ).toLocaleDateString()}</p>
                ${
                  incident.image
                    ? `<img src="${incident.image}" alt="incident" class="w-32 h-20 object-cover rounded-lg" />`
                    : ""
                }
              `)
            )
            .addTo(mapRef.current);
        }
      });
    }
  }, [loading, incidents]);

  useEffect(() => {
    if (selectedIncident && mapRef.current) {
      mapRef.current.flyTo({
        center: [selectedIncident.longitude, selectedIncident.latitude],
        zoom: 10,
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });
    }
  }, [selectedIncident]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div>
      {/* ResponsiveNav component is used to display the navigation bar */}
      <div className="mb-4">
      {size.width < 768 && < ResponsiveNav/>}
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center">
        Reported Incidents
      </h1>
      <div className="flex flex-col gap-4">
        <div className="h-[85vh] md:ml-32 md:mr-20">
          <div
            ref={mapContainerRef}
            className="h-[87vh] rounded-lg shadow-lg"
          ></div>
        </div>
      </div>
    </div>
  );
}

IncidentsPage.propTypes = {
  selectedIncident: PropTypes.object,
};
