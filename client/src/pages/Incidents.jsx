import { useEffect, useState } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import LazyLoad from "react-lazyload";
import { Spinner } from "flowbite-react";
import ResponsiveHeader from "../components/ResponsiveHeader";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN_PUB;

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    if (!loading && incidents.length > 0) {
      const map = new mapboxgl.Map({
        container: "map",
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
                    ? `<img src="${incident.image}" alt="incident" class="w-20 h-20 object-cover rounded-lg" />`
                    : ""
                }
              `)
            )
            .addTo(map);
        }
      });
    }
  }, [loading, incidents]);

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
    <div className="p-4 max-w-screen-lg mx-auto min-h-screen">
      <div className="mb-4 ">
        <ResponsiveHeader />
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center">
        Reported Incidents
      </h1>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-1/2 max-h-[calc(100vh-150px)] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {incidents.map((incident) => (
              <motion.div
                key={incident._id}
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col">
                  {incident.image && (
                    <LazyLoad height={160} offset={100} once>
                      <img
                        src={incident.image}
                        alt="incident"
                        className="w-full h-40 object-cover rounded-lg mb-2"
                      />
                    </LazyLoad>
                  )}
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-2">{incident.type}</h2>
                    <div
                      className="text-gray-700 dark:text-gray-300 mb-2"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(incident.description),
                      }}
                    ></div>
                    <p className="text-gray-500 dark:text-gray-400 mb-2">
                      <strong>Location:</strong> {incident.location}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 mb-2">
                      <strong>Date:</strong>{" "}
                      {new Date(incident.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2 h-[calc(100vh-150px)]">
          <div id="map" className="h-full w-full rounded-lg shadow-lg"></div>
        </div>
      </div>
    </div>
  );
}
