import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MapPin,
  CalendarDays,
  Clock,
  Users,
  Trophy,
  FileText,
  Phone,
  Medal,
} from "lucide-react";
import { ALLTOURNAMENTS, API_URL } from "../../api";
import LoadingScreen from "../../LoadingScreen.jsxLoadingScreen";

function GlobalTournament() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const res = await axios.get(`${API_URL}${ALLTOURNAMENTS}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setTournaments(res.data.tournaments || []);
    } catch (err) {
      console.error("Failed to fetch tournaments", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <div className="min-h-screen bg-[#050a18] px-4 py-10 text-white">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-2xl font-semibold text-blue-400 mb-8">
          🏆 Global Tournaments
        </h1>

        {tournaments.length === 0 ? (
          <p className="text-gray-400 text-center">
            No tournaments available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {tournaments.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#0b1220] border border-blue-900 rounded-xl p-6 shadow-md hover:shadow-lg transition"
              >

                {/* HEADER */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Medal size={18} className="text-yellow-400" />
                    {t.sport}
                  </h2>

                  <span className="text-xs text-gray-400">
                    Organized by —{" "}
                    <span className="text-blue-400 font-medium">
                      {t.community_name} Community
                    </span>
                  </span>
                </div>

                <hr className="border-blue-900/60 mb-4" />

                {/* DETAILS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

                  <p className="flex items-center gap-2 text-gray-300">
                    <MapPin size={14} className="text-blue-400" />
                    <span className="font-medium text-white">Location:</span>
                    {t.location}
                  </p>

                  <p className="flex items-center gap-2 text-gray-300">
                    <Phone size={14} className="text-green-400" />
                    <span className="font-medium text-white">Contact:</span>
                    {t.contact}
                  </p>

                  <p className="flex items-center gap-2 text-gray-300">
                    <CalendarDays size={14} className="text-blue-400" />
                    <span className="font-medium text-white">Date:</span>
                    {new Date(t.tournament_date).toLocaleDateString("en-GB")}
                  </p>

                  <p className="flex items-center gap-2 text-gray-300">
                    <Clock size={14} className="text-blue-400" />
                    <span className="font-medium text-white">Time:</span>
                    {t.tournament_time}
                  </p>

                  <p className="flex items-center gap-2 text-gray-300">
                    <Users size={14} className="text-blue-400" />
                    <span className="font-medium text-white">Total Teams:</span>
                    {t.total_teams}
                  </p>

                  <p className="flex items-center gap-2 text-gray-300">
                    <Users size={14} className="text-blue-400" />
                    <span className="font-medium text-white">Team Size:</span>
                    {t.team_size}
                  </p>

                  <p className="flex items-center gap-2 text-gray-300">
                    <Trophy size={14} className="text-yellow-400" />
                    <span className="font-medium text-white">Prize:</span>
                    {t.winning_prize}
                  </p>
                </div>

                {/* RULES BOX */}
                <div className="mt-4 bg-[#050a18] p-4 rounded-lg border border-blue-900">
                  <p className="text-gray-300 text-sm flex items-start gap-2">
                    <FileText size={14} className="mt-1 text-blue-400" />
                    <span>
                      <span className="font-semibold text-white">
                        Rules & Conditions:
                      </span>{" "}
                      {t.rules}
                    </span>
                  </p>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default GlobalTournament;
