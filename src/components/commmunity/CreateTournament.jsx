import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Users,
  Trophy,
  FileText,
  PlusCircle,
} from "lucide-react";

function CreateTournament() {
  const navigate = useNavigate();
  const { communityId } = useParams();

  const [sport, setSport] = useState("");
  const [otherSport, setOtherSport] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [totalTeams, setTotalTeams] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [prize, setPrize] = useState("");
  const [rules, setRules] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const tournamentData = {
      sport: sport === "Others" ? otherSport : sport,
      location,
      datetime,
      totalTeams,
      teamSize,
      prize,
      rules,
      communityId,
    };

    console.log("Tournament Data:", tournamentData);
    alert("Tournament created successfully (mock)");
  };

  return (
    <div className="min-h-screen bg-[#050a18] px-4 py-10 text-white">
      <div className="max-w-3xl mx-auto bg-[#0b1220] border border-blue-900 rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
          <PlusCircle size={18} /> Create Tournament
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* SPORT TYPE */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Sports Type
            </label>
            <select
              className="w-full bg-[#050a18] border border-blue-900 rounded-lg p-2 text-gray-200"
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              required
            >
              <option value="">Select sport</option>
              <option value="Football">Football</option>
              <option value="Cricket">Cricket</option>
              <option value="Basketball">Basketball</option>
              <option value="Badminton">Badminton</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* OTHER SPORT INPUT */}
          {sport === "Others" && (
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Enter Sport Name
              </label>
              <input
                type="text"
                placeholder="Type sport name..."
                className="w-full bg-[#050a18] border border-blue-900 rounded-lg p-2 text-gray-200"
                value={otherSport}
                onChange={(e) => setOtherSport(e.target.value)}
                required
              />
            </div>
          )}

          {/* LOCATION */}
          <div>
            <label className="block text-sm text-gray-300 mb-1 flex items-center gap-1">
              <MapPin size={14} /> Location
            </label>
            <input
              type="text"
              placeholder="Tournament location"
              className="w-full bg-[#050a18] border border-blue-900 rounded-lg p-2 text-gray-200"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          {/* ================= DATE (CALENDAR) ================= */}
          <div>
            <label className="block text-sm text-gray-300 mb-1 flex items-center gap-1">
              <Calendar size={14} /> Tournament Date
            </label>
            <input
              type="date"
              className="w-full bg-[#050a18] border border-blue-900 rounded-lg p-2 text-gray-200"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* ================= TIME ================= */}
          <div>
            <label className="block text-sm text-gray-300 mb-1 flex items-center gap-1">
              ⏰ Tournament Time
            </label>
            <input
              type="time"
              className="w-full bg-[#050a18] border border-blue-900 rounded-lg p-2 text-gray-200"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          {/* TOTAL TEAMS */}
          <div>
            <label className="block text-sm text-gray-300 mb-1 flex items-center gap-1">
              <Users size={14} /> Total Teams
            </label>
            <input
              type="number"
              placeholder="e.g. 8"
              className="w-full bg-[#050a18] border border-blue-900 rounded-lg p-2 text-gray-200"
              value={totalTeams}
              onChange={(e) => setTotalTeams(e.target.value)}
              required
            />
          </div>

          {/* TEAM SIZE */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Each Team Size
            </label>
            <input
              type="number"
              placeholder="e.g. 5"
              className="w-full bg-[#050a18] border border-blue-900 rounded-lg p-2 text-gray-200"
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              required
            />
          </div>

          {/* WINNING PRIZE */}
          <div>
            <label className="block text-sm text-gray-300 mb-1 flex items-center gap-1">
              <Trophy size={14} /> Winning Prize
            </label>
            <input
              type="text"
              placeholder="e.g. ₹10,000 + Trophy"
              className="w-full bg-[#050a18] border border-blue-900 rounded-lg p-2 text-gray-200"
              value={prize}
              onChange={(e) => setPrize(e.target.value)}
              required
            />
          </div>

          {/* RULES & CONDITIONS */}
          <div>
            <label className="block text-sm text-gray-300 mb-1 flex items-center gap-1">
              <FileText size={14} /> Rules & Conditions
            </label>
            <textarea
              rows="4"
              placeholder="Write tournament rules..."
              className="w-full bg-[#050a18] border border-blue-900 rounded-lg p-2 text-gray-200"
              value={rules}
              onChange={(e) => setRules(e.target.value)}
              required
            />
          </div>

          {/* BUTTONS */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-800 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Create Tournament
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTournament;
