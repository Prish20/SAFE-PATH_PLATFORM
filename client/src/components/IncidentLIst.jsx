import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import LazyLoad from "react-lazyload";
import { Spinner, Button, Select } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import ResponsiveHeader from "../components/ResponsiveHeader";
import PropTypes from "prop-types";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN_PUB;

export default function IncidentList({ setSelectedIncident }) {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");

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

  const navigate = useNavigate();

  const handleViewOnMap = (incident) => {
    setSelectedIncident(incident);
    navigate("/incidents");
  };

  const filteredIncidents = incidents.filter(
    (incident) => filter === "All" || incident.type === filter
  );

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
      <div className="mb-4">
        <ResponsiveHeader />
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center">Incidents List</h1>
      <div className="flex justify-center mb-4">
        <Select
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          className="mx-auto  sm:w-1/2 md:w-1/3 lg:w-1/4"
        >
          <option value="All">All</option>
          <option value="Accident">Accident</option>
          <option value="Hazard">Hazard</option>
          <option value="Theft">Theft</option>
          <option value="Other">Other</option>
        </Select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:ml-32 gap-4 p-4 min-h-[90vh] md:mr-32">
        {filteredIncidents.map((incident) => (
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
                <Button
                  onClick={() => handleViewOnMap(incident)}
                  className="text-red-500 outline"
                >
                  View on Map
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

IncidentList.propTypes = {
  setSelectedIncident: PropTypes.func.isRequired,
};
