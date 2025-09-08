import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Calendar, MapPin, Users, Clock, Search, Filter } from "lucide-react";

export const metadata: Metadata = {
  title: "Discover Events | RSVP by Offbeats",
  description: "Explore amazing events happening at your campus. From tech talks to cultural festivals, find something for everyone.",
};

export default function EventsPage() {
  // Sample events data
  const events = [
    {
      id: 1,
      title: "Annual Tech Symposium 2024",
      description: "Join us for the biggest tech event of the year featuring industry leaders and innovative startups.",
      date: "2024-03-15",
      time: "10:00 AM",
      location: "Main Auditorium",
      organizer: "Computer Science Society",
      attendees: 245,
      maxAttendees: 300,
      image: "/api/placeholder/400/200",
      tags: ["Technology", "Symposium", "Networking"],
      isFeature: true,
    },
    {
      id: 2,
      title: "Cultural Fest - Rangmanch",
      description: "Celebrate diversity with dance, music, and food from different cultures around the world.",
      date: "2024-03-20",
      time: "6:00 PM",
      location: "University Grounds",
      organizer: "Cultural Committee",
      attendees: 189,
      maxAttendees: 500,
      image: "/api/placeholder/400/200",
      tags: ["Cultural", "Festival", "Music"],
      isFeature: false,
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      description: "Present your innovative ideas to a panel of judges and compete for exciting prizes.",
      date: "2024-03-25",
      time: "2:00 PM",
      location: "Innovation Hub",
      organizer: "Entrepreneurship Cell",
      attendees: 67,
      maxAttendees: 100,
      image: "/api/placeholder/400/200",
      tags: ["Startup", "Competition", "Innovation"],
      isFeature: false,
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 to-secondary-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Discover Amazing Events
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Find events that match your interests and connect with your campus community
              </p>

              {/* Search Bar */}
              <div className="bg-white rounded-2xl p-2 flex items-center max-w-2xl mx-auto">
                <div className="flex-1 flex items-center">
                  <Search className="w-5 h-5 text-gray-400 ml-4 mr-3" />
                  <input
                    type="text"
                    placeholder="Search events, organizations, or topics..."
                    className="flex-1 text-gray-700 placeholder-gray-400 focus:outline-none"
                  />
                </div>
                <button className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors duration-200">
                  Search
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </button>
                <div className="flex flex-wrap gap-2">
                  {["All", "Technology", "Cultural", "Sports", "Academic", "Social"].map((filter) => (
                    <button
                      key={filter}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                        filter === "All"
                          ? "bg-primary-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Showing {events.length} events
              </div>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  {/* Event Image */}
                  <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 relative">
                    {event.isFeature && (
                      <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex flex-wrap gap-2">
                        {event.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="bg-white/90 text-gray-700 px-2 py-1 rounded-lg text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {event.description}
                    </p>

                    {/* Event Details */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-primary-600" />
                        {new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2 text-primary-600" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-primary-600" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2 text-primary-600" />
                        {event.attendees} / {event.maxAttendees} attending
                      </div>
                    </div>

                    {/* Organizer */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">
                        Organized by <span className="font-medium text-gray-700">{event.organizer}</span>
                      </p>
                    </div>

                    {/* RSVP Button */}
                    <button className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200">
                      RSVP Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-white text-primary-600 border-2 border-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200">
                Load More Events
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Organizing an event?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Create and manage your event with our easy-to-use platform. 
              Reach students across your campus and boost attendance.
            </p>
            <button className="bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-700 transition-colors duration-200">
              Create Event
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
